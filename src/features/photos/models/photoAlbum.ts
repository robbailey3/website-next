import { ObjectId } from 'mongodb';

export interface PhotoAlbum {
  _id?: ObjectId;
  name: string;
  coverImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
