import { BadRequestException } from '@/exceptions/BadRequestException';
import databaseService from '@/services/database/database.service';
import { ObjectID } from 'bson';
import { PhotoAlbum } from '../models/photoAlbum';

class PhotoAlbumService {
  public async getPhotoAlbums(
    limit: number,
    skip: number
  ): Promise<PhotoAlbum[]> {
    await databaseService.connect();

    const collection = databaseService.getCollection('photo_albums');

    const photoAlbums = await collection
      .find<PhotoAlbum>({}, { limit, skip, sort: { updatedAt: -1 } })
      .toArray();

    return photoAlbums;
  }

  public async getPhotoAlbum(id: string): Promise<PhotoAlbum | null> {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }

    await databaseService.connect();

    const collection = databaseService.getCollection('photoAlbums');

    const photoAlbum = await collection.findOne<PhotoAlbum>({
      _id: ObjectID.createFromHexString(id),
    });

    return photoAlbum;
  }

  public async createPhotoAlbum(photoAlbum: PhotoAlbum): Promise<ObjectID> {
    if (photoAlbum._id) {
      throw new BadRequestException('Id is not allowed');
    }

    const collection = databaseService.getCollection('photo_albums');

    const result = await collection.insertOne({
      ...photoAlbum,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as PhotoAlbum);

    return result.insertedId;
  }

  public async updatePhotoAlbum(
    id: string,
    photoAlbum: PhotoAlbum
  ): Promise<void> {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
    const collection = databaseService.getCollection('photoAlbums');

    const result = await collection.findOneAndUpdate(
      { _id: ObjectID.createFromHexString(id) },
      { $set: { ...photoAlbum, updatedAt: new Date() } }
    );
  }
}

export default new PhotoAlbumService();
