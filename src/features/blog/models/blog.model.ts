import { IsEmpty, IsNotEmpty, IsString, validate } from 'class-validator';
import { ObjectId, Document } from 'mongodb';

export class BlogModel implements Document {
  @IsEmpty()
  public _id!: ObjectId;

  @IsString()
  @IsNotEmpty()
  public title!: string;

  public async validate() {
    return validate(this, { validationError: { target: false } });
  }
}
