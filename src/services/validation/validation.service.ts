import {
  BadRequestError,
  BadRequestException,
} from '@/exceptions/BadRequestException';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextApiRequest } from 'next';

class ValidationService {
  public async validateBody<T>(
    schema: ClassConstructor<T>,
    req: NextApiRequest
  ): Promise<T> {
    return await this.validate(schema, req.body);
  }

  public async validateQuery<T>(
    schema: ClassConstructor<T>,
    req: NextApiRequest
  ): Promise<T> {
    console.log(req.query, schema);
    return await this.validate<T>(schema, req.query);
  }

  private async validate<T>(schema: ClassConstructor<T>, obj: any): Promise<T> {
    const request = plainToInstance<T, any>(schema, obj);

    const errors = await validate(<any>request, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      throw new BadRequestException(this.formatErrors(errors));
    }

    return request;
  }

  private formatErrors(errors: ValidationError[]): BadRequestError[] {
    let message = '';
    return errors.map((error) => {
      return {
        [error.property]: error.constraints
          ? Object.values(error.constraints)
          : [],
      };
    });
  }
}

export default new ValidationService();
