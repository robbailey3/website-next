import { HttpStatus } from '@/enums/HttpStatus';
import { NextApiResponse } from 'next';
import { HttpResponse } from './http-response';

export class AcceptedResponse extends HttpResponse {
  constructor() {
    super(HttpStatus.ACCEPTED);
  }

  public toResponse(res: NextApiResponse<any>): void {
    return res.status(this.statusCode).json({
      status: this.statusCode,
      timestamp: Date.now(),
    });
  }
}
