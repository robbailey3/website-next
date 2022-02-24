import databaseService from '@/services/database/database.service';
import { ObjectID } from 'bson';
import { Photo } from '../models/photo';

class PhotoService {
  public async getPhotos(
    albumId: ObjectID,
    limit: number,
    skip: number
  ): Promise<Photo[]> {
    await databaseService.connect();

    const collection = databaseService.getCollection('photos');

    const photos = await collection
      .find<Photo>({ albumId }, { limit, skip, sort: { updatedAt: -1 } })
      .toArray();

    return photos;
  }
}

export default new PhotoService();
