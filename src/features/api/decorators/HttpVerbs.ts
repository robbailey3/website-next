import { HttpVerb } from '../enums/HttpVerb';
import { applyHttpMethod } from '../utils/applyHttpMethod';

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
