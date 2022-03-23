import { HttpStatus } from '@/enums/HttpStatus';
import { NextApiResponse } from 'next';
import { HttpResponse } from './HttpResponse';

export class OkResponse implements HttpResponse {
  public status: HttpStatus = HttpStatus.OK;

  constructor(public res: NextApiResponse, public data?: any) {}

  public send() {
    return this.res.status(this.status).json({
      result: this.data,
      statusCode: this.status,
      timestamp: Date.now(),
    });
  }
}
