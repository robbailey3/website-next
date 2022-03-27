import { Post } from '@/features/api/decorators/HttpVerbs';
import { generateHttpHandler } from '@/features/api/utils/generateHttpHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import busboy from 'busboy';

export const config = {
  api: {
    bodyParser: false,
  },
};

class TestHandler {
  @Post()
  public async testUpload(req: NextApiRequest, res: NextApiResponse) {
    const bb = busboy({ headers: req.headers });
    bb.on('file', (name, file, info) => {
      const result: Uint8Array[] = [];
      file
        .on('data', (data) => {
          result.push(data);
        })
        .on('end', () => {
          console.log(Buffer.concat(result));
        });
    });
    req.pipe(bb);
  }
}

export default generateHttpHandler(TestHandler);
