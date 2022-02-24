import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import photoUploadService from '../services/photoUpload.service';
import photoService from '../services/photo.service';
import { ObjectID } from 'bson';
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
    let { limit = 20, skip = 0, albumId } = req.query;

    limit = parseInt(limit as string, 10);
    skip = parseInt(skip as string, 10);

    const albumIdObj = ObjectID.createFromHexString(albumId as string);

    const photos = photoService.getPhotos(albumIdObj, limit, skip);

    return res.status(200).json(photos);
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
