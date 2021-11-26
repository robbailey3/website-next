import { BadRequestException } from '@/exceptions/BadRequestException';
import { HttpException } from '@/exceptions/HttpException';
import { BadRequestResponse } from '@/responses/bad-request-response';
import { NextApiResponse } from 'next';

const handleError = (error: any, res: NextApiResponse) => {
  if (!(error instanceof HttpException)) {
    return res.status(500).json({ error: error.message });
  }
  if (error instanceof BadRequestException) {
    return new BadRequestResponse(error.message).toResponse(res);
  }
};

export default handleError;
