import { Embed } from '../types/Embed.js';
import { formatColor } from '../utils/index.js';

export class EmbedBuilder {
  private embed: Embed = { type: 'rich' };

  constructor(embed?: Embed) {
    if (embed) {
      this.embed = embed;
    }
  }

  toJSON(): Embed {
    return this.embed;
  }

  setTitle(title: string): this {
    this.embed.title = title;
    return this;
  }

  setDescription(description: string): this {
    this.embed.description = description;
    return this;
  }

  setUrl(url: string): this {
    this.embed.url = url;
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

  setFooter(text: string, iconUrl?: string, proxyIconUrl?: string): this {
    this.embed.footer = { text, icon_url: iconUrl, proxy_icon_url: proxyIconUrl };
    return this;
  }

  setImage(url: string, proxyUrl?: string, height?: number, width?: number): this {
    this.embed.image = { url, proxy_url: proxyUrl, height, width };
    return this;
  }

  setThumbnail(url: string, proxyUrl?: string, height?: number, width?: number): this {
    this.embed.thumbnail = { url, proxy_url: proxyUrl, height, width };
    return this;
  }

  setVideo(url: string, proxyUrl?: string, height?: number, width?: number): this {
    this.embed.video = { url, proxy_url: proxyUrl, height, width };
    return this;
  }

  setProvider(name?: string, url?: string): this {
    this.embed.provider = { name, url };
    return this;
  }

  setAuthor(name: string, iconUrl?: string, url?: string, proxyIconUrl?: string): this {
    this.embed.author = { name, url, icon_url: iconUrl, proxy_icon_url: proxyIconUrl };
    return this;
  }

  addField(name: string, value: string, isInline?: boolean): this {
    if (!this.embed.fields?.length) {
      this.embed.fields = [];
    }
    this.embed.fields.push({ name, value, inline: isInline });
    return this;
  }
}
