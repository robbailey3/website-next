import databaseService from '@/services/database/database.service';
import { PhotoModel } from '../models/photo';

class PhotoService {
  public async getPhotos(
    albumId: string,
    limit: number,
    skip: number
  ): Promise<PhotoModel[]> {
    const collection = databaseService.getCollection('photos');

    const photos = await collection
      .find<PhotoModel>({ albumId }, { limit, skip, sort: { updatedAt: -1 } })
      .toArray();

    return photos;
  }
}

export default new PhotoService();
