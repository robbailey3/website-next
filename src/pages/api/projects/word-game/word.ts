import wordlist from '@/features/word-game/data/wordlist';
import { NextApiRequest, NextApiResponse } from 'next';

const random = () => {
  const date = new Date();
  return wordlist[
    (date.getFullYear() * date.getDate() * (date.getMonth() + 1)) %
      wordlist.length
  ];
};

const Handle = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const word = random();
    res.status(200).json({ word });
  }
};

export default Handle;
