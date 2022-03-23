import { HttpStatus } from '@/enums/HttpStatus';
import { HttpResponse } from './HttpResponse';

export class CreatedResponse implements HttpResponse {
  public status = HttpStatus.CREATED;

  constructor(public res: any, public data?: any) {}

  public send() {
    return this.res.status(this.status).json({
      result: this.data,
      statusCode: this.status,
      timestamp: Date.now(),
    });
  }
}
