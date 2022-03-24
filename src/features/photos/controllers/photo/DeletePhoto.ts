import { BadRequestException } from '@/exceptions/BadRequestException';
import { NextApiRequest, NextApiResponse } from 'next';
import photoService from '../../services/photo.service';
import photoUploadService from '../../services/photoUpload.service';
import * as Sentry from '@sentry/nextjs';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { AcceptedResponse } from '@/responses/AcceptedResponse';
import { BadRequestResponse } from '@/responses/BadRequestResponse';
import { ServerErrorResponse } from '@/responses/ServerErrorResponse';

const validateRequest = (req: NextApiRequest) => {
  const { photoId, albumId } = req.query;
  if (!photoId) {
    throw new BadRequestException([]);
  }
  if (Array.isArray(photoId)) {
    throw new BadRequestException([]);
  }
  if (!albumId) {
    throw new BadRequestException([]);
  }
  if (Array.isArray(albumId)) {
    throw new BadRequestException([]);
  }
};

const DeletePhoto = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    validateRequest(req);

    const { photoId, albumId } = req.query;

    const photo = await photoService.getPhoto(photoId as string);

    if (!photo) {
      throw new BadRequestException([{ message: ['Photo not found'] }]);
    }

    const imagePath = photo.url.split('/').pop();
    const thumbPath = photo.thumbnailUrl.split('/').pop();

    if (imagePath) {
      await photoUploadService.deleteFromStorage(albumId as string, imagePath);
    }
    if (thumbPath) {
      await photoUploadService.deleteFromStorage(albumId as string, thumbPath);
    }

    await photoService.deletePhoto(photoId as string);

    return AcceptedResponse(res);
  } catch (error: any) {
    if (error instanceof BadRequestException) {
      return BadRequestResponse(res, error.errors);
    }
    Sentry.captureException(error);
    return ServerErrorResponse(res, error);
  }
};

export default withApiAuthRequired(DeletePhoto);
