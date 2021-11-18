import { Collection, MongoClient } from 'mongodb';

class DatabaseService {
  private client!: MongoClient;

  public async connect(): Promise<void> {
    const url = `${process.env.DB_PROTOCOL}${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    this.client = await MongoClient.connect(url);
    console.log('Connected to database');
  }

  public getCollection(collectionName: string): Collection {
    return this.client.db().collection(collectionName);
  }
}

export default new DatabaseService();
