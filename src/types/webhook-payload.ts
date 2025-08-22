/* eslint-disable @typescript-eslint/naming-convention */

export interface FilePayload {
  username?: string;
  avatar_url?: string;
}

export interface BaseWebhookPayload {
  username?: string;
  avatar_url?: string;
  embeds?: WebhookEmbed[];
  content?: string;
}

export interface ContentWebhookPayload extends BaseWebhookPayload {
  content: string;
}

export interface EmbedWebhookPayload extends BaseWebhookPayload {
  embeds: WebhookEmbed[];
}

export type WebhookPayload = ContentWebhookPayload | EmbedWebhookPayload;

export interface WebhookField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface WebhookEmbed {
  type: 'rich';
  author?: {
    name?: string;
    url?: string;
    icon_url?: string;
  };
  title?: string;
  url?: string;
  thumbnail?: {
    url?: string;
  };
  image?: {
    url?: string;
  };
  timestamp?: Date;
  color?: number;
  description?: string;
  fields?: WebhookField[];
  footer?: {
    text: string;
    icon_url?: string;
  };
}
