import { OkResponse } from '@/responses/OkResponse';
import validationService from '@/services/validation/validation.service';
import logger from '@/utils/logger';
import { Transform } from 'class-transformer';
import { IsNumberString, ValidateIf } from 'class-validator';
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
  const { limit = 10, skip = 0 } = await validationService.validateQuery(
    GetAlbumsQuery,
    req
  );

  logger.info(`Getting photo albums with limit: ${limit} and skip: ${skip}`);

  const result = await photoAlbumService.getPhotoAlbums(limit, skip);

  return OkResponse(res, result);
};

export default GetAlbums;
