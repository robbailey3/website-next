import photoAlbumsController from '@/features/photos/controllers/photo-albums.controller';
import { withDatabase } from '@/services/database/database.service';
import { NextApiRequest, NextApiResponse } from 'next';

const Handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return photoAlbumsController.getPhotoAlbum(req, res);
  }
};

export default withDatabase(Handler);
