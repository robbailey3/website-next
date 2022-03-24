import { HttpVerb } from '../enums/HttpVerb';

export interface HttpHandlerMethod {
  verb: HttpVerb;
  methodName: string;
}
