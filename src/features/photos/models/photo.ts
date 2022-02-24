export interface Photo {
  _id: string;
  caption: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  albumId: string;
}
