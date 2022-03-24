import { HttpStatus } from '@/enums/HttpStatus';
import { NextApiResponse } from 'next';

export const NotFoundResponse = (res: NextApiResponse) => {
  return res.status(HttpStatus.NOT_FOUND).json({
    timestamp: Date.now(),
    statusCode: HttpStatus.NOT_FOUND,
  });
};
