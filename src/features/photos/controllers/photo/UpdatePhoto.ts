import { BadRequestException } from '@/exceptions/BadRequestException';
import { BadRequestResponse } from '@/responses/BadRequestResponse';
import { OkResponse } from '@/responses/OkResponse';
import { ServerErrorResponse } from '@/responses/ServerErrorResponse';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import photoService from '../../services/photo.service';

const validateRequest = (req: NextApiRequest) => {
  const { photoId } = req.query;
  if (!photoId) {
    throw new BadRequestException([{ photoId: ['Photo id is required'] }]);
  }
  if (Array.isArray(photoId)) {
    throw new BadRequestException([{ photoId: ['Photo id must be a string'] }]);
  }
};

const UpdatePhoto = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    validateRequest(req);

    const { photoId } = req.query;

    const { caption } = req.body;

    const result = await photoService.updatePhoto(photoId as string, caption);

    return OkResponse(res, result.value);
  } catch (error: any) {
    if (error instanceof BadRequestException) {
      return BadRequestResponse(res, error.errors);
    }
    return ServerErrorResponse(res, error);
  }
};

export default withApiAuthRequired(UpdatePhoto);
