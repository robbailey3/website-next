import { BadRequestException } from '@/exceptions/BadRequestException';
import { BadRequestResponse } from '@/responses/BadRequestResponse';
import { CreatedResponse } from '@/responses/CreatedResponse';
import { ServerErrorResponse } from '@/responses/ServerErrorResponse';
import validationService from '@/services/validation/validation.service';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { PhotoAlbumModel } from '../../models/photoAlbum';
import photoAlbumService from '../../services/photoAlbum.service';

const CreateAlbum = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await validationService.validateBody(PhotoAlbumModel, req);

    const { name } = req.body;

    await photoAlbumService.createPhotoAlbum({ name } as any);

    return CreatedResponse(res);
  } catch (error) {
    if (error instanceof BadRequestException) {
      return BadRequestResponse(res, error.errors);
    }
    return ServerErrorResponse(res, error);
  }
};

export default withApiAuthRequired(CreateAlbum);
