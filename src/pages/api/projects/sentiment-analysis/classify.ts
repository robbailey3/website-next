import sentimentAnalysis from '@/features/sentiment-analysis/services/sentimentAnalysis';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from '@sentry/node';
import { logHttpRequest } from '@/utils/logger';

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  logHttpRequest(req);
  if (req.method !== 'POST') {
    return res.status(404).end();
  }
  try {
    const text = req.body.text;
    if (!text) {
      return res.status(400).end();
    }
    await sentimentAnalysis.initialise();
    const classify = await sentimentAnalysis.classify(text);
    return res.status(200).json({
      ...classify,
    });
  } catch (err: any) {
    Sentry.captureException(err);
    return res.status(500).json({ error: err.message });
  }
};

export default Handler;
