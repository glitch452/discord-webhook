import { Attachment } from '../types/Attachment.js';
import { Embed } from '../types/Embed.js';
import { AllowedMentionType } from '../types/enums.js';
import { MessageComponent } from '../types/MessageComponent.js';
import { PollCreateRequest } from '../types/PollCreateRequest.js';
import { WebhookPayload } from '../types/WebhookPayload.js';
import { EmbedBuilder } from './EmbedBuilder.js';
import { PollBuilder } from './PollBuilder.js';

export class MessageBuilder {
  private payload: WebhookPayload;

  constructor(payloadOrContent?: WebhookPayload | string) {
    this.payload = typeof payloadOrContent === 'string' ? { content: payloadOrContent } : (payloadOrContent ?? {});
  }

  toJSON(): WebhookPayload {
    return this.payload;
  }

  setContent(content: string): this {
    this.payload.content = content;
    return this;
  }

  addEmbed(embed: Embed | EmbedBuilder): this {
    if (!this.payload.embeds?.length) {
      this.payload.embeds = [];
    }
    this.payload.embeds.push(embed instanceof EmbedBuilder ? embed.toJSON() : embed);
    return this;
  }

  addFile(filePath: string): this {
    if (!this.payload.files?.length) {
      this.payload.files = [];
    }
    this.payload.files.push(filePath);
    return this;
  }

  setPoll(poll: PollCreateRequest | PollBuilder): this {
    this.payload.poll = poll instanceof PollBuilder ? poll.toJSON() : poll;
    return this;
  }

  setUsername(username: string): this {
    this.payload.username = username;
    return this;
  }

  setAvatarUrl(avatarUrl: string): this {
    this.payload.avatar_url = avatarUrl;
    return this;
  }

  setTts(isTts: boolean): this {
    this.payload.tts = isTts;
    return this;
  }

  setAllowedMentions(parse?: AllowedMentionType[], roles?: string[], users?: string[], repliedUser?: boolean): this {
    this.payload.allowed_mentions = { parse, roles, users, replied_user: repliedUser };
    return this;
  }

  addComponents(component: MessageComponent | MessageComponent[]): this {
    if (!this.payload.components?.length) {
      this.payload.components = [];
    }
    this.payload.components.push(...(Array.isArray(component) ? component : [component]));
    return this;
  }

  addAttachments(attachments: Attachment | Attachment[]): this {
    if (!this.payload.attachments?.length) {
      this.payload.attachments = [];
    }
    this.payload.attachments.push(...(Array.isArray(attachments) ? attachments : [attachments]));
    return this;
  }

  setFlags(flags: number): this {
    this.payload.flags = flags;
    return this;
  }

  setThreadName(threadName: string): this {
    this.payload.thread_name = threadName;
    return this;
  }

  addAppliedTags(tags: string | string[]): this {
    if (!this.payload.applied_tags?.length) {
      this.payload.applied_tags = [];
    }
    this.payload.applied_tags.push(...(Array.isArray(tags) ? tags : [tags]));
    return this;
  }
}
