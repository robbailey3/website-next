import { BadRequestException } from '@/exceptions/BadRequestException';
import { BadRequestResponse } from '@/responses/bad-request-response';
import { CreatedResponse } from '@/responses/CreatedResponse';
import { ServerErrorResponse } from '@/responses/server-error-response';
import validationService from '@/services/validation/validation.service';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { PhotoAlbumModel } from '../../models/photoAlbum';
import photoAlbumService from '../../services/photoAlbum.service';

const CreateAlbum = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await validationService.validateBody(PhotoAlbumModel, req);

    const { name } = req.body;

    const result = await photoAlbumService.createPhotoAlbum({ name } as any);

    return new CreatedResponse({}).toResponse(res);
  } catch (error) {
    if (error instanceof BadRequestException) {
      return new BadRequestResponse(error.message, error.errors).toResponse(
        res
      );
    }
    return new ServerErrorResponse(error).toResponse(res);
  }
};

export default withApiAuthRequired(CreateAlbum);
