import GetAlbum from '@/features/photos/controllers/album/GetAlbum';
import { withDatabase } from '@/services/database/database.service';
import { logHttpRequest } from '@/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';

const Handler = (req: NextApiRequest, res: NextApiResponse) => {
  logHttpRequest(req);
  if (req.method === 'GET') {
    return GetAlbum(req, res);
  }
};

export default withDatabase(Handler);
