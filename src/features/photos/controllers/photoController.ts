import { NextApiRequest, NextApiResponse } from 'next';
import { PhotoAlbumModel } from '../models/photoAlbum';
import photoAlbumService from '../services/photoAlbum.service';

class PhotoController {
  public async getAlbums(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<PhotoAlbumModel[]> {
    const { limit = 10, skip = 0 } = req.query as any;

    return await photoAlbumService.getPhotoAlbums(limit, skip);
  }
}

export default new PhotoController();
