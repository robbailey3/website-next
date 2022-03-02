import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const DeleteAlbum = (req: NextApiRequest, res: NextApiResponse) => {};

export default withApiAuthRequired(DeleteAlbum);
