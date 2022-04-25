import { Get } from '@/features/api/decorators/HttpVerbs';
import { generateHttpHandler } from '@/features/api/utils/generateHttpHandler';
import photoController from '@/features/photos/controllers/photoController';
import { withDatabase } from '@/services/database/database.service';
import { NextApiRequest, NextApiResponse } from 'next';

class SearchHandler {
  @Get()
  public async Search(req: NextApiRequest, res: NextApiResponse) {
    return photoController.search(req, res);
  }
}

export default withDatabase(generateHttpHandler(SearchHandler));
