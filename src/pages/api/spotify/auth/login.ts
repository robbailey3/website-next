import type { NextApiRequest, NextApiResponse } from 'next';

const scopes = `ugc-image-upload, playlist-modify-private, playlist-read-private, playlist-modify-public, playlist-read-collaborative, user-read-private, user-read-email, user-read-playback-state, user-modify-playback-state, user-read-currently-playing, user-library-modify, user-library-read, user-read-playback-position, user-read-recently-played, user-top-read, app-remote-control, streaming, user-follow-modify, user-follow-read`;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.redirect(
    'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      process.env.SPOTIFY_CLIENT_ID +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' +
      process.env.SPOTIFY_CALLBACK_URI
  );
}
