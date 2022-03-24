import { OkResponse } from '@/responses/OkResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import photoService from '../../services/photo.service';

const GetPhotos = async (req: NextApiRequest, res: NextApiResponse) => {
  let { limit = 20, skip = 0, albumId } = req.query;

  limit = parseInt(limit as string, 10);
  skip = parseInt(skip as string, 10);

  const photos = await photoService.getPhotos(albumId as string, limit, skip);

  const count = await photoService.getCount(albumId as string);

  return OkResponse(res, { photos, count });
};

export default GetPhotos;
