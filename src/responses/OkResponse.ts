import { HttpStatus } from '@/enums/HttpStatus';
import { NextApiResponse } from 'next';

export const OkResponse = (res: NextApiResponse, data: any | any[]) => {
  return res.status(HttpStatus.OK).json({
    result: data,
    timestamp: Date.now(),
    statusCode: HttpStatus.OK,
  });
};
