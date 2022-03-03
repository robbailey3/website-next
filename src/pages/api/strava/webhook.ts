import stravaController from '@/features/strava/controllers/strava.controller';
import { logHttpRequest } from '@/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  logHttpRequest(req);
  if (req.method === 'POST') {
    return stravaController.webhookPost(req, res);
  }
  if (req.method === 'GET') {
    return stravaController.webhookGet(req, res);
  }
  return res.status(405).send('Something went wrong');
};

export default Handler;
