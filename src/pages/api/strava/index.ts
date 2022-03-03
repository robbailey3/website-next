import stravaController from '@/features/strava/controllers/strava.controller';
import { withDatabase } from '@/services/database/database.service';
import { logHttpRequest } from '@/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  logHttpRequest(req);
  try {
    return await stravaController.getActivities(req, res);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export default withDatabase(Handler);
