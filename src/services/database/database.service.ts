import { Collection, MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from '@sentry/nextjs';

class DatabaseService {
  private client!: MongoClient;

  public async connect(): Promise<void> {
    const url = `${process.env.DB_PROTOCOL}${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    this.client = await MongoClient.connect(url);
    return;
  }

  public getCollection<T>(collectionName: string): Collection<T> {
    return this.client.db().collection<T>(collectionName);
  }

  public async disconnect(): Promise<void> {
    await this.client.close();
  }
}

const dbInstance = new DatabaseService();

const withDatabase = (
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any> | any
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await dbInstance.connect();
      return await handler(req, res);
    } catch (error) {
      Sentry.captureException(error);
      res.status(500).send(error);
    } finally {
      await dbInstance.disconnect();
    }
  };
};

export { withDatabase };

export default dbInstance;
