import { Bucket, Storage } from '@google-cloud/storage';

class PhotoUploadService {
  private storage = new Storage({
    credentials: {
      private_key: process.env.GOOGLE_PRIVATE_KEY,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
  });

  private validMimeTypes = ['image/jpeg', 'image/png'];

  private validFileExtensions = ['jpg', 'png', 'jpeg'];

  private MAX_FILE_SIZE = 30 * 1024 * 1024; // 30MB

  public isValidFile(file: any) {
    return (
      this.isValidMimeType(file) &&
      this.isValidFileExtension(file) &&
      this.isValidFileSize(file)
    );
  }

  private isValidMimeType(file: any): boolean {
    return this.validMimeTypes.includes(file.mimetype);
  }

  private isValidFileExtension(file: any): boolean {
    const extension = file.originalname.split('.').pop().toLowerCase();

    return this.validFileExtensions.includes(extension);
  }

  private isValidFileSize(file: any): boolean {
    return file.size <= this.MAX_FILE_SIZE;
  }

  private getBucket(): Bucket {
    const bucketName = process.env.GOOGLE_BUCKET_NAME;
    if (!bucketName) {
      throw new Error('Bucket name is not defined');
    }
    return this.storage.bucket(bucketName);
  }

  private generateRandomFilename = (file: any) => {
    const randomString = Math.random().toString(36).substring(2, 15);

    return `${randomString}.${this.getFileExtension(file)}`;
  };

  private getFileExtension(file: any) {
    return file.originalname.split('.').pop().toLowerCase();
  }

  public async uploadToStorage(file: any) {
    const bucket = this.getBucket();

    const f = bucket.file(this.generateRandomFilename(file));

    await f.save(file.buffer);
  }
}

export default new PhotoUploadService();
