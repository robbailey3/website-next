import { Get } from '@/features/api/decorators/HttpVerbs';
import { generateHttpHandler } from '@/features/api/utils/generateHttpHandler';
import wordlist from '@/features/word-game/data/wordlist';
import { OkResponse } from '@/responses/OkResponse';
import { NextApiRequest, NextApiResponse } from 'next';

const random = () => {
  const date = new Date();
  return wordlist[
    (date.getFullYear() * date.getDate() * (date.getMonth() + 1)) %
      wordlist.length
  ];
};

class WordGameHandler {
  @Get()
  public getWord(req: NextApiRequest, res: NextApiResponse) {
    const word = random();
    return OkResponse(res, { word });
  }
}

export default generateHttpHandler(WordGameHandler);
