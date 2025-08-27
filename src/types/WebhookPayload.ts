/* eslint-disable @typescript-eslint/naming-convention */

import { AllowedMentions } from './AllowedMentions.js';
import { Attachment } from './Attachment.js';
import { Embed } from './Embed.js';
import { MessageComponent } from './MessageComponent.js';
import { PollCreateRequest } from './PollCreateRequest.js';

export interface WebhookPayload {
  username?: string;
  avatar_url?: string;
  tts?: boolean;
  allowed_mentions?: AllowedMentions;
  components?: MessageComponent[];
  attachments?: Attachment[];
  /** message flags combined as a bitfield */
  flags?: number;
  thread_name?: string;
  applied_tags?: string[];
  files?: string[];

  poll?: PollCreateRequest;
  embeds?: Embed[];
  content?: string;
}
