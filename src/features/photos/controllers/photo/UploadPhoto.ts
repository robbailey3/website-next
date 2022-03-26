import { runMiddleware } from '@/utils/run-middleware';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import photoService from '../../services/photo.service';
import photoAlbumService from '../../services/photoAlbum.service';
import photoUploadService from '../../services/photoUpload.service';
const upload = multer({ storage: multer.memoryStorage() });
import * as Sentry from '@sentry/nextjs';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { ServerErrorResponse } from '@/responses/ServerErrorResponse';
import { OkResponse } from '@/responses/OkResponse';
import { NotFoundResponse } from '@/responses/NotFoundResponse';
import { BadRequestException } from '@/exceptions/BadRequestException';
import { BadRequestResponse } from '@/responses/BadRequestResponse';
import visionDetectionApi from '@/features/vision-detection/services/vision-detection-api';

const UploadPhoto = async (
  req: NextApiRequest & {
    [key: string]: any;
  },
  res: NextApiResponse
) => {
  try {
    await runMiddleware(req, res, upload.single('photo'));

    const { file } = req;

    const { albumId } = req.query;

    if (!albumId) {
      throw new BadRequestException([{ albumId: ['Album ID is required'] }]);
    }
    if (Array.isArray(albumId)) {
      throw new BadRequestException([
        { albumId: ['Album ID must be a string'] },
      ]);
    }

    if (!photoUploadService.isValidFile(file)) {
      throw new BadRequestException([{ file: ['Invalid file'] }]);
    }

    const photoAlbum = await photoAlbumService.getPhotoAlbum(albumId);

    if (!photoAlbum) {
      return NotFoundResponse(res);
    }

    const fileName = photoUploadService.generateRandomFilename(file);

    file.originalName = fileName;

    const photoExif = await photoUploadService.readExif(file);

    await visionDetectionApi.init();

    const visionResponse = await visionDetectionApi.annotate(file.buffer, [
      { type: 'LABEL_DETECTION', maxResults: 50 },
      { type: 'OBJECT_LOCALIZATION', maxResults: 50 },
    ]);

    await photoUploadService.uploadToStorage(file, albumId);

    const insertedId = await photoService.createPhoto({
      caption: '',
      url: `${process.env.GOOGLE_BUCKET_URL}/${albumId}/${fileName}`,
      thumbnailUrl: `${process.env.GOOGLE_BUCKET_URL}/${albumId}/thumbnail_${fileName}`,
      albumId,
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
    Sentry.captureException(error);
    console.error(error);
    return ServerErrorResponse(res, error);
  }
};

export default withApiAuthRequired(UploadPhoto);
