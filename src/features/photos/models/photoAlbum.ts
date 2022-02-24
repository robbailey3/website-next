import { ObjectId } from 'mongodb';
import { PhotoModel } from './photo';

export interface PhotoAlbumModel {
  _id: ObjectId | string;
  name: string;
  coverImageId: string;
  coverImage?: PhotoModel | null;
  createdAt?: Date;
  updatedAt?: Date;
}
