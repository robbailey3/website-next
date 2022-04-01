import { Get } from '@/features/api/decorators/HttpVerbs';
import { withQueryValidation } from '@/features/api/decorators/Validation';
import { generateHttpHandler } from '@/features/api/utils/generateHttpHandler';
import { CommonQuery } from '@/features/photos/queries/commonQuery';
import stravaController from '@/features/strava/controllers/strava.controller';
import { withDatabase } from '@/services/database/database.service';
import { NextApiRequest, NextApiResponse } from 'next';

class StravaHandler {
  @Get()
  @withQueryValidation(CommonQuery)
  public async getActivities(req: NextApiRequest, res: NextApiResponse) {
    return stravaController.getActivities(req, res);
  }
}

export default withDatabase(generateHttpHandler(StravaHandler));
