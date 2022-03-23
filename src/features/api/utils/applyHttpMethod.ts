import { HttpVerb } from '../enums/HttpVerb';
import { MetadataType } from '../enums/MetadataType';
import { HttpHandlerMethod } from '../interfaces/HttpHandlerMethod';
import { applyHttpHandler } from './applyHttpHandler';

export function applyHttpMethod(verb: HttpVerb) {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const handlerMethods: HttpHandlerMethod[] =
      Reflect.getMetadata(MetadataType.HTTP_METHOD, target.constructor) || [];

    handlerMethods.push({ verb, methodName: propertyKey.toString() });

    Reflect.defineMetadata(
      MetadataType.HTTP_METHOD,
      handlerMethods,
      target.constructor
    );
    return applyHttpHandler(target, propertyKey, descriptor);
  };
}
