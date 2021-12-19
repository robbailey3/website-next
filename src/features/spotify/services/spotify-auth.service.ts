import axios, { Axios, AxiosError, Method } from 'axios';
import { retry } from 'rxjs';
import { AuthTokenResponse } from '../interfaces/AuthTokenResponse';
import { CurrentUser } from '../interfaces/CurrentUser';

class SpotifyAuthService {
  private refreshToken: string | null = null;
  private accessToken: string | null = null;
  private expiryTime: number = 0;

  private readonly URL_BASE = 'https://api.spotify.com/v1';
  private httpClient: Axios;

  constructor() {
    this.httpClient = axios.create({
      baseURL: this.URL_BASE,
    });
    this.httpClient.interceptors.response.use(
      (res) => res,
      (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
          this.logout();
          window.location.replace('/api/spotify/auth/login');
          return;
        }
        return;
      }
    );
  }

  public async request<T>(
    method: Method,
    url: string,
    params?: any,
    data?: any
  ): Promise<T> {
    if (!this.isLoggedIn()) {
      throw new Error('Not logged in');
    }
    const response = await this.httpClient.request<T>({
      method,
      url,
      params,
      data,
    });
    return response?.data;
  }

  public login(
    accessToken: string,
    expiresIn: number,
    refreshToken?: string
  ): void {
    this.accessToken = accessToken;
    this.expiryTime = Date.now() + expiresIn * 1000;
    this.refreshToken = refreshToken || this.refreshToken;
    this.saveTokensInLocalStorage();
    this.setUpAuthHeaders();
    this.setupRefreshTokenInterval();
  }

  public logout() {
    this.accessToken = null;
    this.refreshToken = null;
    this.expiryTime = 0;
    this.deleteTokensFromLocalStorage();
  }

  public async isLoggedIn(): Promise<boolean> {
    if (this.accessToken && !this.tokenHasExpired()) {
      return true;
    }
    this.getTokensFromLocalStorage();
    if (this.refreshToken && this.tokenHasExpired()) {
      await this.refreshAccessToken();
    }
    if (this.accessToken && !this.tokenHasExpired()) {
      return true;
    }
    return false;
  }

  public async getAccessToken(): Promise<string | null> {
    console.log('Getting access token');
    if (!this.accessToken) {
      console.log('No access token, looking in local storage');
      this.getTokensFromLocalStorage();
    }
    if (!this.accessToken) {
      console.log('Still no access token, giving up');
      return null;
    }
    if (this.tokenHasExpired()) {
      console.log('Access token has expired, refreshing');
      await this.refreshAccessToken();
    }
    console.log('Got access token', this.accessToken);
    return this.accessToken;
  }

  private saveTokensInLocalStorage(): void {
    if (this.accessToken) {
      localStorage.setItem('spotifyAccessToken', this.accessToken);
    }
    if (this.refreshToken) {
      localStorage.setItem('spotifyRefreshToken', this.refreshToken);
    }
    if (this.expiryTime) {
      localStorage.setItem('spotifyExpiryTime', this.expiryTime.toString());
    }
  }

  private deleteTokensFromLocalStorage(): void {
    localStorage.removeItem('spotifyAccessToken');
    localStorage.removeItem('spotifyRefreshToken');
    localStorage.removeItem('spotifyExpiryTime');
  }

  private tokenHasExpired(): boolean {
    if (this.expiryTime < Date.now()) {
      return true;
    }
    return false;
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

  private getTokensFromLocalStorage() {
    this.accessToken = localStorage.getItem('spotifyAccessToken');
    this.refreshToken = localStorage.getItem('spotifyRefreshToken');
    this.expiryTime = Number(localStorage.getItem('spotifyExpiryTime'));
    if (this.tokenHasExpired()) {
      this.refreshAccessToken();
    } else {
      if (this.accessToken && this.refreshToken && this.expiryTime) {
        this.login(this.accessToken, this.expiryTime, this.refreshToken);
      }
    }
  }

  private async refreshAccessToken(): Promise<void> {
    console.log('Refreshing access token', this.refreshToken);
    if (!this.refreshToken) {
      return;
    }

    const response = (
      await axios.get<AuthTokenResponse>(
        `/api/spotify/auth/refresh?refreshToken=${this.refreshToken}`
      )
    ).data;

    this.login(response.access_token, parseInt(response.expires_in, 10));
  }
}

export default new SpotifyAuthService();
