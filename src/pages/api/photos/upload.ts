import photosController from '@/features/photos/controllers/photos.controller';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
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
  return res.status(405).json({ message: 'Method not allowed' });
};

export default withApiAuthRequired(Handler);
