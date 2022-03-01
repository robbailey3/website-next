import DeletePhoto from '@/features/photos/controllers/photo/DeletePhoto';
import UpdatePhoto from '@/features/photos/controllers/photo/UpdatePhoto';
import { NotFoundResponse } from '@/responses/not-found-response';
import { withDatabase } from '@/services/database/database.service';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const Handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    return UpdatePhoto(req, res);
  }
  if (req.method === 'DELETE') {
    return DeletePhoto(req, res);
  }
  return new NotFoundResponse().toResponse(res);
};

export default withApiAuthRequired(withDatabase(Handler));
