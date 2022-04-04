import { Get } from '@/features/api/decorators/HttpVerbs';
import { generateHttpHandler } from '@/features/api/utils/generateHttpHandler';
import stravaController from '@/features/strava/controllers/strava.controller';
import { withDatabase } from '@/services/database/database.service';
import { NextApiRequest, NextApiResponse } from 'next';

class RunHandler {
  @Get()
  public async getRun(req: NextApiRequest, res: NextApiResponse) {
    return await stravaController.getActivityById(req, res);
  }
}

export default withDatabase(generateHttpHandler(RunHandler));
