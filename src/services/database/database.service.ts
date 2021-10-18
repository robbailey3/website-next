import { Collection, MongoClient } from 'mongodb';
import { DatabaseException } from '../../exceptions/database-exception';

class DatabaseService {
	private client!: MongoClient;

	public async connect(): Promise<void> {
		try {
			const url = `${process.env.DB_PROTOCOL}${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
			this.client = await MongoClient.connect(url);
		} catch (e: any) {
			throw new DatabaseException(e.message);
		}
	}

	public getCollection(collectionName: string): Collection {
		return this.client.db().collection(collectionName);
	}
}

export default new DatabaseService();
