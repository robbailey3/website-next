import { HttpStatus } from '@/enums/HttpStatus';
import { NextApiResponse } from 'next';

export const CreatedResponse = (res: NextApiResponse) => {
  return res.status(HttpStatus.CREATED).json({
    timestamp: Date.now(),
    statusCode: HttpStatus.CREATED,
  });
};
