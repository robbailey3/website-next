import { plainToClass } from 'class-transformer';
import { NextApiRequest, NextApiResponse } from 'next';
import { BadRequestException } from 'src/exceptions/BadRequestException';
import { HttpException } from 'src/exceptions/HttpException';
import { DataResponse } from 'src/responses/data-response';
import { BlogModel } from '../models/blog.model';
import blogService from '../services/blog.service';

class BlogController {
  public async getBlogPosts(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    const posts = await blogService.getPosts({}).toArray();
    return new DataResponse(posts, 200).toResponse(res);
  }

  public async createBlogPost(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    try {
      const { body } = req;

      if (!body) {
        throw new BadRequestException('No body provided');
      }

      const blogPost = plainToClass(BlogModel, body);

      const err = await blogPost.validate();
      if (err) {
        throw new BadRequestException(err.join(', '));
      }

      return res.status(200).json(blogPost);
    } catch (error: any) {
      if (error instanceof HttpException) {
        return res.status(error.status).json(error.toJSON());
      }
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new BlogController();
