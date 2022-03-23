import { Get, Post } from '@/features/api/decorators/HttpVerbs';
import {
  withBodyValidation,
  withQueryValidation,
} from '@/features/api/decorators/Validation';
import { generateHttpHandler } from '@/features/api/utils/generateHttpHandler';
import GetAlbums from '@/features/photos/controllers/album/GetAlbums';
import photoController from '@/features/photos/controllers/photoController';
import { PhotoAlbumModel } from '@/features/photos/models/photoAlbum';
import { CommonQuery } from '@/features/photos/queries/commonQuery';
import { OkResponse } from '@/responses/OkResponse';
import { withDatabase } from '@/services/database/database.service';
import { NextApiRequest, NextApiResponse } from 'next';

class PhotoHandler {
  @Get()
  @withQueryValidation(CommonQuery)
  public async getAlbums(req: NextApiRequest, res: NextApiResponse) {
    const albums = await photoController.getAlbums(req, res);

    return new OkResponse(res, albums).send();
  }

  @Post()
  @withBodyValidation(PhotoAlbumModel)
  public createAlbum(req: NextApiRequest, res: NextApiResponse) {
    // return CreateAlbum(req, res);
  }
}

export default withDatabase(generateHttpHandler(PhotoHandler));
