/* eslint-disable unicorn/prefer-export-from */

import { EmbedBuilder, MessageBuilder } from './builders/index.js';
import { Webhook } from './Webhook.js';

const discordWebhookNode = {
  Webhook,
  MessageBuilder,
  EmbedBuilder,
};

export default discordWebhookNode;

export { Webhook, MessageBuilder, EmbedBuilder };
