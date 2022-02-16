import visionDetectionApi from '@/features/vision-detection/services/vision-detection-api';
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });

const VALID_MIMETYPES = ['image/jpeg', 'image/png'];

const MAX_FILE_SIZE = 4 * 1024 * 1024;

const VALID_FILE_EXTENSIONS = ['jpg', 'png'];

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

const isValidFile = (file: any): boolean => {
  console.log({ file });
  if (!VALID_MIMETYPES.includes(file.mimetype)) {
    return false;
  }
  if (file.size > MAX_FILE_SIZE) {
    return false;
  }
  if (!VALID_FILE_EXTENSIONS.includes(file.originalname.split('.').pop())) {
    return false;
  }
  return true;
};

const Handler = async (
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse
) => {
  if (req.method !== 'POST') {
    return;
  }
  await runMiddleware(req, res, upload.single('image'));
  const { file } = req;
  if (!file) {
    return res.status(400).json({
      error: 'No file was uploaded',
    });
  }
  if (!isValidFile(file)) {
    return res.status(400).json({
      error: 'Invalid file',
    });
  }

  await visionDetectionApi.init();
  const result = await visionDetectionApi.annotate(file.buffer);

  return res.status(200).json(result);
};

export default Handler;
