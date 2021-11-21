import { NextApiResponse } from 'next';

export class DataResponse<T> {
  constructor(public data: T, public status: number, public error?: string) {}

  public toJSON() {
    return {
      timestamp: Date.now(),
      data: this.data,
      status: this.status,
      error: this.error,
    };
  }

  public toResponse(res: NextApiResponse) {
    res.status(this.status).json(this.toJSON());
  }
}
