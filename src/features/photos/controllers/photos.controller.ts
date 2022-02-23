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
    await runMiddleware(req, res, upload.array('photos'));

    const { files } = req;

    console.log({ files });

    const uploadResult = await photosService.uploadToStorage(files[0]);

    console.log({ uploadResult });

    return res.json({ uploadResult });
  }
}

export default new PhotosController();
