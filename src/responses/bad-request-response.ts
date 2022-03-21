import { HttpStatus } from '@/enums/HttpStatus';
import { BadRequestError } from '@/exceptions/BadRequestException';
import { NextApiResponse } from 'next';
import { HttpResponse } from './http-response';

export class BadRequestResponse extends HttpResponse {
  constructor(public message: string, public errors?: BadRequestError[]) {
    super(HttpStatus.BAD_REQUEST);
  }

  public toResponse(res: NextApiResponse): void {
    return res.status(this.statusCode).json({
      message: this.message,
      errors: this.errors,
      statusCode: this.statusCode,
      timestamp: Date.now(),
    });
  }
}
