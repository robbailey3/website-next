import { BadRequestException } from '@/exceptions/BadRequestException';
import { BadRequestResponse } from '@/responses/bad-request-response';
import { OkResponse } from '@/responses/ok-response';
import { ServerErrorResponse } from '@/responses/server-error-response';
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

    return new OkResponse({}).toResponse(res);
  } catch (error: any) {
    if (error instanceof BadRequestException) {
      return new BadRequestResponse(error.message, error.errors).toResponse(
        res
      );
    }
    return new ServerErrorResponse(error).toResponse(res);
  }
};

export default withApiAuthRequired(UpdateAlbum);
