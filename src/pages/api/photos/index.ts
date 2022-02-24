import photosController from '@/features/photos/controllers/photos.controller';
import { NextApiRequest, NextApiResponse } from 'next';

const Handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return photosController.getPhotos(req, res);
  }
};

export default Handler;
