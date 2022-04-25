import multer from 'multer';
import { BadRequestException } from '@/exceptions/BadRequestException';
import visionDetectionApi from '@/features/vision-detection/services/vision-detection-api';
import { AcceptedResponse } from '@/responses/AcceptedResponse';
import { BadRequestResponse } from '@/responses/BadRequestResponse';
import { OkResponse } from '@/responses/OkResponse';
import { ServerErrorResponse } from '@/responses/ServerErrorResponse';
import { runMiddleware } from '@/utils/run-middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import photoService from '../services/photo.service';
import photoUploadService from '../services/photoUpload.service';
const upload = multer({ storage: multer.memoryStorage() });
import * as Sentry from '@sentry/nextjs';

class PhotoController {
  public async getPhotos(req: NextApiRequest, res: NextApiResponse) {
    const { limit, skip } = req.query;

    const limitNum = limit ? parseInt(limit as string, 10) : 25;
    const skipNum = skip ? parseInt(skip as string, 10) : 0;

    const photos = await photoService.getPhotos(limitNum, skipNum);

    const count = await photoService.getCount();

    return OkResponse(res, { photos, count });
  }

  public async getPhoto(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    const photo = await photoService.getPhoto(id as any);

    return OkResponse(res, photo);
  }

  public async updatePhoto(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    const photo = await photoService.updatePhoto(id as any, req.body);

    return OkResponse(res, photo);
  }

  public async uploadPhoto(
    req: NextApiRequest & { [key: string]: any },
    res: NextApiResponse
  ) {
    try {
      await runMiddleware(req, res, upload.single('photo'));

      const { file } = req;

      if (!photoUploadService.isValidFile(file)) {
        throw new BadRequestException([{ file: ['Invalid file'] }]);
      }

      const fileName = photoUploadService.generateRandomFilename(file);

      file.originalName = fileName;

      const photoExif = await photoUploadService.readExif(file);

      await visionDetectionApi.init();

      const visionResponse = await visionDetectionApi.annotate(file.buffer, [
        { type: 'LABEL_DETECTION', maxResults: 50 },
        { type: 'OBJECT_LOCALIZATION', maxResults: 50 },
      ]);

      await photoUploadService.uploadToStorage(file);

      const insertedId = await photoService.createPhoto({
        caption: '',
        url: `${process.env.GOOGLE_BUCKET_URL}/${fileName}`,
        thumbnailUrl: `${process.env.GOOGLE_BUCKET_URL}/thumbnail_${fileName}`,
        labels: visionResponse.labelAnnotations,
        object: visionResponse.localizedObjectAnnotations,
        metadata: photoExif && {
          imageWidth: photoExif.ImageWidth,
          imageHeight: photoExif.ImageHeight,
          make: photoExif.Make,
          model: photoExif.Model,
          exposureTime: photoExif.ExposureTime,
          fNumber: photoExif.FNumber,
          iso: photoExif.ISO,
          lensModel: photoExif.LensModel,
          lensMake: photoExif.LensMake,
          focalLength: photoExif.FocalLength,
          dateTimeOriginal: photoExif.DateTimeOriginal,
        },
        location:
          photoExif && photoExif.longitude && photoExif.latitude
            ? {
                type: 'Point',
                coordinates: [photoExif.longitude, photoExif.latitude],
              }
            : undefined,
      });

      return OkResponse(res, { id: insertedId });
    } catch (error: any) {
      if (error instanceof BadRequestException) {
        return BadRequestResponse(res, error.errors);
      }
      console.error(error);
      Sentry.captureException(error);
      return ServerErrorResponse(res, error);
    }
  }

  public async deletePhoto(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    await photoService.deletePhoto(id as string);

    return AcceptedResponse(res);
  }

  public async search(req: NextApiRequest, res: NextApiResponse) {
    const { query, type, location } = req.query;

    if (type === 'keyword' && !query) {
      throw new BadRequestException([{ query: ['Query is required'] }]);
    }

    if (type === 'location' && !location) {
      throw new BadRequestException([{ location: ['Location is required'] }]);
    }

    const photos = await photoService.keywordSearch(query as string);

    return OkResponse(res, photos);
  }
}

export default new PhotoController();
