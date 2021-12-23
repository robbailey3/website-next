import { HttpStatus } from '@/enums/HttpStatus';
import { HttpResponse } from './http-response';

export class AcceptedResponse extends HttpResponse {
  constructor() {
    super(HttpStatus.ACCEPTED);
  }

  public toResponse(res: any): any {
    return res.status(this.statusCode).json({
      status: this.statusCode,
      timestamp: Date.now(),
    });
  }
}
