import DeleteAlbum from '@/features/photos/controllers/album/DeleteAlbum';
import GetAlbum from '@/features/photos/controllers/album/GetAlbum';
import UpdateAlbum from '@/features/photos/controllers/album/UpdateAlbum';
import { NotFoundResponse } from '@/responses/not-found-response';
import { withDatabase } from '@/services/database/database.service';
import { logHttpRequest } from '@/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';

const Handler = (req: NextApiRequest, res: NextApiResponse) => {
  logHttpRequest(req);
  if (req.method === 'GET') {
    return GetAlbum(req, res);
  }
  if (req.method === 'PATCH') {
    return UpdateAlbum(req, res);
  }
  if (req.method === 'DELETE') {
    return DeleteAlbum(req, res);
  }
  return new NotFoundResponse().toResponse(res);
};

export default withDatabase(Handler);
