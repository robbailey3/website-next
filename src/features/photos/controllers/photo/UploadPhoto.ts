import { BadRequestResponse } from '@/responses/bad-request-response';
import { NotFoundResponse } from '@/responses/not-found-response';
import { OkResponse } from '@/responses/ok-response';
import { ServerErrorResponse } from '@/responses/server-error-response';
import { runMiddleware } from '@/utils/run-middleware';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import photoService from '../../services/photo.service';
import photoAlbumService from '../../services/photoAlbum.service';
import photoUploadService from '../../services/photoUpload.service';
const upload = multer({ storage: multer.memoryStorage() });
import * as Sentry from '@sentry/nextjs';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

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

    const photoExif = await photoUploadService.readExif(file);

    await photoUploadService.uploadToStorage(file, albumId);

    const insertedId = await photoService.createPhoto({
      caption: '',
      url: `${process.env.GOOGLE_BUCKET_URL}/${albumId}/${fileName}`,
      thumbnailUrl: `${process.env.GOOGLE_BUCKET_URL}/${albumId}/thumbnail_${fileName}`,
      albumId,
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

    return new OkResponse({ id: insertedId }).toResponse(res);
  } catch (error: any) {
    Sentry.captureException(error);
    return new ServerErrorResponse(error).toResponse(res);
  }
};

export default withApiAuthRequired(UploadPhoto);
