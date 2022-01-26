import { AuthTokenResponse } from '@/features/spotify/interfaces/AuthTokenResponse';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }
  const { refreshToken } = req.query;
  if (!refreshToken || refreshToken === '' || refreshToken === 'undefined') {
    res.status(400).json({ error: 'Missing refresh token' });
  }
  const body = new URLSearchParams();
  body.set('grant_type', 'refresh_token');
  body.set('refresh_token', refreshToken as string);

  const response = (
    await axios.post<AuthTokenResponse>(
      'https://accounts.spotify.com/api/token',
      body.toString(),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ':' +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      }
    )
  ).data;

  return res.status(200).json(response);
}
