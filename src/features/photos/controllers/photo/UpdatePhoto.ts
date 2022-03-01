import { BadRequestException } from '@/exceptions/BadRequestException';
import { BadRequestResponse } from '@/responses/bad-request-response';
import { OkResponse } from '@/responses/ok-response';
import { ServerErrorResponse } from '@/responses/server-error-response';
import { NextApiRequest, NextApiResponse } from 'next';
import photoService from '../../services/photo.service';
import photoUploadService from '../../services/photoUpload.service';

const validateRequest = (req: NextApiRequest) => {
  const { photoId } = req.query;
  if (!photoId) {
    throw new BadRequestException('Photo id is required');
  }
  if (Array.isArray(photoId)) {
    throw new BadRequestException('Photo id must be a string');
  }
};

const UpdatePhoto = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    validateRequest(req);

    const { photoId } = req.query;

    const { caption } = req.body;

    const result = await photoService.updatePhoto(photoId as string, caption);

    return new OkResponse(result.value).toResponse(res);
  } catch (error: any) {
    if (error instanceof BadRequestException) {
      return new BadRequestResponse(error.message).toResponse(res);
    }
    return new ServerErrorResponse(error).toResponse(res);
  }
};

export default UpdatePhoto;
