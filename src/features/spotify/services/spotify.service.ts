import { CurrentUser } from '../interfaces/CurrentUser';
import { RecentlyPlayedResponse } from '../interfaces/RecentlyPlayedResponse';
import spotifyAuthService from './spotify-auth.service';

class SpotifyService {
  public async getCurrentUser(): Promise<CurrentUser> {
    return spotifyAuthService.request<CurrentUser>('GET', '/me');
  }

  public async search(
    query: string,
    type: string[] = ['artist', 'album', 'playlist', 'track', 'show', 'episode']
  ): Promise<any> {
    const params = {
      q: query,
      type: type.join(','),
    };
    return spotifyAuthService.request<any>('GET', '/search', params);
  }

  public async getRecentlyPlayed(limit = 10): Promise<RecentlyPlayedResponse> {
    return spotifyAuthService.request<RecentlyPlayedResponse>(
      'GET',
      '/me/player/recently-played',
      { limit }
    );
  }
}
export default new SpotifyService();
