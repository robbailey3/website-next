import logger from '@/utils/logger';
import { Bucket, Storage } from '@google-cloud/storage';
import { UUID } from 'bson';
import exifr from 'exifr';

class PhotoUploadService {
  private storage!: Storage;

  private validMimeTypes = ['image/jpeg', 'image/png'];

  private validFileExtensions = ['jpg', 'png', 'jpeg'];

  private MAX_FILE_SIZE = 5000000; // 5MB

  private exifOptions = {
    pick: [
      'ImageWidth',
      'ImageHeight',
      'Make',
      'Model',
      'ExposureTime',
      'FocalLength',
      'FNumber',
      'ISO',
      'LensModel',
      'LensMake',
      'latitude',
      'longitude',
      'DateTimeOriginal',
      'GPSLatitudeRef',
      'GPSLatitude',
      'GPSLongitudeRef',
      'GPSLongitude',
    ],
  };

  constructor() {
    this.storage = new Storage({
      projectId: process.env.GOOGLE_PROJECT_ID,
      credentials: {
        private_key: process.env.GOOGLE_PRIVATE_KEY,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
    });
  }

  public isValidFile(file: any) {
    return (
      this.isValidMimeType(file) &&
      this.isValidFileExtension(file) &&
      this.isValidFileSize(file)
    );
  }

  public async readExif(file: any) {
    return await exifr.parse(file.buffer, this.exifOptions);
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

  private getTempBucket(): Bucket {
    const bucketName = process.env.GOOGLE_BUCKET_NAME;
    if (!bucketName) {
      throw new Error('Bucket name is not defined');
    }
    return this.storage.bucket(bucketName);
  }

  private getBucket(): Bucket {
    const bucketName = process.env.GOOGLE_LIVE_BUCKET_NAME;

    if (!bucketName) {
      throw new Error('Bucket name is not defined');
    }
    return this.storage.bucket(bucketName);
  }

  public generateRandomFilename = (file: any) => {
    const randomString = new UUID().toString();

    return `${randomString}.${this.getFileExtension(file)}`;
  };

  private getFileExtension(file: any) {
    return file.originalname.split('.').pop().toLowerCase();
  }

  public async uploadToStorage(file: any, albumId: string) {
    const bucket = this.getTempBucket();

    const f = bucket.file(`${albumId}/${file.originalName}`);

    await f.save(file.buffer);
  }

  public async deleteFromStorage(albumId: string, fileName: string) {
    const bucket = this.getBucket();

    const f = bucket.file(`${albumId}/${fileName}`);

    const [fileExists] = await f.exists();

    if (fileExists) {
      await f.delete();
    }
  }

  public async deleteAlbum(albumId: string) {
    logger.info(`Deleting album ${albumId}`);
    const bucket = this.getBucket();
    const [files] = await bucket.getFiles({ prefix: `${albumId}/` });
    if (files.length > 0) {
      const deletePromises = files.map((file) =>
        file.delete({ ignoreNotFound: true })
      );
      await Promise.all(deletePromises);
    }
  }
}

export default new PhotoUploadService();
