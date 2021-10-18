// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { DataResponse } from '../../responses/data-response';
import databaseService from '../../services/database/database.service';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try {
		await databaseService.connect();
		const collection = databaseService.getCollection('users');
		const user = await collection.findOne({ name: 'John' });
		res.status(200).json(new DataResponse<any>(user, 200));
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}
