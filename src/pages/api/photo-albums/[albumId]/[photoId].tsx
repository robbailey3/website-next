import photosController from '@/features/photos/controllers/photos.controller';
import { withDatabase } from '@/services/database/database.service';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const Handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    return photosController.deletePhoto(req, res);
  }
};

export default withApiAuthRequired(withDatabase(Handler));
