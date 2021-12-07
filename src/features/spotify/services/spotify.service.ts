import axios, { Axios } from 'axios';
import { AuthTokenResponse } from '../interfaces/AuthTokenResponse';
import { CurrentUser } from '../interfaces/CurrentUser';

class SpotifyService {
  public refreshToken: string | null = null;
  public accessToken: string | null = null;
  public expiryTime: number = 0;

  private readonly URL_BASE = 'https://api.spotify.com/v1';
  private httpClient: Axios;

  constructor() {
    this.httpClient = axios.create({
      baseURL: this.URL_BASE,
    });
    this.httpClient.interceptors.response.use(
      (response) => {
        if (response.status === 401) {
          this.refreshAccessToken();
        }
      },
      (error) => {
        if (error.response.status === 401) {
          this.refreshAccessToken();
        }
      }
    );
  }

  public isLoggedIn(): boolean {
    if (!!this.accessToken || this.expiryTime > new Date().getTime()) {
      return true;
    }
    this.getTokensFromLocalStorage();
    if (!!this.accessToken) {
      if (this.expiryTime && this.expiryTime > new Date().getTime()) {
        this.setUpAuthHeaders();
        return true;
      } else {
        this.refreshAccessToken();
      }
      this.setUpAuthHeaders();
      return true;
    }
    return false;
  }

  public saveAuthTokens(
    accessToken: string,
    refreshToken: string | null,
    expires_in: string
  ): void {
    const expiryTime = new Date().getTime() + Number(expires_in) * 1000;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken || this.refreshToken;
    this.expiryTime = expiryTime;
    localStorage.setItem('spotifyAccessToken', accessToken);
    localStorage.setItem(
      'spotifyRefreshToken',
      (refreshToken || this.refreshToken) as string
    );
    localStorage.setItem('spotifyExpiryTime', expiryTime.toString());
    this.setUpAuthHeaders();
    this.setupRefreshTokenInterval();
  }

  private setupRefreshTokenInterval() {
    setInterval(() => {
      if (this.expiryTime < new Date().getTime()) {
        this.refreshAccessToken();
      }
    }, 1000 * 60 * 30);
  }

  private setUpAuthHeaders() {
    this.httpClient.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${this.accessToken}`;
  }

  public getTokensFromLocalStorage() {
    this.accessToken = localStorage.getItem('spotifyAccessToken');
    this.refreshToken = localStorage.getItem('spotifyRefreshToken');
    this.expiryTime = Number(localStorage.getItem('spotifyExpiryTime'));
  }

  public getAccessToken(): string | null {
    if (this.accessToken) {
      return this.accessToken;
    } else {
      this.getTokensFromLocalStorage();
      return this.accessToken;
    }
  }

  private async refreshAccessToken(): Promise<void> {
    console.log(this.refreshToken);
    if (!this.refreshToken) {
      return;
    }

    const response = (
      await axios.get<AuthTokenResponse>(
        `/api/spotify/auth/refresh?refreshToken=${this.refreshToken}`
      )
    ).data;

    this.saveAuthTokens(response.access_token, null, response.expires_in);
  }

  public async getCurrentUser(): Promise<CurrentUser> {
    return (await this.httpClient.get<CurrentUser>('/me')).data;
  }
}

export default new SpotifyService();
