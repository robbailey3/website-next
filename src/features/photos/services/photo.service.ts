import databaseService from '@/services/database/database.service';
import { ObjectID } from 'bson';
import { DeleteResult, ModifyResult } from 'mongodb';
import { PhotoModel } from '../models/photo';

class PhotoService {
  public async getPhoto(photoId: string): Promise<PhotoModel | null> {
    const photo = await databaseService
      .getCollection<PhotoModel>('photos')
      .findOne({ _id: new ObjectID(photoId) });

    return photo;
  }

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

    return await collection.deleteOne({
      _id: ObjectID.createFromHexString(photoId),
    });
  }

  public async updatePhoto(
    photoId: string,
    caption: string
  ): Promise<ModifyResult<PhotoModel>> {
    const collection = databaseService.getCollection<PhotoModel>('photos');

    return await collection.findOneAndUpdate(
      { _id: ObjectID.createFromHexString(photoId) },
      { $set: { updatedAt: new Date(), caption } }
    );
  }

  public async getCount(albumId: string): Promise<number> {
    const collection = databaseService.getCollection('photos');

    const count = await collection.countDocuments({ albumId });

    return count;
  }
}

export default new PhotoService();
