import { HttpStatus } from '@/enums/HttpStatus';
import { NextApiResponse } from 'next';
import { HttpResponse } from './HttpResponse';

export class BadRequestResponse implements HttpResponse {
  public status = HttpStatus.BAD_REQUEST;

  constructor(public res: NextApiResponse, public errors: any) {}

  public send() {
    return this.res
      .status(this.status)
      .json({
        errors: this.errors,
        status: this.status,
        timestamp: Date.now(),
      });
  }
}
