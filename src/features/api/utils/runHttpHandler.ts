import { BadRequestException } from '@/exceptions/BadRequestException';
import { BadRequestResponse } from '@/responses/BadRequestResponse';
import validationService from '@/services/validation/validation.service';
import { logHttpRequest } from '@/utils/logger';
import { MetadataType } from '../enums/MetadataType';
import { ValidationMethod } from '../interfaces/ValidationMethod';

export async function runHttpHandler(
  this: TypedPropertyDescriptor<any>,
  target: object,
  propertyKey: string,
  originalHandler: any,
  req: any,
  res: any
) {
  try {
    logHttpRequest(req);

    const bodyValidations: ValidationMethod[] = Reflect.getMetadata(
      MetadataType.BODY_VALIDATION,
      target.constructor
    );

    const bodyValidation = bodyValidations?.find(
      (validation: any) => validation.methodName === propertyKey
    );

    if (bodyValidation) {
      req.body = await validationService.validateBody(
        bodyValidation.validationClass,
        req
      );
    }

    const queryValidations: ValidationMethod[] = Reflect.getMetadata(
      MetadataType.QUERY_VALIDATION,
      target.constructor
    );

    const queryValidation = queryValidations?.find(
      (validation: any) => validation.methodName === propertyKey
    );

    if (queryValidation) {
      req.query = await validationService.validateQuery(
        queryValidation.validationClass,
        req
      );
    }

    const returnValue = await originalHandler.call(this, req, res);

    return returnValue;
  } catch (e: any) {
    console.log(`Caught exception ${e.message}`);
    if (e instanceof BadRequestException) {
      return new BadRequestResponse(res, e.errors).send();
    }
    return res.status(500).json({ message: e.message });
  }
}
