import stravaService from '@/features/strava/services/strava.service';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { OkResponse } from '@/responses/ok-response';
import { WebhookRequest } from '../requests/WebhookRequest';

class StravaController {
  private service = stravaService;

  public webhookGet(req: NextApiRequest, res: NextApiResponse) {
    const VERIFY_TOKEN = process.env.STRAVA_WEBHOOK_VERIFY_TOKEN;
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    if (mode && token) {
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        return res.json({ 'hub.challenge': challenge });
      } else {
        return res.status(403).send('WEBHOOK_NOT_VERIFIED');
      }
    }
    return res.status(500).send('Something went wrong');
  }

  public async webhookPost(req: NextApiRequest, res: NextApiResponse) {
    const webhookBody: WebhookRequest = req.body;
    if (webhookBody.object_type === 'activity') {
      await this.service.getActivityAndInsertIntoDatabase(
        webhookBody.object_id.toString()
      );
    }
    return res.send('EVENT_RECEIVED');
  }

  public async getActivities(req: NextApiRequest, res: NextApiResponse) {
    const activities = await this.service.getActivities();
    return new OkResponse(activities).toResponse(res);
  }
}

export default new StravaController();
