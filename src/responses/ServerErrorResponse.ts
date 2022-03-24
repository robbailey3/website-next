import { HttpStatus } from '@/enums/HttpStatus';
import * as Sentry from '@sentry/node';
import { NextApiResponse } from 'next';

export const ServerErrorResponse = (res: NextApiResponse, error: any) => {
  Sentry.captureException(error);
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    error: 'Internal server error',
    timestamp: Date.now(),
    statusCode: 500,
  });
};
