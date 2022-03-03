import { HttpStatus } from '@/enums/HttpStatus';
import { HttpResponse } from './http-response';

export class OkResponse extends HttpResponse {
  constructor(public result: any | any[]) {
    super(HttpStatus.OK);
  }

  public toResponse(res: any): any {
    return res.status(this.statusCode).json({
      status: this.statusCode,
      result: this.result,
      timestamp: Date.now(),
    });
  }
}
