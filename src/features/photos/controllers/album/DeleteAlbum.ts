import { BadRequestException } from '@/exceptions/BadRequestException';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import photoAlbumService from '../../services/photoAlbum.service';
import * as Sentry from '@sentry/nextjs';
import { IsString } from 'class-validator';
import validationService from '@/services/validation/validation.service';
import { ServerErrorResponse } from '@/responses/ServerErrorResponse';
import { AcceptedResponse } from '@/responses/AcceptedResponse';
import { BadRequestResponse } from '@/responses/BadRequestResponse';

// TODO: Remove these inline classes
class DeleteAlbumQuery {
  @IsString()
  public albumId!: string;
}

const DeleteAlbum = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = await validationService.validateQuery(DeleteAlbumQuery, req);

    await photoAlbumService.deleteAlbum(query.albumId);

    return AcceptedResponse(res);
  } catch (error: any) {
    if (error instanceof BadRequestException) {
      return BadRequestResponse(res, error.errors);
    }
    return ServerErrorResponse(res, error);
  }
};

export default withApiAuthRequired(DeleteAlbum);
