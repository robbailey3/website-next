import { BadRequestException } from '@/exceptions/BadRequestException';
import { BadRequestResponse } from '@/responses/bad-request-response';
import { ServerErrorResponse } from '@/responses/server-error-response';
import { NextApiRequest, NextApiResponse } from 'next';
import photoAlbumService from '../../services/photoAlbum.service';

const validateRequest = (req: NextApiRequest) => {
  const { id } = req.query;
  if (!id) {
    throw new BadRequestException('Id is required');
  }
  if (Array.isArray(id)) {
    throw new BadRequestException('Multiple ids are not allowed');
  }
};

const UpdateAlbum = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    validateRequest(req);
    const { id } = req.query;

    const { name, coverImageId } = req.body;

    return await photoAlbumService.updatePhotoAlbum(id as string, {
      name,
      coverImageId,
    });
  } catch (error: any) {
    if (error instanceof BadRequestException) {
      return new BadRequestResponse(error.message).toResponse(res);
    }
    return new ServerErrorResponse(error).toResponse(res);
  }
};

export default UpdateAlbum;
