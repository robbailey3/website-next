import { PhotoViewModel } from './photoViewModel';

export interface PhotoAlbumViewModel {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  coverImageId: string;
  coverImage?: PhotoViewModel | null;
}
