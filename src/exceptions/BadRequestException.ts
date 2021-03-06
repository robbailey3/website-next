import { HttpException } from './HttpException';

export type BadRequestError = { [key: string]: string[] };

export class BadRequestException extends HttpException {
  constructor(public errors: BadRequestError[]) {
    super('Bad Request');
  }
}
