import photoAlbumsController from '@/features/photos/controllers/photo-albums.controller';
import { withDatabase } from '@/services/database/database.service';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return await photoAlbumsController.getPhotoAlbums(req, res);
  }

  if (req.method === 'POST') {
    return withApiAuthRequired(
      await photoAlbumsController.createPhotoAlbum(req, res)
    );
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default withDatabase(Handler);
