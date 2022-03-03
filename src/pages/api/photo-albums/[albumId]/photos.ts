import GetPhotos from '@/features/photos/controllers/photo/GetPhotos';
import { withDatabase } from '@/services/database/database.service';
import { logHttpRequest } from '@/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';

const Handler = (req: NextApiRequest, res: NextApiResponse) => {
  logHttpRequest(req);
  if (req.method === 'GET') {
    return GetPhotos(req, res);
  }
  return res.status(405).json({ message: 'Method not allowed' });
};

export default withDatabase(Handler);
