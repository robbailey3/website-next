import { WebhookRequest } from '@/services/strava/requests/WebhookRequest';
import stravaService from '@/services/strava/strava.service';
import { NextApiRequest, NextApiResponse } from 'next';

const Handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const webhookBody: WebhookRequest = req.body;
    if (webhookBody.object_type === 'activity') {
      stravaService.getActivityAndInsertIntoDatabase(
        webhookBody.object_id.toString()
      );
    }
    return res.send('EVENT_RECEIVED');
  }
  if (req.method === 'GET') {
    // Your verify token. Should be a random string.
    const VERIFY_TOKEN = process.env.STRAVA_WEBHOOK_VERIFY_TOKEN;
    // Parses the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      // Verifies that the mode and token sent are valid
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        // Responds with the challenge token from the request
        return res.json({ 'hub.challenge': challenge });
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        return res.status(403).send('WEBHOOK_NOT_VERIFIED');
      }
    }
    return res.status(500).send('Something went wrong');
  }
  return res.status(500).send('Sonething went wrong');
};

export default Handler;
