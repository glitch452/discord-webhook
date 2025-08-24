import { PathLike } from 'fs';
import { IncomingMessage } from 'http';
import { StatusCodes } from 'http-status-codes';
import { MessageBuilder } from './builders/MessageBuilder.js';
import { webhookResponseBodySchema } from './schemas.js';
import { BaseWebhookPayload, FileWebhookPayload, WebhookPayload } from './types/WebhookPayload.js';
import { sendFile, sendWebhook } from './utils/index.js';

export interface WebhookOptions {
  url: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  throwErrors?: boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  retryOnLimit?: boolean;
  sendFile?: (hookUrl: string, file: PathLike, payload: FileWebhookPayload) => Promise<IncomingMessage>;
  sendWebhook?: (hookUrl: string, payload: WebhookPayload) => Promise<Response>;
}
type RemoveOptional<T> = {
  [K in keyof T]-?: T[K];
};

export class Webhook {
  static readonly infoColor = 4_037_805;
  static readonly successColor = 65_340;
  static readonly warningColor = 16_763_904;
  static readonly errorColor = 16_729_149;

  private options: RemoveOptional<WebhookOptions>;

  private payload: BaseWebhookPayload = {};

  constructor(options: WebhookOptions | string) {
    this.options =
      typeof options === 'string'
        ? {
            url: options,
            throwErrors: true,
            retryOnLimit: true,
            sendFile,
            sendWebhook,
          }
        : {
            url: options.url,
            throwErrors: options.throwErrors ?? true,
            retryOnLimit: options.retryOnLimit ?? true,
            sendFile: options.sendFile ?? sendFile,
            sendWebhook: options.sendWebhook ?? sendWebhook,
          };
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
      const res = await this.options.sendFile(this.options.url, filePath, this.payload);

      if (res.statusCode !== StatusCodes.OK) {
        throw new Error(`Error sending webhook: ${res.statusCode} status code.`);
      }
    } catch (error: unknown) {
      if (this.options.throwErrors) {
        throw error instanceof Error ? error : new Error(String(error));
      }
    }
  }

  async send(payload: MessageBuilder | string): Promise<void> {
    const webhookPayload: WebhookPayload = {
      ...this.payload,
      ...(typeof payload === 'string' ? { content: payload } : payload.getJSON()),
    };

    try {
      const res = await this.options.sendWebhook(this.options.url, webhookPayload);

      if (res.status === Number(StatusCodes.TOO_MANY_REQUESTS) && this.options.retryOnLimit) {
        const body = webhookResponseBodySchema.parse(await res.json());
        const waitUntil = body.retry_after;

        return new Promise((resolve, reject) => {
          setTimeout(async () => {
            try {
              await this.send(payload);
              resolve();
            } catch (error: unknown) {
              reject(error instanceof Error ? error : new Error(String(error)));
            }
          }, waitUntil);
        });
      }
      if (res.status !== Number(StatusCodes.NO_CONTENT)) {
        throw new Error(`Error sending webhook: ${res.status} status code. Response: ${await res.text()}`);
      }
    } catch (error) {
      if (this.options.throwErrors) {
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
