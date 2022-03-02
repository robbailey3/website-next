import { BadRequestException } from '@/exceptions/BadRequestException';
import { BadRequestResponse } from '@/responses/bad-request-response';
import { OkResponse } from '@/responses/ok-response';
import { ServerErrorResponse } from '@/responses/server-error-response';
import { NextApiRequest, NextApiResponse } from 'next';
import photoAlbumService from '../../services/photoAlbum.service';

const validateRequest = (req: NextApiRequest) => {
  const { albumId } = req.query;
  if (!albumId) {
    throw new BadRequestException('Id is required');
  }
  if (Array.isArray(albumId)) {
    throw new BadRequestException('Multiple ids are not allowed');
  }
};

const UpdateAlbum = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    validateRequest(req);
    const { albumId } = req.query;

    const { name, coverImageId } = req.body;

    const updateRequest: { name?: string; coverImageId?: string } = {};

    if (name) {
      updateRequest['name'] = name;
    }

    if (coverImageId) {
      updateRequest['coverImageId'] = coverImageId;
    }

    await photoAlbumService.updatePhotoAlbum(albumId as string, {
      name,
      coverImageId,
    });

    return new OkResponse({}).toResponse(res);
  } catch (error: any) {
    if (error instanceof BadRequestException) {
      return new BadRequestResponse(error.message).toResponse(res);
    }
    return new ServerErrorResponse(error).toResponse(res);
  }
};

export default UpdateAlbum;
