const { Storage } = require('@google-cloud/storage');

class PhotosService {
  private storage = new Storage({
    credentials: {
      private_key: process.env.GOOGLE_PRIVATE_KEY,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
  });

  private bucket = this.storage.bucket(
    process.env.GOOGLE_PHOTO_QUARANTINE_BUCKET
  );

  public async uploadToStorage(file: any) {
    console.log(this.bucket);

    const f = this.bucket.file(file.originalname);

    await f.save(file.buffer);
  }
}

export default new PhotosService();
