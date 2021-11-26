export interface WebhookRequest {
  aspect_type: string;
  event_time: number;
  object_id: number;
  object_type: string;
  owner_id: number;
  subscription_id: number;
  updates: Updates;
}

export interface Updates {
  title: string;
}
