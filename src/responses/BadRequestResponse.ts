import { HttpStatus } from '@/enums/HttpStatus';
import { BadRequestError } from '@/exceptions/BadRequestException';
import { NextApiResponse } from 'next';

export const BadRequestResponse = (
  res: NextApiResponse,
  errors: BadRequestError[]
) => {
  return res.status(HttpStatus.BAD_REQUEST).json({
    errors,
    timestamp: Date.now(),
    statusCode: HttpStatus.BAD_REQUEST,
  });
};
