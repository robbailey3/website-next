import photosController from '@/features/photos/controllers/photos.controller';
import { withDatabase } from '@/services/database/database.service';
import { NextApiRequest, NextApiResponse } from 'next';

const Handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return photosController.getPhotos(req, res);
  }
  return res.status(405).json({ message: 'Method not allowed' });
};

export default withDatabase(Handler);
