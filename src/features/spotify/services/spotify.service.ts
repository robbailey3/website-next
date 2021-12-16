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

  public async playTrack(trackUri: string[]): Promise<any> {
    return spotifyAuthService.request<any>('PUT', '/me/player/play', null, {
      uris: trackUri,
    });
  }

  public async transferPlayback(
    deviceIds: string[],
    play = true
  ): Promise<any> {
    return spotifyAuthService.request<any>('PUT', '/me/player', null, {
      device_ids: deviceIds,
      play,
    });
  }
}
export default new SpotifyService();
