import { BaseWebhookPayload, WebhookPayload } from './types/webhook-payload.js';
import { MessageBuilder } from './MessageBuilder.js';
import { StatusCodes } from 'http-status-codes';
import { webhookResponseBodySchema } from './schemas.js';
import { sendFile } from './sendFile.js';
import { sendWebhook } from './sendWebhook.js';

export interface WebhookOptions {
  url: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  throwErrors?: boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  retryOnLimit?: boolean;
}

export class Webhook {
  private static readonly infoColor = 4_037_805;
  private static readonly successColor = 65_340;
  private static readonly warningColor = 16_763_904;
  private static readonly errorColor = 16_729_149;

  private hookUrl: string;
  private shouldThrowErrors: boolean;
  private shouldRetryOnLimit: boolean;
  private payload: BaseWebhookPayload = {};

  constructor(options: WebhookOptions | string) {
    if (typeof options === 'string') {
      this.hookUrl = options;
      this.shouldThrowErrors = true;
      this.shouldRetryOnLimit = true;
    } else {
      this.hookUrl = options.url;
      this.shouldThrowErrors = options.throwErrors ?? true;
      this.shouldRetryOnLimit = options.retryOnLimit ?? true;
    }
  }

  setUsername(username: string) {
    this.payload.username = username;
    return this;
  }

  setAvatar(avatarUrl: string) {
    this.payload.avatar_url = avatarUrl;
    return this;
  }

  async sendFile(filePath: string) {
    try {
      const res = await sendFile(this.hookUrl, filePath, this.payload);

      if (res.statusCode !== StatusCodes.OK) {
        throw new Error(`Error sending webhook: ${res.statusCode} status code.`);
      }
    } catch (error: unknown) {
      if (this.shouldThrowErrors) {
        throw error instanceof Error ? error : new Error(String(error));
      }
    }
  }

  async send(payload: MessageBuilder | string) {
    const webhookPayload: WebhookPayload = {
      ...this.payload,
      ...(typeof payload === 'string' ? { content: payload } : payload.getJSON()),
    };

    try {
      const res = await sendWebhook(this.hookUrl, webhookPayload);

      if (res.status === Number(StatusCodes.TOO_MANY_REQUESTS) && this.shouldRetryOnLimit) {
        const body = webhookResponseBodySchema.parse(await res.json());
        const waitUntil = body.retry_after;

        setTimeout(() => this.send(payload), waitUntil);
      } else if (res.status !== Number(StatusCodes.NO_CONTENT)) {
        throw new Error(`Error sending webhook: ${res.status} status code. Response: ${await res.text()}`);
      }
    } catch (error) {
      if (this.shouldThrowErrors) {
        throw error instanceof Error ? error : new Error(String(error));
      }
    }
  }

  async info(title: string, fieldName?: string, fieldValue?: string, isInline?: boolean) {
    const embed = new MessageBuilder().setTitle(title).setTimestamp().setColor(Webhook.infoColor);

    if (fieldName && fieldValue) {
      embed.addField(fieldName, fieldValue, isInline);
    }

    await this.send(embed);
  }

  async success(title: string, fieldName?: string, fieldValue?: string, isInline?: boolean) {
    const embed = new MessageBuilder().setTitle(title).setTimestamp().setColor(Webhook.successColor);

    if (fieldName && fieldValue) {
      embed.addField(fieldName, fieldValue, isInline);
    }

    await this.send(embed);
  }

  async warning(title: string, fieldName?: string, fieldValue?: string, isInline?: boolean) {
    const embed = new MessageBuilder().setTitle(title).setTimestamp().setColor(Webhook.warningColor);

    if (fieldName && fieldValue) {
      embed.addField(fieldName, fieldValue, isInline);
    }

    await this.send(embed);
  }

  async error(title: string, fieldName?: string, fieldValue?: string, isInline?: boolean) {
    const embed = new MessageBuilder().setTitle(title).setTimestamp().setColor(Webhook.errorColor);

    if (fieldName && fieldValue) {
      embed.addField(fieldName, fieldValue, isInline);
    }

    await this.send(embed);
  }
}
