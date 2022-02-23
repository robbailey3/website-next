import photosController from '@/features/photos/controllers/photos.controller';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return await photosController.uploadPhotos(req, res);
  }
};

export default Handler;
