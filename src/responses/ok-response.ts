import { HttpStatus } from 'src/enums/HttpStatus';
import { HttpResponse } from './http-response';

export class OkResponse extends HttpResponse {
  constructor(public data: any | any[]) {
    super(HttpStatus.OK);
  }

  public toResponse(res: any): any {
    return res.status(this.statusCode).json({
      status: this.statusCode,
      data: this.data,
      timestamp: Date.now(),
    });
  }
}
