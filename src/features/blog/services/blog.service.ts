import databaseService from '@/services/database/database.service';
import { Filter, FindOptions } from 'mongodb';
import { BlogModel } from '../models/blog.model';

class BlogService {
  private readonly COLLECTION_NAME = 'blog';

  getPosts(filter: Filter<BlogModel>, options: FindOptions<BlogModel> = {}) {
    const collection = databaseService.getCollection<BlogModel>(
      this.COLLECTION_NAME
    );
    return collection.find<BlogModel>(filter, options);
  }

  public insertPost(post: BlogModel) {}
}

export default new BlogService();
