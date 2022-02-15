export interface AnalyseResponse {
  entities: Entity[];
  language: string;
}

export interface Entity {
  mentions: Mention[];
  metadata: Metadata;
  name: string;
  type: EntityType;
  salience: number;
  sentiment: null;
}

export interface Mention {
  text: Text;
  type: MentionType;
  sentiment: null;
}

export interface Text {
  content: string;
  beginOffset: number;
}

export enum MentionType {
  Common = 'COMMON',
  Proper = 'PROPER',
  TypeUnknown = 'TYPE_UNKNOWN',
}

export interface Metadata {
  mid?: string;
  wikipedia_url?: string;
  year?: string;
  value?: string;
}

export enum EntityType {
  Date = 'DATE',
  Event = 'EVENT',
  Location = 'LOCATION',
  Number = 'NUMBER',
  Organization = 'ORGANIZATION',
  Other = 'OTHER',
  Person = 'PERSON',
  WorkOfArt = 'WORK_OF_ART',
}
