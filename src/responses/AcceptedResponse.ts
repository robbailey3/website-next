import { HttpStatus } from '@/enums/HttpStatus';
import { NextApiResponse } from 'next';

export const AcceptedResponse = (res: NextApiResponse) => {
  return res.status(HttpStatus.ACCEPTED).json({
    timestamp: Date.now(),
    statusCode: HttpStatus.ACCEPTED,
  });
};
