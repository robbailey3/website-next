import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import photoUploadService from '../services/photoUpload.service';
import photoService from '../services/photo.service';
import { ObjectID } from 'bson';
import { OkResponse } from '@/responses/ok-response';
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
  public async getPhotos(req: NextApiRequest, res: NextApiResponse) {
    let { limit = 20, skip = 0, id } = req.query;

    limit = parseInt(limit as string, 10);
    skip = parseInt(skip as string, 10);

    const photos = await photoService.getPhotos(id as string, limit, skip);

    return new OkResponse(photos).toResponse(res);
  }

  public async uploadPhotos(
    req: NextApiRequest & { [key: string]: any },
    res: NextApiResponse
  ) {
    try {
      await runMiddleware(req, res, upload.single('photo'));

      const { file } = req;

      if (!photoUploadService.isValidFile(file)) {
        return res.status(400).json({ message: 'Invalid file' });
      }

      console.log(`File: ${file.originalname}`);

      await photoUploadService.uploadToStorage(file);

      return res.status(200).json({ message: 'Success' });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new PhotosController();
