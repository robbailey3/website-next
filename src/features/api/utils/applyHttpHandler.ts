import { runHttpHandler } from './runHttpHandler';

export function applyHttpHandler(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) {
  const originalHandler = descriptor.value;

  descriptor.value = async function (req: any, res: any) {
    await runHttpHandler.call(
      this,
      target,
      propertyKey.toString(),
      originalHandler,
      req,
      res
    );
  };
}
