import { BadRequestException } from '@/exceptions/BadRequestException';
import { HttpVerb } from '@/features/api/enums/HttpVerb';
import { BadRequestResponse } from '@/responses/bad-request-response';
import { ServerErrorResponse } from '@/responses/server-error-response';
import validationService from '@/services/validation/validation.service';

export enum METADATA {
  HTTP_METHODS = 'HTTP_METHODS',
  VALIDATION = 'VALIDATION',
}

export interface HttpMethod {
  verb: HttpVerb;
  propertyKey: string | symbol;
}

async function runMain(
  this: TypedPropertyDescriptor<any>,
  target: object,
  propertyKey: string,
  originalHandler: any,
  req: any,
  res: any
) {
  try {
    const validations = Reflect.getMetadata(
      METADATA.VALIDATION,
      target.constructor
    );

    const relevantValidation = validations?.find(
      (validation: any) => validation.propertyKey === propertyKey
    );

    if (relevantValidation) {
      req.body = validationService.validateBody(
        relevantValidation.validationClass,
        req
      );
    }

    const returnValue = await originalHandler.call(this, req, res);
    // return returnValue;
    return res.status(200).json(returnValue);
  } catch (e: any) {
    console.log(`Caught exception ${e.message}`);
    if (e instanceof BadRequestException) {
      return new BadRequestResponse(e.message, e.errors).toResponse(res);
    }
    return new ServerErrorResponse(e).toResponse(res);
  }
}

function applyHandler(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) {
  const originalHandler = descriptor.value;

  descriptor.value = async function (req: any, res: any) {
    await runMain.call(
      this,
      target,
      propertyKey.toString(),
      originalHandler,
      req,
      res
    );
  };
}

function applyHttpMethod(verb: HttpVerb) {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const handlerMethods: HttpMethod[] =
      Reflect.getMetadata(METADATA.HTTP_METHODS, target.constructor) || [];

    handlerMethods.push({ verb, propertyKey });

    Reflect.defineMetadata(
      METADATA.HTTP_METHODS,
      handlerMethods,
      target.constructor
    );
    return applyHandler(target, propertyKey, descriptor);
  };
}

function applyBodyValidation(cls: any) {
  return function (target: any, propertyKey: string | symbol) {
    const validations =
      Reflect.getMetadata(METADATA.VALIDATION, target.constructor) || [];

    validations.push({
      propertyKey,
      validationClass: cls,
    });

    Reflect.defineMetadata(
      METADATA.VALIDATION,
      validations,
      target.constructor
    );
  };
}

export function Get(): MethodDecorator {
  return applyHttpMethod(HttpVerb.GET);
}

export function Patch(): MethodDecorator {
  return applyHttpMethod(HttpVerb.PATCH);
}

export function Post(): MethodDecorator {
  return applyHttpMethod(HttpVerb.POST);
}

export function Put(): MethodDecorator {
  return applyHttpMethod(HttpVerb.PUT);
}

export function Delete(): MethodDecorator {
  return applyHttpMethod(HttpVerb.DELETE);
}

export function withBodyValidation(cls: any) {
  return applyBodyValidation(cls);
}

export function generateHandler(c: any) {
  let instance = new c();

  const methods = Reflect.getMetadata(METADATA.HTTP_METHODS, c);
  console.log(methods);

  return async function (req: any, res: any) {
    const methods = Reflect.getMetadata(METADATA.HTTP_METHODS, c);

    if (!methods) {
      return;
    }

    const method = methods.find((m: any) => m.verb === req.method);

    if (method) {
      const methodFn = instance[method.propertyKey];

      if (methodFn) {
        return await methodFn.call(instance, req, res);
      }
    }
    return res.status(404).json({ error: 'Not found' });
  };
}
