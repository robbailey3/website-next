import { BadRequestException } from '@/exceptions/BadRequestException';
import { BadRequestResponse } from '@/responses/bad-request-response';
import { OkResponse } from '@/responses/ok-response';
import { NextApiRequest, NextApiResponse } from 'next';
import photoAlbumService from '../../services/photoAlbum.service';

const validateRequest = (req: NextApiRequest) => {
  const { albumId } = req.query;

  if (!albumId) {
    throw new BadRequestException('Missing id');
  }

  if (Array.isArray(albumId)) {
    throw new BadRequestException('Multiple ids not supported');
  }
};

const GetAlbum = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { albumId } = req.query;

    validateRequest(req);

    const result = await photoAlbumService.getPhotoAlbum(albumId as string);

    return new OkResponse(result).toResponse(res);
  } catch (error) {
    if (error instanceof BadRequestException) {
      return new BadRequestResponse(error.message).toResponse(res);
    }
  }
};

export default GetAlbum;
