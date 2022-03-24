import { HttpStatus } from '@/enums/HttpStatus';
import { NextApiResponse } from 'next';

export const NoContentResponse = (res: NextApiResponse) => {
  return res.status(HttpStatus.NO_CONTENT).json({
    timestamp: Date.now(),
    statusCode: HttpStatus.NO_CONTENT,
  });
};
