import { NextApiResponse } from 'next';

export abstract class HttpResponse {
  constructor(public statusCode: number) {}

  public abstract toResponse(res: NextApiResponse): void;
}
