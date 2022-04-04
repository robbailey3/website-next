import { Get, Post } from '@/features/api/decorators/HttpVerbs';
import {
  withBodyValidation,
  withQueryValidation,
} from '@/features/api/decorators/Validation';
import { generateHttpHandler } from '@/features/api/utils/generateHttpHandler';
import photoController from '@/features/photos/controllers/photoController';
import { CommonQuery } from '@/features/photos/queries/commonQuery';
import { withDatabase } from '@/services/database/database.service';
import { IsString } from 'class-validator';
import { NextApiRequest, NextApiResponse } from 'next';

class GetPhotoQuery {
  @IsString()
  public id!: string;
}

class PhotoHandler {
  @Get()
  @withQueryValidation(GetPhotoQuery)
  public async getPhoto(req: NextApiRequest, res: NextApiResponse) {
    return await photoController.getPhoto(req, res);
  }
}

export default withDatabase(generateHttpHandler(PhotoHandler));
