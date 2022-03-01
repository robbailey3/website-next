import { OkResponse } from '@/responses/ok-response';
import { NextApiRequest, NextApiResponse } from 'next';
import photoAlbumService from '../../services/photoAlbum.service';

const GetAlbums = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { limit = 20, skip = 0 } = req.query;

  const result = await photoAlbumService.getPhotoAlbums(
    parseInt(limit as string, 10),
    parseInt(skip as string, 10)
  );

  return new OkResponse(result).toResponse(res);
};

export default GetAlbums;
