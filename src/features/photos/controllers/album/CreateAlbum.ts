import { BadRequestException } from '@/exceptions/BadRequestException';
import { BadRequestResponse } from '@/responses/bad-request-response';
import { CreatedResponse } from '@/responses/CreatedResponse';
import { OkResponse } from '@/responses/ok-response';
import { ServerErrorResponse } from '@/responses/server-error-response';
import { NextApiRequest, NextApiResponse } from 'next';
import photoAlbumService from '../../services/photoAlbum.service';

const validateRequest = (req: NextApiRequest) => {
  const { name } = req.query;

  if (!name) {
    throw new BadRequestException('Missing name');
  }

  if (Array.isArray(name)) {
    throw new BadRequestException('Multiple names not supported');
  }
};

const CreateAlbum = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name } = req.body;

    validateRequest(req);

    const result = await photoAlbumService.createPhotoAlbum({ name } as any);

    return new CreatedResponse(result).toResponse(res);
  } catch (error) {
    if (error instanceof BadRequestException) {
      return new BadRequestResponse(error.message).toResponse(res);
    }
    return new ServerErrorResponse(error).toResponse(res);
  }
};

export default CreateAlbum;
