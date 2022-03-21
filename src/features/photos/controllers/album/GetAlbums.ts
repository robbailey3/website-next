import { BadRequestException } from '@/exceptions/BadRequestException';
import { BadRequestResponse } from '@/responses/bad-request-response';
import { OkResponse } from '@/responses/ok-response';
import { ServerErrorResponse } from '@/responses/server-error-response';
import validationService from '@/services/validation/validation.service';
import logger from '@/utils/logger';
import { Transform } from 'class-transformer';
import { IsNumber, IsNumberString, ValidateIf } from 'class-validator';
import { NextApiRequest, NextApiResponse } from 'next';
import photoAlbumService from '../../services/photoAlbum.service';

class GetAlbumsQuery {
  @IsNumberString()
  @Transform((value) => (value ? parseInt(value.value, 10) : 10))
  @ValidateIf((o) => o.limit)
  public limit!: number;

  @IsNumberString()
  @Transform((value) => (value ? parseInt(value.value, 10) : 10))
  @ValidateIf((o) => o.skip)
  public skip!: number;
}

const GetAlbums = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { limit = 10, skip = 0 } = await validationService.validateQuery(
      GetAlbumsQuery,
      req
    );

    logger.info(`Getting photo albums with limit: ${limit} and skip: ${skip}`);

    const result = await photoAlbumService.getPhotoAlbums(limit, skip);

    return new OkResponse(result).toResponse(res);
  } catch (e: any) {
    if (e instanceof BadRequestException) {
      return new BadRequestResponse(e.message, e.errors).toResponse(res);
    }
    return new ServerErrorResponse(e).toResponse(res);
  }
};

export default GetAlbums;
