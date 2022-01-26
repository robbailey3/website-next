export interface RecentlyPlayedResponse {
  items: Item[];
  next: string;
  cursors: Cursors;
  limit: number;
  href: string;
}

export interface Cursors {
  after: string;
  before: string;
}

export interface Item {
  track: Track;
  played_at: string;
  context: Context;
}

export interface Context {
  external_urls: ExternalUrls;
  href: string;
  type: ContextType;
  uri: URI;
}

export interface ExternalUrls {
  spotify: string;
}

export enum ContextType {
  Album = 'album',
  Playlist = 'playlist',
}

export enum URI {
  SpotifyAlbum0JTGHV5XqHPVEcwL8F6YU5 = 'spotify:album:0jTGHV5xqHPvEcwL8f6YU5',
  SpotifyPlaylist37I9DQZF1E39CIX8ZD0DYo = 'spotify:playlist:37i9dQZF1E39cIX8zD0DYo',
  SpotifyPlaylist58A8M5CFJuoTuTidSUucDZ = 'spotify:playlist:58A8M5CFJuoTuTidSUucDZ',
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: TrackType;
  uri: string;
}

export interface Album {
  album_type: AlbumType;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: ContextType;
  uri: string;
}

export enum AlbumType {
  Album = 'album',
  Compilation = 'compilation',
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: ArtistType;
  uri: string;
}

export enum ArtistType {
  Artist = 'artist',
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export enum ReleaseDatePrecision {
  Day = 'day',
  Month = 'month',
  Year = 'year',
}

export interface ExternalIDS {
  isrc: string;
}

export enum TrackType {
  Track = 'track',
}
