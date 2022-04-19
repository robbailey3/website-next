import databaseService from '@/services/database/database.service';
import { ObjectID } from 'bson';
import { PhotoModel } from '../models/photo';

class PhotoService {
  private readonly COLLECTION_NAME = 'photos';

  public async getCount(): Promise<number> {
    const result = await databaseService
      .getCollection<PhotoModel>(this.COLLECTION_NAME)
      .countDocuments();

    return result;
  }

  public async getPhotos(limit: number, skip: number): Promise<PhotoModel[]> {
    const result = await databaseService
      .getCollection<PhotoModel>(this.COLLECTION_NAME)
      .find({}, { limit, skip, sort: { updatedAt: -1 } });

    return result.toArray();
  }

  public async locationSearch(
    lat: number,
    lng: number,
    radius: number
  ): Promise<PhotoModel[]> {
    const result = await databaseService
      .getCollection<PhotoModel>(this.COLLECTION_NAME)
      .find({
        location: {
          $geoWithin: {
            $centerSphere: [[lng, lat], radius / 6378.1],
          },
        },
      });

    return result.toArray();
  }

  public async getPhoto(id: string): Promise<PhotoModel | null> {
    const objectId = ObjectID.createFromHexString(id);

    const result = await databaseService
      .getCollection<PhotoModel>(this.COLLECTION_NAME)
      .findOne({ _id: objectId });

    return result;
  }

  public async createPhoto(photo: PhotoModel): Promise<ObjectID | string> {
    photo.createdAt = new Date();
    photo.updatedAt = new Date();

    const result = await databaseService
      .getCollection<PhotoModel>(this.COLLECTION_NAME)
      .insertOne(photo);

    return result.insertedId;
  }

  public async updatePhoto(
    id: string,
    photo: PhotoModel
  ): Promise<PhotoModel | null> {
    photo.updatedAt = new Date();

    const result = await databaseService
      .getCollection<PhotoModel>(this.COLLECTION_NAME)
      .findOneAndUpdate({ _id: id }, { $set: photo });

    return result.value;
  }

  public async deletePhoto(id: string): Promise<void> {
    await databaseService
      .getCollection<PhotoModel>(this.COLLECTION_NAME)
      .deleteOne({ _id: ObjectID.createFromHexString(id) });
  }
}

export default new PhotoService();
