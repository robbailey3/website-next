import { BadRequestException } from '@/exceptions/BadRequestException';
import databaseService from '@/services/database/database.service';
import { ObjectID } from 'bson';
import { PhotoModel } from '../models/photo';
import { PhotoAlbumModel } from '../models/photoAlbum';
import { UpdatePhotoAlbumRequest } from '../requests/UpdatePhotoAlbumRequest';
import photoUploadService from './photoUpload.service';

class PhotoAlbumService {
  public async getPhotoAlbums(
    limit: number,
    skip: number
  ): Promise<PhotoAlbumModel[]> {
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

    const collection = databaseService.getCollection('photo_albums');

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

  public async createPhotoAlbum(
    photoAlbum: PhotoAlbumModel
  ): Promise<PhotoAlbumModel | null> {
    if (photoAlbum._id) {
      throw new BadRequestException('Id is not allowed');
    }

    const collection =
      databaseService.getCollection<PhotoAlbumModel>('photo_albums');

    const result = await collection.insertOne({
      ...photoAlbum,
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    const album = await collection.findOne<PhotoAlbumModel>({
      _id: result.insertedId,
    });

    return album;
  }

  public async updatePhotoAlbum(
    id: string,
    photoAlbum: UpdatePhotoAlbumRequest
  ): Promise<void> {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Invalid id');
    }
    const collection = databaseService.getCollection('photo_albums');

    const result = await collection.findOneAndUpdate(
      { _id: ObjectID.createFromHexString(id) },
      { $set: { ...photoAlbum, updatedAt: new Date() } }
    );
  }

  public async deleteAlbum(albumId: string) {
    const collection = databaseService.getCollection('photo_albums');
    const result = await collection.deleteOne({
      _id: ObjectID.createFromHexString(albumId),
    });

    if (result.deletedCount === 0) {
      throw new BadRequestException('Album not found');
    }

    await photoUploadService.deleteAlbum(albumId);

    return;
  }
}

export default new PhotoAlbumService();
