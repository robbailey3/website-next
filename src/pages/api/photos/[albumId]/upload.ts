import UploadPhoto from '@/features/photos/controllers/photo/UploadPhoto';
import { NotFoundResponse } from '@/responses/not-found-response';
import { withDatabase } from '@/services/database/database.service';
import { logHttpRequest } from '@/utils/logger';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
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
  return new NotFoundResponse().toResponse(res);
};

export default withDatabase(Handler);
