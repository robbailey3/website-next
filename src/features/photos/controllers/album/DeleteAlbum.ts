import { BadRequestException } from '@/exceptions/BadRequestException';
import { AcceptedResponse } from '@/responses/AcceptedResponse';
import { BadRequestResponse } from '@/responses/bad-request-response';
import { OkResponse } from '@/responses/ok-response';
import { ServerErrorResponse } from '@/responses/server-error-response';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import photoAlbumService from '../../services/photoAlbum.service';
import * as Sentry from '@sentry/nextjs';

const validateRequest = (req: NextApiRequest): void => {
  if (!req.query.albumId) {
    throw new BadRequestException('Id is required');
  }
  if (Array.isArray(req.query.albumId)) {
    throw new BadRequestException('Multiple Ids are not allowed');
  }
};

const DeleteAlbum = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    validateRequest(req);
    await photoAlbumService.deleteAlbum(req.query.albumId as string);

    return new AcceptedResponse().toResponse(res);
  } catch (error: any) {
    if (error instanceof BadRequestException) {
      return new BadRequestResponse(error.message).toResponse(res);
    }
    Sentry.captureException(error);
    return new ServerErrorResponse(error).toResponse(res);
  }
};

export default withApiAuthRequired(DeleteAlbum);
