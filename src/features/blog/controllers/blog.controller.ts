import { plainToClass } from 'class-transformer';
import { NextApiRequest, NextApiResponse } from 'next';
import { BadRequestException } from '@/exceptions/BadRequestException';
import { OkResponse } from '@/responses/ok-response';
import { BlogModel } from '../models/blog.model';
import blogService from '../services/blog.service';
import handleError from '@/utils/error-response';

export class BlogController {
  public async getBlogPosts(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    const posts = await blogService.getPosts({}).toArray();
    return new OkResponse(posts).toResponse(res);
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
      handleError(error, res);
    }
  }
}

export default new BlogController();
