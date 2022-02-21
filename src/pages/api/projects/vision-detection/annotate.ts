import visionDetectionApi from '@/features/vision-detection/services/vision-detection-api';
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });

const VALID_MIMETYPES = ['image/jpeg', 'image/png'];

const MAX_FILE_SIZE = 4 * 1024 * 1024;

const VALID_FILE_EXTENSIONS = ['jpg', 'png', 'jpeg'];

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

const isInvalidFile = (file: any): string | null => {
  if (!VALID_MIMETYPES.includes(file.mimetype)) {
    return 'Invalid file type';
  }
  if (file.size > MAX_FILE_SIZE) {
    return 'File is too large';
  }
  if (
    !VALID_FILE_EXTENSIONS.includes(
      file.originalname.split('.').pop().toLowerCase()
    )
  ) {
    return 'Invalid file extension';
  }
  return null;
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
  const error = isInvalidFile(file);
  if (error) {
    return res.status(400).json({
      error,
    });
  }

  await visionDetectionApi.init();
  const result = await visionDetectionApi.annotate(file.buffer);

  return res.status(200).json(result);
};

export default Handler;
