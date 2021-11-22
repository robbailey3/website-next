import { HttpStatus } from '@/enums/HttpStatus';
import { HttpException } from './HttpException';

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
