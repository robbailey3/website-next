import axios, { Axios } from 'axios';
import { ObjectId } from 'mongodb';
import databaseService from '../../../services/database/database.service';
import { AuthTokenResponse } from '../responses/AuthTokenResponse';
import { GetActivityResponse } from '../responses/GetActivityResponse';

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

    await this.saveLatestRefreshToken(response.refresh_token);
    this.createHttpClient(response.access_token);
  }

  public async getActivityAndInsertIntoDatabase(activityId: string) {
    await this.authenticate();

    const activity = (
      await this.http.get<GetActivityResponse>(`/activities/${activityId}`)
    ).data;
    const activityCollection =
      databaseService.getCollection('strava_activities');
    await activityCollection.findOneAndReplace({ id: activity.id }, activity, {
      upsert: true,
    });
  }

  public async getActivities(
    limit: number = 25,
    skip: number = 0
  ): Promise<{ count: number; activities: GetActivityResponse[] }> {
    const collection = databaseService.getCollection('strava_activities');
    const count = await collection.countDocuments();
    const activities = await collection
      .find<GetActivityResponse>({}, { sort: { start_date: -1 }, limit, skip })
      .toArray();

    return { activities, count };
  }

  public async getActivityById(id: string) {
    const collection = databaseService.getCollection('strava_activities');
    const _id = ObjectId.createFromHexString(id);
    return await collection.findOne<GetActivityResponse>({ _id });
  }

  public getTrendData() {
    const collection = databaseService.getCollection('strava_activities');
    return collection
      .find<GetActivityResponse>(
        {},
        {
          projection: {
            average_speed: 1,
            start_date: 1,
            max_speed: 1,
            distance: 1,
            _id: 0,
          },
          sort: { start_date: -1 },
          limit: 100,
        }
      )
      .toArray();
  }

  public async getTotals() {
    const collection = databaseService.getCollection('strava_activities');
    const result = collection.aggregate<any>([
      {
        $group: {
          _id: {
            year: { $year: { $dateFromString: { dateString: '$start_date' } } },
            month: {
              $month: { $dateFromString: { dateString: '$start_date' } },
            },
          },
          totalDistance: { $sum: '$distance' },
          totalElevationGain: { $sum: '$total_elevation_gain' },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          '_id.year': -1,
          '_id.month': -1,
        },
      },
    ]);

    return result.toArray();
  }

  public async getRefreshToken() {
    const refreshTokenCollection = databaseService.getCollection(
      'strava_refreshTokens'
    );
    const document = await refreshTokenCollection.findOne<RefreshTokenDocument>(
      {}
    );
    if (document) {
      this.refreshTokenDocument = document;
    }
  }

  private async saveLatestRefreshToken(refreshToken: string) {
    const refreshTokenCollection = databaseService.getCollection(
      'strava_refreshTokens'
    );
    await refreshTokenCollection.replaceOne(
      { _id: this.refreshTokenDocument!._id },
      { _id: this.refreshTokenDocument!._id, refreshToken }
    );
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
