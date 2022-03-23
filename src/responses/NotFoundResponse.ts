import { HttpStatus } from '@/enums/HttpStatus';
import { NextApiResponse } from 'next';
import { HttpResponse } from './HttpResponse';

export class NotFoundResponse implements HttpResponse {
  public status = HttpStatus.NOT_FOUND;

  constructor(public res: NextApiResponse) {}

  public send() {
    return this.res.status(this.status).json({});
  }
}
