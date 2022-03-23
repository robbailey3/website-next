import { HttpStatus } from '@/enums/HttpStatus';
import * as Sentry from '@sentry/node';
import { NextApiResponse } from 'next';
import { HttpResponse } from './HttpResponse';

export class ServerErrorResponse implements HttpResponse {
  public status = HttpStatus.INTERNAL_SERVER_ERROR;

  constructor(public res: NextApiResponse, public error: Error) {}

  public send() {
    Sentry.captureException(this.error);
    return this.res.status(this.status).json({});
  }
}
