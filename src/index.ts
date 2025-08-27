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
