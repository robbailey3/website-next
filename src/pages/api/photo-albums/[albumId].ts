import GetAlbum from '@/features/photos/controllers/album/GetAlbum';
import { withDatabase } from '@/services/database/database.service';
import { NextApiRequest, NextApiResponse } from 'next';

const Handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return GetAlbum(req, res);
  }
};

export default withDatabase(Handler);
