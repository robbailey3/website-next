import { BadRequestException } from '@/exceptions/BadRequestException';
import { AcceptedResponse } from '@/responses/AcceptedResponse';
import { BadRequestResponse } from '@/responses/BadRequestResponse';
import { ServerErrorResponse } from '@/responses/ServerErrorResponse';
import validationService from '@/services/validation/validation.service';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { IsString } from 'class-validator';
import { NextApiRequest, NextApiResponse } from 'next';
import photoAlbumService from '../../services/photoAlbum.service';

class UpdateAlbumQuery {
  @IsString()
  public albumId!: string;
}

class UpdateAlbumBody {
  @IsString()
  public name!: string;

  @IsString()
  public coverImageId!: string;
}

const UpdateAlbum = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = await validationService.validateQuery(UpdateAlbumQuery, req);

    const request = await validationService.validateBody(UpdateAlbumBody, req);

    await photoAlbumService.updatePhotoAlbum(query.albumId, {
      ...request,
    });

    return AcceptedResponse(res);
  } catch (error: any) {
    if (error instanceof BadRequestException) {
      return BadRequestResponse(res, error.errors);
    }
    return ServerErrorResponse(res, error);
  }
};

export default withApiAuthRequired(UpdateAlbum);
