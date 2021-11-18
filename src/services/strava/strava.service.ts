import axios, { Axios } from 'axios';
import databaseService from '../database/database.service';
import { AuthTokenResponse } from './responses/AuthTokenResponse';
import { GetActivityResponse } from './responses/GetActivityResponse';

type RefreshTokenDocument = {
  refreshToken: string;
  _id: string;
};

class StravaService {
  private readonly BASE_URL = 'https://www.strava.com/api/v3';
  private readonly AUTH_URL = 'https://www.strava.com/oauth/token';

  private refreshTokenDocument: RefreshTokenDocument | null = null;

  private http!: Axios;

  public async authenticate() {
    await databaseService.connect();
    await this.getRefreshToken();
    const CLIENT_ID = process.env.STRAVA_CLIENT_ID;
    const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;

    const response = (
      await axios.post<AuthTokenResponse>(this.AUTH_URL, null, {
        params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: 'refresh_token',
          refresh_token: this.refreshTokenDocument?.refreshToken,
          scopes: 'activity:read',
        },
      })
    ).data;

    console.log({ response });

    await this.saveLatestRefreshToken(response.refresh_token);
    this.createHttpClient(response.access_token);
  }

  public async getActivityAndInsertIntoDatabase(activityId: string) {
    await this.authenticate();

    const activity = (
      await this.http.get<GetActivityResponse>(`/activities/${activityId}`)
    ).data;
    console.log({ activity });
    const activityCollection =
      databaseService.getCollection('strava_activities');
    await activityCollection.insertOne(activity);
  }

  public async getRefreshToken() {
    console.log('Getting refresh token');
    const refreshTokenCollection = databaseService.getCollection(
      'strava_refreshTokens'
    );
    const document = await refreshTokenCollection.findOne<RefreshTokenDocument>(
      {}
    );
    if (document) {
      this.refreshTokenDocument = document;
      console.log('Got refresh token', { document });
    }
  }

  private async saveLatestRefreshToken(refreshToken: string) {
    console.log('Saving latest refresh token', refreshToken);
    const refreshTokenCollection = databaseService.getCollection(
      'strava_refreshTokens'
    );
    await refreshTokenCollection.replaceOne(
      { _id: this.refreshTokenDocument!._id },
      { _id: this.refreshTokenDocument!._id, refreshToken }
    );
    console.log('Saved latest refresh token');
  }

  private createHttpClient(accessToken: string) {
    this.http = axios.create({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      baseURL: this.BASE_URL,
    });
  }
}
export default new StravaService();
