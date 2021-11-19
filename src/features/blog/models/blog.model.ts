import { IsEmpty, IsNotEmpty, IsString, validate } from 'class-validator';

export class BlogModel {
  @IsEmpty()
  public _id!: string;

  @IsString()
  @IsNotEmpty()
  public title!: string;

  public async validate() {
    return validate(this, { validationError: { target: false } });
  }
}
