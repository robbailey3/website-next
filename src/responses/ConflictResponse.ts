import { HttpStatus } from '@/enums/HttpStatus';
import { NextApiResponse } from 'next';

export const ConflictResponse = (res: NextApiResponse) => {
  return res.status(HttpStatus.CONFLICT).json({
    timestamp: Date.now(),
    statusCode: HttpStatus.CONFLICT,
  });
};
