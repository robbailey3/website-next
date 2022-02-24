import { OkResponse } from '@/responses/ok-response';
import databaseService, {
  withDatabase,
} from '@/services/database/database.service';
import { NextApiRequest, NextApiResponse } from 'next';
import photoAlbumService from '../services/photoAlbum.service';

class PhotoAlbumsController {
  public async getPhotoAlbums(req: NextApiRequest, res: NextApiResponse) {
    const { limit = 20, skip = 0 } = req.query;

    const result = await photoAlbumService.getPhotoAlbums(
      parseInt(limit as string, 10),
      parseInt(skip as string, 10)
    );

    return new OkResponse(result).toResponse(res);
  }

  public async createPhotoAlbum(req: NextApiRequest, res: NextApiResponse) {
    const { name } = req.body;

    if (name === undefined) {
      throw new Error('Name is required');
    }

    const result = await photoAlbumService.createPhotoAlbum({ name });

    // TODO: Create a CreatedResponse class
    return new OkResponse(result).toResponse(res);
  }
}

export default new PhotoAlbumsController();
