import { HttpStatus } from '@/enums/HttpStatus';
import { NextApiResponse } from 'next';
import { HttpResponse } from './http-response';
import Sentry from '@sentry/node';
import logger from '@/utils/logger';

export class ServerErrorResponse extends HttpResponse {
  constructor(public error: any) {
    super(HttpStatus.INTERNAL_SERVER_ERROR);
    logger.error(error);
    Sentry.captureException(error);
  }

  public toResponse(res: NextApiResponse): void {
    return res.status(this.statusCode).json({
      statusCode: this.statusCode,
      timestamp: Date.now(),
    });
  }
}
