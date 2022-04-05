import { Get, Patch, Post } from '@/features/api/decorators/HttpVerbs';
import { withQueryValidation } from '@/features/api/decorators/Validation';
import { generateHttpHandler } from '@/features/api/utils/generateHttpHandler';
import photoController from '@/features/photos/controllers/photoController';
import { CommonQuery } from '@/features/photos/queries/commonQuery';
import { withDatabase } from '@/services/database/database.service';
import { NextApiRequest, NextApiResponse } from 'next';

class PhotoIdHandler {
  @Get()
  @withQueryValidation(CommonQuery)
  public async getPhoto(req: NextApiRequest, res: NextApiResponse) {
    return await photoController.getPhotos(req, res);
  }
}

export default withDatabase(generateHttpHandler(PhotoIdHandler));
