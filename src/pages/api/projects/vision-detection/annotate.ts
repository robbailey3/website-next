import visionDetectionApi from '@/features/vision-detection/services/vision-detection-api';
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });

function runMiddleware(
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse,
  fn: (...args: any[]) => void
): Promise<any> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const Handler = async (
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse
) => {
  if (req.method !== 'POST') {
    return;
  }
  await runMiddleware(req, res, upload.single('file'));
  const { file } = req;
  console.log({ file });
  await visionDetectionApi.init();
  const result = await visionDetectionApi.annotate(file.buffer);

  return res.status(200).json(result);
};

export default Handler;
