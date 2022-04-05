import photoController from '@/features/photos/controllers/photoController';
import { NotFoundResponse } from '@/responses/NotFoundResponse';
import { withDatabase } from '@/services/database/database.service';
import { logHttpRequest } from '@/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  logHttpRequest(req);
  if (req.method === 'POST') {
    return await photoController.uploadPhoto(req, res);
  }
  return NotFoundResponse(res);
};

export default withDatabase(Handler);
