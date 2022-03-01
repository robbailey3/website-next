import { BadRequestException } from '@/exceptions/BadRequestException';
import { BadRequestResponse } from '@/responses/bad-request-response';
import { OkResponse } from '@/responses/ok-response';
import { ServerErrorResponse } from '@/responses/server-error-response';
import { NextApiRequest, NextApiResponse } from 'next';
import photoService from '../../services/photo.service';
import photoUploadService from '../../services/photoUpload.service';

const validateRequest = (req: NextApiRequest) => {
  const { photoId, albumId } = req.query;
  if (!photoId) {
    throw new BadRequestException('Photo id is required');
  }
  if (Array.isArray(photoId)) {
    throw new BadRequestException('Photo id must be a string');
  }
  if (!albumId) {
    throw new BadRequestException('Album id is required');
  }
  if (Array.isArray(albumId)) {
    throw new BadRequestException('Album id must be a string');
  }
};

const DeletePhoto = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    validateRequest(req);

    const { photoId, albumId } = req.query;

    await photoService.deletePhoto(photoId as string);

    await photoUploadService.deleteFromStorage(
      albumId as string,
      photoId as string
    );

    return new OkResponse({}).toResponse(res);
  } catch (error: any) {
    if (error instanceof BadRequestException) {
      return new BadRequestResponse(error.message).toResponse(res);
    }
    return new ServerErrorResponse(error).toResponse(res);
  }
};

export default DeletePhoto;
