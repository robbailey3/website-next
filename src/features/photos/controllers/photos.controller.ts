import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import photoUploadService from '../services/photoUpload.service';
import photoService from '../services/photo.service';
import { OkResponse } from '@/responses/ok-response';
import photoAlbumService from '../services/photoAlbum.service';
import { ServerErrorResponse } from '@/responses/server-error-response';
import { NotFoundResponse } from '@/responses/not-found-response';
import { BadRequestResponse } from '@/responses/bad-request-response';
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
    let { limit = 20, skip = 0, albumId } = req.query;

    limit = parseInt(limit as string, 10);
    skip = parseInt(skip as string, 10);

    const photos = await photoService.getPhotos(albumId as string, limit, skip);

    return new OkResponse(photos).toResponse(res);
  }

  public async uploadPhotos(
    req: NextApiRequest & { [key: string]: any },
    res: NextApiResponse
  ) {
    try {
      await runMiddleware(req, res, upload.single('photo'));

      const { file } = req;

      const { albumId } = req.query;

      if (!albumId) {
        return new BadRequestResponse('Missing id').toResponse(res);
      }
      if (Array.isArray(albumId)) {
        return new BadRequestResponse('id must be a string').toResponse(res);
      }

      if (!photoUploadService.isValidFile(file)) {
        return new BadRequestResponse('Invalid file type').toResponse(res);
      }

      const photoAlbum = await photoAlbumService.getPhotoAlbum(albumId);

      if (!photoAlbum) {
        return new NotFoundResponse().toResponse(res);
      }

      const fileName = photoUploadService.generateRandomFilename(file);

      file.originalName = fileName;

      await photoUploadService.uploadToStorage(file, albumId);

      const insertedId = await photoService.createPhoto({
        caption: '',
        url: `${process.env.GOOGLE_BUCKET_URL}/${albumId}/${fileName}`,
        thumbnailUrl: `${process.env.GOOGLE_BUCKET_URL}/${albumId}/thumbnail_${fileName}`,
        albumId,
      });

      return new OkResponse({ id: insertedId }).toResponse(res);
    } catch (error: any) {
      return new ServerErrorResponse(error).toResponse(res);
    }
  }

  public async deletePhoto(req: NextApiRequest, res: NextApiResponse) {
    const { photoId, albumId } = req.query;

    if (!photoId) {
      return new BadRequestResponse('Missing id').toResponse(res);
    }
    if (Array.isArray(photoId)) {
      return new BadRequestResponse('id must be a string').toResponse(res);
    }
    if (!albumId) {
      return new BadRequestResponse('Missing albumId').toResponse(res);
    }
    if (Array.isArray(albumId)) {
      return new BadRequestResponse('albumId must be a string').toResponse(res);
    }

    await photoService.deletePhoto(photoId);

    await photoUploadService.deleteFromStorage(albumId, photoId);

    return new OkResponse({}).toResponse(res);
  }
}

export default new PhotosController();
