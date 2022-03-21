import { BadRequestException } from '@/exceptions/BadRequestException';
import { BadRequestResponse } from '@/responses/bad-request-response';
import { OkResponse } from '@/responses/ok-response';
import { ServerErrorResponse } from '@/responses/server-error-response';
import validationService from '@/services/validation/validation.service';
import logger from '@/utils/logger';
import { Transform } from 'class-transformer';
import { IsNumber, IsNumberString } from 'class-validator';
import { NextApiRequest, NextApiResponse } from 'next';
import photoAlbumService from '../../services/photoAlbum.service';

class GetAlbumsQuery {
  @IsNumberString()
  @Transform((value) => parseInt(value.value, 10))
  public limit!: number;

  @IsNumberString()
  @Transform((value) => parseInt(value.value, 10))
  public skip!: number;
}

const GetAlbums = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const query = await validationService.validateQuery(GetAlbumsQuery, req);

    logger.info(
      `Getting photo albums with limit: ${query.limit} and skip: ${query.skip}`
    );

    const result = await photoAlbumService.getPhotoAlbums(
      query.limit,
      query.skip
    );

    return new OkResponse(result).toResponse(res);
  } catch (e: any) {
    if (e instanceof BadRequestException) {
      return new BadRequestResponse(e.message, e.errors).toResponse(res);
    }
    return new ServerErrorResponse(e).toResponse(res);
  }
};

export default GetAlbums;
