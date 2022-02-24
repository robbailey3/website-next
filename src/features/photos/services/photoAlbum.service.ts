import { BadRequestException } from '@/exceptions/BadRequestException';
import databaseService from '@/services/database/database.service';
import { ObjectID } from 'bson';
import { PhotoModel } from '../models/photo';
import { PhotoAlbumModel } from '../models/photoAlbum';

class PhotoAlbumService {
  public async getPhotoAlbums(
    limit: number,
    skip: number
  ): Promise<PhotoAlbumModel[]> {
    await databaseService.connect();

    const collection = databaseService.getCollection('photo_albums');

    const photoAlbums = await collection
      .find<PhotoAlbumModel>({}, { limit, skip, sort: { updatedAt: -1 } })
      .toArray();
    let albumPromises = [];
    albumPromises.push(
      ...photoAlbums
        .filter((photoAlbum) => photoAlbum.coverImageId)
        .map(async (photoAlbum) => {
          const photoCollection = databaseService.getCollection('photos');
          const photo = await photoCollection.findOne<PhotoModel>({
            _id: ObjectID.createFromHexString(photoAlbum.coverImageId),
          });
          photoAlbum.coverImage = photo;
        })
    );

    await Promise.all(albumPromises);

    return photoAlbums;
  }

  public async getPhotoAlbum(id: string): Promise<PhotoAlbumModel | null> {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }

    await databaseService.connect();

    const collection = databaseService.getCollection('photoAlbums');

    const photoAlbum = await collection.findOne<PhotoAlbumModel>({
      _id: ObjectID.createFromHexString(id),
    });

    if (photoAlbum?.coverImageId) {
      const photoCollection = databaseService.getCollection('photos');

      const photo = await photoCollection.findOne<PhotoModel>({
        _id: ObjectID.createFromHexString(photoAlbum.coverImageId),
      });

      photoAlbum.coverImage = photo;
    }

    return photoAlbum;
  }

  public async createPhotoAlbum(photoAlbum: PhotoAlbumModel): Promise<any> {
    if (photoAlbum._id) {
      throw new BadRequestException('Id is not allowed');
    }

    const collection =
      databaseService.getCollection<PhotoAlbumModel>('photo_albums');

    const result = await collection.insertOne({
      name: photoAlbum.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);

    return result.insertedId;
  }

  public async updatePhotoAlbum(
    id: string,
    photoAlbum: PhotoAlbumModel
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
