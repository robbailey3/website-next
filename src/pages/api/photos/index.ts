import photosController from '@/features/photos/controllers/photos.controller';
import { NextApiRequest, NextApiResponse } from 'next';

const Handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return photosController.getPhotos(req, res);
  }

  return res.status(405).send('Method not allowed');
};

export default Handler;
