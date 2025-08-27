/* eslint-disable unicorn/prefer-export-from */

import { EmbedBuilder, MessageBuilder, PollBuilder } from './builders/index.js';
import { Webhook } from './Webhook.js';

const discordWebhookNode = {
  Webhook,
  MessageBuilder,
  PollBuilder,
  EmbedBuilder,
};

export default discordWebhookNode;

export { Webhook, MessageBuilder, PollBuilder, EmbedBuilder };

export * from './types/ActionRow.js';
export * from './types/AllowedMentions.js';
export * from './types/Attachment.js';
export * from './types/BuildTuples.js';
export * from './types/Button.js';
export * from './types/Container.js';
export * from './types/Embed.js';
export * from './types/Emoji.js';
export * from './types/enums.js';
export * from './types/File.js';
export * from './types/MediaGallery.js';
export * from './types/MessageComponent.js';
export * from './types/PollCreateRequest.js';
export * from './types/Section.js';
export * from './types/Select.js';
export * from './types/Separator.js';
export * from './types/TextDisplay.js';
export * from './types/TextInput.js';
export * from './types/Thumbnail.js';
export * from './types/UnfurledMediaItem.js';
export * from './types/WebhookPayload.js';
