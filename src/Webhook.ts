import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import { EmbedBuilder } from './builders/EmbedBuilder.js';
import { MessageBuilder } from './builders/MessageBuilder.js';
import { webhookResponseBodySchema } from './schemas.js';
import { WebhookPayload } from './types/WebhookPayload.js';
import { sendWebhook } from './utils/index.js';

export interface WebhookOptions {
  url: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  throwErrors?: boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  retryOnLimit?: boolean;
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

  constructor(options: WebhookOptions | string) {
    this.options =
      typeof options === 'string'
        ? {
            url: options,
            throwErrors: true,
            retryOnLimit: true,
            sendWebhook,
          }
        : {
            url: options.url,
            throwErrors: options.throwErrors ?? true,
            retryOnLimit: options.retryOnLimit ?? true,
            sendWebhook: options.sendWebhook ?? sendWebhook,
          };
  }

  async send(payloadOrContent: MessageBuilder | WebhookPayload | string): Promise<Record<string, unknown> | undefined> {
    const payload =
      typeof payloadOrContent === 'string'
        ? { content: payloadOrContent }
        : payloadOrContent instanceof MessageBuilder
          ? payloadOrContent.toJSON()
          : payloadOrContent;

    if (!payload.content && !payload.embeds?.length && !payload.poll && !payload.files?.length) {
      throw new Error('At least one of Content, Embeds, Files, or Poll must be provided.');
    }

    try {
      const res = await this.options.sendWebhook(this.options.url, payload);

      if (res.status === Number(StatusCodes.TOO_MANY_REQUESTS) && this.options.retryOnLimit) {
        const body = webhookResponseBodySchema.parse(await res.json());
        const waitUntil = body.retry_after;

        return new Promise((resolve, reject) => {
          setTimeout(async () => {
            try {
              const response = await this.send(payloadOrContent);
              resolve(response);
            } catch (error: unknown) {
              reject(error instanceof Error ? error : new Error(String(error)));
            }
          }, waitUntil);
        });
      }

      if (res.status === Number(StatusCodes.OK)) {
        return z.record(z.string(), z.unknown()).parse(await res.json());
      }

      if (res.status === Number(StatusCodes.NO_CONTENT)) {
        return;
      }

      let message = `Error sending webhook: ${res.status} status code.`;
      const responseText = await res.text();
      if (responseText) {
        message += ` Response: ${responseText}`;
      }
      throw new Error(message);
    } catch (error: unknown) {
      if (this.options.throwErrors) {
        throw error instanceof Error ? error : new Error(String(error));
      } else {
        console.error(error instanceof Error ? error.message : String(error));
      }
    }
  }

  async info(
    title: string,
    fieldName?: string,
    fieldValue?: string,
    isInline?: boolean,
  ): Promise<Record<string, unknown> | undefined> {
    const embed = new EmbedBuilder().setTitle(title).setTimestamp().setColor(Webhook.infoColor);

    if (fieldName && fieldValue) {
      embed.addField(fieldName, fieldValue, isInline);
    }

    const message = new MessageBuilder().addEmbed(embed);
    return this.send(message);
  }

  async success(
    title: string,
    fieldName?: string,
    fieldValue?: string,
    isInline?: boolean,
  ): Promise<Record<string, unknown> | undefined> {
    const embed = new EmbedBuilder().setTitle(title).setTimestamp().setColor(Webhook.successColor);

    if (fieldName && fieldValue) {
      embed.addField(fieldName, fieldValue, isInline);
    }

    const message = new MessageBuilder().addEmbed(embed);
    return this.send(message);
  }

  async warning(
    title: string,
    fieldName?: string,
    fieldValue?: string,
    isInline?: boolean,
  ): Promise<Record<string, unknown> | undefined> {
    const embed = new EmbedBuilder().setTitle(title).setTimestamp().setColor(Webhook.warningColor);

    if (fieldName && fieldValue) {
      embed.addField(fieldName, fieldValue, isInline);
    }

    const message = new MessageBuilder().addEmbed(embed);
    return this.send(message);
  }

  async error(
    title: string,
    fieldName?: string,
    fieldValue?: string,
    isInline?: boolean,
  ): Promise<Record<string, unknown> | undefined> {
    const embed = new EmbedBuilder().setTitle(title).setTimestamp().setColor(Webhook.errorColor);

    if (fieldName && fieldValue) {
      embed.addField(fieldName, fieldValue, isInline);
    }

    const message = new MessageBuilder().addEmbed(embed);
    return this.send(message);
  }
}
