import { ObjectId } from 'mongodb';

export interface GetActivityResponse {
  _id: ObjectId;
  resource_state: number;
  athlete: Athlete;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  workout_type: number;
  id: number;
  external_id: string;
  upload_id: number;
  start_date: string;
  start_date_local: string;
  timezone: string;
  utc_offset: number;
  start_latlng: number[];
  end_latlng: number[];
  location_city: null;
  location_state: null;
  location_country: string;
  start_latitude: number;
  start_longitude: number;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: Map;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  visibility: string;
  flagged: boolean;
  gear_id: string;
  from_accepted_tag: boolean;
  upload_id_str: string;
  average_speed: number;
  max_speed: number;
  has_heartrate: boolean;
  heartrate_opt_out: boolean;
  display_hide_heartrate_option: boolean;
  elev_high: number;
  elev_low: number;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
  description: string;
  calories: number;
  perceived_exertion: null;
  prefer_perceived_exertion: boolean;
  segment_efforts: TEffort[];
  splits_metric: Splits[];
  splits_standard: Splits[];
  laps: Lap[];
  best_efforts: TEffort[];
  gear: Gear;
  photos: Photos;
  stats_visibility: StatsVisibility[];
  hide_from_home: boolean;
  device_name: string;
  embed_token: string;
  similar_activities: SimilarActivities;
  available_zones: any[];
}

export interface Athlete {
  id: number;
  resource_state: number;
}

export interface TEffort {
  id: number;
  resource_state: number;
  name: string;
  activity: Athlete;
  athlete: Athlete;
  elapsed_time: number;
  moving_time: number;
  start_date: string;
  start_date_local: string;
  distance: number;
  start_index: number;
  end_index: number;
  pr_rank: null;
  achievements: any[];
  device_watts?: boolean;
  segment?: Segment;
  hidden?: boolean;
}

export interface Segment {
  id: number;
  resource_state: number;
  name: string;
  activity_type: string;
  distance: number;
  average_grade: number;
  maximum_grade: number;
  elevation_high: number;
  elevation_low: number;
  start_latlng: number[];
  end_latlng: number[];
  elevation_profile: null;
  start_latitude: number;
  start_longitude: number;
  end_latitude: number;
  end_longitude: number;
  climb_category: number;
  city: string;
  state: string;
  country: string;
  private: boolean;
  hazardous: boolean;
  starred: boolean;
}

export interface Gear {
  id: string;
  primary: boolean;
  name: string;
  nickname: string;
  resource_state: number;
  retired: boolean;
  distance: number;
  converted_distance: number;
}

export interface Lap {
  id: number;
  resource_state: number;
  name: string;
  activity: Athlete;
  athlete: Athlete;
  elapsed_time: number;
  moving_time: number;
  start_date: string;
  start_date_local: string;
  distance: number;
  start_index: number;
  end_index: number;
  total_elevation_gain: number;
  average_speed: number;
  max_speed: number;
  device_watts: boolean;
  lap_index: number;
  split: number;
  pace_zone: number;
}

export interface Map {
  id: string;
  polyline: string;
  resource_state: number;
  summary_polyline: string;
}

export interface Photos {
  primary: null;
  count: number;
}

export interface SimilarActivities {
  effort_count: number;
  average_speed: number;
  min_average_speed: number;
  mid_average_speed: number;
  max_average_speed: number;
  pr_rank: null;
  frequency_milestone: null;
  trend: Trend;
  resource_state: number;
}

export interface Trend {
  speeds: number[];
  current_activity_index: number;
  min_speed: number;
  mid_speed: number;
  max_speed: number;
  direction: number;
}

export interface Splits {
  distance: number;
  elapsed_time: number;
  elevation_difference: number;
  moving_time: number;
  split: number;
  average_speed: number;
  average_grade_adjusted_speed: number;
  pace_zone: number;
}

export interface StatsVisibility {
  type: string;
  visibility: string;
}
