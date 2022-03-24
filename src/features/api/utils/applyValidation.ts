import { MetadataType } from '../enums/MetadataType';
import { ValidationMethod } from '../interfaces/ValidationMethod';

export function applyValidation(cls: any, validationType: MetadataType) {
  return function (target: any, propertyKey: string | symbol) {
    const validations: ValidationMethod[] =
      Reflect.getMetadata(validationType, target.constructor) || [];

    validations.push({
      methodName: propertyKey.toString(),
      validationClass: cls,
    });

    Reflect.defineMetadata(validationType, validations, target.constructor);
  };
}
