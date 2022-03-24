import UploadPhoto from '@/features/photos/controllers/photo/UploadPhoto';
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
    return await UploadPhoto(req, res);
  }
  return NotFoundResponse(res);
};

export default withDatabase(Handler);
