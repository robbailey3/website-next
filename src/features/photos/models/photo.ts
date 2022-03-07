import { ObjectId } from 'mongodb';

export interface PhotoModel {
  _id?: ObjectId | string;
  caption: string;
  url: string;
  thumbnailUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
  albumId: string;
  metadata?: PhotoMeta;
  location?: PhotoLocation;
}

export interface PhotoMeta {
  imageWidth?: number;
  imageHeight?: number;
  make?: string;
  model?: string;
  exposureTime?: number;
  fNumber?: number;
  iso?: number;
  dateTimeOriginal?: Date;
  focalLength?: number;
  lensModel?: string;
}

export interface PhotoLocation {
  type: 'Point';
  coordinates: [number, number];
}
