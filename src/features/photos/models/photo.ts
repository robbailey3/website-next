import { ObjectId } from 'mongodb';
import * as vision from '@google-cloud/vision';

export interface PhotoModel {
  _id?: ObjectId | string;
  caption: string;
  url: string;
  thumbnailUrl: string;
  labels?: vision.protos.google.cloud.vision.v1.IEntityAnnotation[] | null;
  object?:
    | vision.protos.google.cloud.vision.v1.ILocalizedObjectAnnotation[]
    | null;
  createdAt?: Date;
  updatedAt?: Date;
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
  lensMake?: string;
}

export interface PhotoLocation {
  type: 'Point';
  coordinates: [number, number];
}
