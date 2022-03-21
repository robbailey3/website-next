import { BadRequestException } from '@/exceptions/BadRequestException';
import { BadRequestResponse } from '@/responses/bad-request-response';
import { OkResponse } from '@/responses/ok-response';
import validationService from '@/services/validation/validation.service';
import { IsString } from 'class-validator';
import { NextApiRequest, NextApiResponse } from 'next';
import photoAlbumService from '../../services/photoAlbum.service';

class GetAlbumQuery {
  @IsString()
  public albumId!: string;
}

const GetAlbum = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await validationService.validateQuery(GetAlbumQuery, req);

    const { albumId } = req.query;

    const result = await photoAlbumService.getPhotoAlbum(albumId as string);

    return new OkResponse(result).toResponse(res);
  } catch (error) {
    if (error instanceof BadRequestException) {
      return new BadRequestResponse(error.message).toResponse(res);
    }
  }
};

export default GetAlbum;
