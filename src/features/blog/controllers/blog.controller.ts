import { plainToClass } from 'class-transformer';
import { NextApiRequest, NextApiResponse } from 'next';
import { BlogModel } from '../models/blog.model';

class BlogController {
  public getBlogPosts(req: NextApiRequest, res: NextApiResponse): void {
    return res.status(500).send('Something went wrong');
  }

  public async createBlogPost(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    try {
      const { body } = req;

      const blogPost = plainToClass(BlogModel, body);

      const err = await blogPost.validate();
      if (err) {
        return res.status(400).json(err);
      }

      return res.status(200).json(blogPost);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new BlogController();
