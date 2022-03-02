import CreateAlbum from '@/features/photos/controllers/album/CreateAlbum';
import GetAlbums from '@/features/photos/controllers/album/GetAlbums';
import { NotFoundResponse } from '@/responses/not-found-response';
import { withDatabase } from '@/services/database/database.service';
import { logHttpRequest } from '@/utils/logger';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  logHttpRequest(req);
  if (req.method === 'GET') {
    return GetAlbums(req, res);
  }

  if (req.method === 'POST') {
    return withApiAuthRequired(CreateAlbum);
  }

  return new NotFoundResponse().toResponse(res);
};

export default withDatabase(Handler);
