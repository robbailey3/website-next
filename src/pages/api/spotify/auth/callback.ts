import { AuthTokenResponse } from '@/features/spotify/interfaces/AuthTokenResponse';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = req.query.code;

  if (!code) {
    return res.status(401);
  }

  const body = new URLSearchParams();
  body.set('grant_type', 'authorization_code');
  body.set('code', code as string);
  body.set('redirect_uri', process.env.SPOTIFY_CALLBACK_URI!);

  const response = await axios.post<AuthTokenResponse>(
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
  );

  if (response.status !== 200) {
    return res.status(401);
  }

  const queryParams = new URLSearchParams();
  queryParams.set('access_token', response.data.access_token);
  queryParams.set('refresh_token', response.data.refresh_token);
  queryParams.set('expires_in', response.data.expires_in);

  res.redirect(`/projects/spotify/auth-success?${queryParams.toString()}`);
}
