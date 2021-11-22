import 'reflect-metadata';

import blogController from '@/features/blog/controllers/blog.controller';
import { NextApiRequest, NextApiResponse } from 'next';
import { withDatabase } from '@/services/database/database.service';

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return await blogController.getBlogPosts(req, res);
  }
  if (req.method === 'POST') {
    return await blogController.createBlogPost(req, res);
  }
  return res.status(405).send(`Method ${req.method} not allowed`);
};

export default withDatabase(Handler);
