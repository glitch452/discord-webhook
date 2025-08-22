import { EmbedWebhookPayload, WebhookEmbed } from './types/webhook-payload.js';
import { formatColor } from './utils.js';

export class MessageBuilder {
  private content?: string;
  private embed: WebhookEmbed = { type: 'rich' };

  // eslint-disable-next-line @typescript-eslint/naming-convention
  getJSON(): EmbedWebhookPayload {
    const payload: EmbedWebhookPayload = { embeds: [this.embed] };
    if (this.content) {
      payload.content = this.content;
    }
    return payload;
  }

  setText(text: string): this {
    this.content = text;
    return this;
  }

  setAuthor(name?: string, iconUrl?: string, url?: string): this {
    this.embed.author = { name, url, icon_url: iconUrl };
    return this;
  }

  setTitle(title: string): this {
    this.embed.title = title;
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  setURL(url: string): this {
    this.embed.url = url;
    return this;
  }

  setThumbnail(url: string): this {
    this.embed.thumbnail = { url };
    return this;
  }

  setImage(url: string): this {
    this.embed.image = { url };
    return this;
  }

  setTimestamp(date?: Date): this {
    this.embed.timestamp = date ?? new Date();
    return this;
  }

  setColor(color: number | string): this {
    this.embed.color = formatColor(color);
    return this;
  }

  setDescription(description: string): this {
    this.embed.description = description;
    return this;
  }

  addField(name: string, value: string, isInline?: boolean) {
    this.embed.fields = [{ name, value, inline: isInline }];
    return this;
  }

  setFooter(text: string, iconUrl?: string): this {
    this.embed.footer = { text, icon_url: iconUrl };
    return this;
  }
}
