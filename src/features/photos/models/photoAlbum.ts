import { IsEmpty, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ObjectId } from 'mongodb';
import { PhotoModel } from './photo';

export class PhotoAlbumModel {
  @IsEmpty()
  public _id!: ObjectId | string;

  @IsString()
  @MinLength(2)
  public name!: string;

  @IsEmpty()
  public coverImageId!: string;

  @IsEmpty()
  public coverImage?: PhotoModel | null;

  @IsEmpty()
  public createdAt?: Date;

  @IsEmpty()
  public updatedAt?: Date;
}
