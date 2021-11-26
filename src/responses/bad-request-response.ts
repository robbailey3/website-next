import { HttpStatus } from '@/enums/HttpStatus';
import { NextApiResponse } from 'next';
import { HttpResponse } from './http-response';

export class BadRequestResponse extends HttpResponse {
  constructor(public message: string) {
    super(HttpStatus.BAD_REQUEST);
  }

  public toResponse(res: NextApiResponse): void {
    return res
      .status(this.statusCode)
      .json({
        message: this.message,
        statusCode: this.statusCode,
        timestamp: Date.now(),
      });
  }
}
