import { Get } from '@/features/api/decorators/HttpVerbs';
import { generateHttpHandler } from '@/features/api/utils/generateHttpHandler';
import { OkResponse } from '@/responses/OkResponse';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

class PictureOfTheDayHandler {
  @Get()
  public async getPotd(req: NextApiRequest, res: NextApiResponse) {
    const API_KEY = process.env.NASA_API_KEY;

    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
      params: {
        api_key: API_KEY,
      },
    });

    return OkResponse(res, response.data);
  }
}

export default generateHttpHandler(PictureOfTheDayHandler);
