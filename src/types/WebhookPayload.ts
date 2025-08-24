/* eslint-disable @typescript-eslint/naming-convention */

import { AllowedMentions } from './AllowedMentions.js';
import { Attachment } from './Attachment.js';
import { Embed } from './Embed.js';
import { MessageComponent } from './MessageComponent.js';
import { PollCreateRequest } from './PollCreateRequest.js';

export type WebhookPayload = ContentWebhookPayload | EmbedWebhookPayload | PollWebhookPayload;

export interface FileWebhookPayload {
  username?: string;
  avatar_url?: string;
}

export interface BaseWebhookPayload {
  username?: string;
  avatar_url?: string;
  tts?: boolean;
  allowed_mentions?: AllowedMentions;
  components?: MessageComponent[];
  attachments?: Attachment[];
  // message flags combined as a bitfield
  flags?: number;
  thread_name?: string;
  applied_tags?: string[];

  poll?: PollCreateRequest;
  embeds?: Embed[];
  content?: string;
}

export interface ContentWebhookPayload extends BaseWebhookPayload {
  content: string;
}

export interface EmbedWebhookPayload extends BaseWebhookPayload {
  embeds: Embed[];
}

export interface PollWebhookPayload extends BaseWebhookPayload {
  poll: PollCreateRequest;
}
