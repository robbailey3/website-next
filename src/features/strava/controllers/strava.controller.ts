import stravaService from '@/features/strava/services/strava.service';
import { OkResponse } from '@/responses/OkResponse';
import { NextApiRequest, NextApiResponse } from 'next';
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
    const { limit, skip } = req.query;
    const activities = await this.service.getActivities(
      limit as any as number,
      skip as any as number
    );
    return OkResponse(res, activities);
  }

  public async getActivityById(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    console.log(id);
    const activity = await this.service.getActivityById(id as any as string);

    return OkResponse(res, activity);
  }

  public async getTrendData(req: NextApiRequest, res: NextApiResponse) {
    const trendData = await this.service.getTrendData();

    return OkResponse(res, trendData);
  }

  public async getTotals(req: NextApiRequest, res: NextApiResponse) {
    const totals = await this.service.getTotals();

    return OkResponse(res, totals);
  }
}

export default new StravaController();
