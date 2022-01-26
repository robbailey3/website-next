import axios, { Axios, AxiosError, Method } from 'axios';
import { AuthTokenResponse } from '../interfaces/AuthTokenResponse';

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
    if (!this.accessToken) {
      this.getTokensFromLocalStorage();
    }
    if (!this.accessToken) {
      return null;
    }
    if (this.tokenHasExpired()) {
      await this.refreshAccessToken();
    }
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
    const expires_in = (this.expiryTime - Date.now()) / 1000;

    if (this.tokenHasExpired()) {
      this.refreshAccessToken();
    } else {
      if (this.accessToken && this.refreshToken && this.expiryTime) {
        this.login(this.accessToken, expires_in, this.refreshToken);
      }
    }
  }

  private async refreshAccessToken(): Promise<void> {
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