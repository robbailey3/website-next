import { NotFoundResponse } from '@/responses/NotFoundResponse';
import { MetadataType } from '../enums/MetadataType';
import { HttpHandlerMethod } from '../interfaces/HttpHandlerMethod';

export function generateHttpHandler(cls: any) {
  let instance = new cls();

  return async function (req: any, res: any) {
    const methods = Reflect.getMetadata(MetadataType.HTTP_METHOD, cls);

    if (!methods) {
      return;
    }

    const method: HttpHandlerMethod = methods.find(
      (m: any) => m.verb === req.method
    );

    if (method) {
      const methodFn = instance[method.methodName];

      if (methodFn) {
        return await methodFn.call(instance, req, res);
      }
    }
    return NotFoundResponse(res);
  };
}
