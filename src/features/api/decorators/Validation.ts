import { MetadataType } from '../enums/MetadataType';
import { applyValidation } from '../utils/applyValidation';

export function withBodyValidation(cls: any) {
  return applyValidation(cls, MetadataType.BODY_VALIDATION);
}

export function withQueryValidation(cls: any) {
  return applyValidation(cls, MetadataType.QUERY_VALIDATION);
}
