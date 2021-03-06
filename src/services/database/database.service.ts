import { Collection, MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from '@sentry/nextjs';

class DatabaseService {
  private client!: MongoClient | null;

  public async connect(): Promise<void> {
    const url = `${process.env.DB_PROTOCOL}${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    this.client = await MongoClient.connect(url);
    return;
  }

  public isConnected(): boolean {
    return this.client !== undefined;
  }

  public getCollection<T>(collectionName: string): Collection<T> {
    return this.client!.db().collection<T>(collectionName);
  }

  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
    }
  }
}

const dbInstance = new DatabaseService();

const withDatabase = (
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any> | any
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (!dbInstance.isConnected()) {
        await dbInstance.connect();
      }
      return await handler(req, res);
    } catch (error) {
      Sentry.captureException(error);
      return res.status(500).send(error);
    }
  };
};

export { withDatabase };

export default dbInstance;
