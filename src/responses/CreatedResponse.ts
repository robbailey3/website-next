import { HttpStatus } from '@/enums/HttpStatus';
import { NextApiResponse } from 'next';
import { HttpResponse } from './http-response';

export class CreatedResponse extends HttpResponse {
  constructor(public result: any) {
    super(HttpStatus.CREATED);
  }

  public toResponse(res: NextApiResponse) {
    return res.status(this.statusCode).json({
      status: this.statusCode,
      result: this.result,
      timestamp: Date.now(),
    });
  }
}
