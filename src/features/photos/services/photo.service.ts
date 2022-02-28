import databaseService from '@/services/database/database.service';
import { DeleteResult } from 'mongodb';
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

  public async createPhoto(photo: Partial<PhotoModel>): Promise<string> {
    const collection =
      databaseService.getCollection<Partial<PhotoModel>>('photos');

    const result = await collection.insertOne({
      ...photo,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return result.insertedId.toHexString();
  }

  public async deletePhoto(photoId: string): Promise<DeleteResult> {
    const collection = databaseService.getCollection('photos');

    return await collection.deleteOne({ _id: photoId });
  }
}

export default new PhotoService();
