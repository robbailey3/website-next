import { HttpStatus } from '@/enums/HttpStatus';
import { NextApiResponse } from 'next';

export const UnauthorizedResponse = (res: NextApiResponse) => {
  return res.status(HttpStatus.UNAUTHORIZED).json({
    timestamp: Date.now(),
    statusCode: HttpStatus.UNAUTHORIZED,
  });
};
