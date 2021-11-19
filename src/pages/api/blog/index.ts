import 'reflect-metadata';

import blogController from '@/features/blog/controllers/blog.controller';
import { NextApiRequest, NextApiResponse } from 'next';

const Handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return blogController.getBlogPosts(req, res);
  }
  if (req.method === 'POST') {
    return blogController.createBlogPost(req, res);
  }
  return res.status(405).send(`Method ${req.method} not allowed`);
};

export default Handler;
