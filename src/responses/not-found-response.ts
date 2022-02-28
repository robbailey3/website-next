import { HttpStatus } from '@/enums/HttpStatus';
import { NextApiResponse } from 'next';
import { HttpResponse } from './http-response';

export class NotFoundResponse extends HttpResponse {
  constructor() {
    super(HttpStatus.NOT_FOUND);
  }

  public toResponse(res: NextApiResponse): void {
    return res.status(this.statusCode).json({
      statusCode: this.statusCode,
      timestamp: Date.now(),
    });
  }
}
