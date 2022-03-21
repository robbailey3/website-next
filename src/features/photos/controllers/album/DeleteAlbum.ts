import { BadRequestException } from '@/exceptions/BadRequestException';
import { AcceptedResponse } from '@/responses/AcceptedResponse';
import { BadRequestResponse } from '@/responses/bad-request-response';
import { OkResponse } from '@/responses/ok-response';
import { ServerErrorResponse } from '@/responses/server-error-response';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import photoAlbumService from '../../services/photoAlbum.service';
import * as Sentry from '@sentry/nextjs';
import { IsString } from 'class-validator';
import validationService from '@/services/validation/validation.service';

// TODO: Remove these inline classes
class DeleteAlbumQuery {
  @IsString()
  public albumId!: string;
}

const DeleteAlbum = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = await validationService.validateQuery(DeleteAlbumQuery, req);

    await photoAlbumService.deleteAlbum(query.albumId);

    return new AcceptedResponse().toResponse(res);
  } catch (error: any) {
    if (error instanceof BadRequestException) {
      return new BadRequestResponse(error.message, error.errors).toResponse(
        res
      );
    }
    Sentry.captureException(error);
    return new ServerErrorResponse(error).toResponse(res);
  }
};

export default withApiAuthRequired(DeleteAlbum);
