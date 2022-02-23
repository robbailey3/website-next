import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import photosService from '../services/photos.service';
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

class PhotosController {
  public getPhotos(req: NextApiRequest, res: NextApiResponse) {
    return res.json({ message: 'Hello Photos' });
  }

  public async uploadPhotos(
    req: NextApiRequest & { [key: string]: any },
    res: NextApiResponse
  ) {
    try {
      await runMiddleware(req, res, upload.single('photo'));

      const { file } = req;

      if (!photosService.isValidFile(file)) {
        return res.status(400).json({ message: 'Invalid file' });
      }

      console.log(`File: ${file.originalname}`);

      await photosService.uploadToStorage(file);

      return res.status(200).json({ message: 'Success' });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new PhotosController();
