import { MessageBuilder } from './classes/MessageBuilder.js';
import { Webhook } from './classes/Webhook.js';

const discordWebhookNode = {
  Webhook,
  MessageBuilder,
};

export default discordWebhookNode;

// eslint-disable-next-line unicorn/prefer-export-from
export { Webhook, MessageBuilder };
