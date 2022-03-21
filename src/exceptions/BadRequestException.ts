import { HttpStatus } from '@/enums/HttpStatus';
import { HttpException } from './HttpException';

export type BadRequestError = { [key: string]: string[] };

export class BadRequestException extends HttpException {
  constructor(public errors: BadRequestError[]) {
    super(HttpStatus.BAD_REQUEST, 'Bad Request');
  }
}
