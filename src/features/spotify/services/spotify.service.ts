import { CurrentUser } from '../interfaces/CurrentUser';
import { DeviceResponse } from '../interfaces/Device';
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

  public async getDevices() {
    return spotifyAuthService.request<DeviceResponse>(
      'GET',
      '/me/player/devices'
    );
  }

  public async getArtist(artistId: string): Promise<any> {
    return spotifyAuthService.request<any>('GET', `/artists/${artistId}`);
  }

  public async getPlaylists(limit = 10, offset = 10): Promise<any> {
    return spotifyAuthService.request<any>('GET', '/me/playlists', {
      limit,
      offset,
    });
  }
}
export default new SpotifyService();
