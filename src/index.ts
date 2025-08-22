import { MessageBuilder } from './MessageBuilder.js';
import { Webhook } from './Webhook.js';

const discordWebhookNode = {
  Webhook,
  MessageBuilder,
};

export default discordWebhookNode;

// eslint-disable-next-line unicorn/prefer-export-from
export { Webhook, MessageBuilder };
