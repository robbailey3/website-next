import { Get } from '@/features/api/decorators/HttpVerbs';
import { generateHttpHandler } from '@/features/api/utils/generateHttpHandler';
import stravaController from '@/features/strava/controllers/strava.controller';
import { withDatabase } from '@/services/database/database.service';
import { NextApiRequest, NextApiResponse } from 'next';

class TotalsHandler {
  @Get()
  public getTotals(req: NextApiRequest, res: NextApiResponse) {
    return stravaController.getTotals(req, res);
  }
}

export default withDatabase(generateHttpHandler(TotalsHandler));
