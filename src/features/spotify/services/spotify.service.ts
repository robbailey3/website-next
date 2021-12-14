import spotifyAuthService from './spotify-auth.service';

class SpotifyService {
  public async getCurrentUser(): Promise<any> {
    return spotifyAuthService.request('GET', '/me');
  }
}
export default new SpotifyService();
