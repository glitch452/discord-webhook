import { PollBuilder } from '../index.js';
import { Attachment } from '../types/Attachment.js';
import { Embed } from '../types/Embed.js';
import { ButtonStyle, MessageComponentType } from '../types/enums.js';
import { MessageComponent } from '../types/MessageComponent.js';
import { PollCreateRequest } from '../types/PollCreateRequest.js';
import { EmbedBuilder } from './EmbedBuilder.js';
import { MessageBuilder } from './MessageBuilder.js';

describe(MessageBuilder.name, () => {
  describe('constructor', () => {
    it('should set the given payload', () => {
      const actual = new MessageBuilder({ content: 'Hello, world!' }).toJSON();
      const expected = expect.objectContaining({ content: 'Hello, world!' });
      expect(actual).toStrictEqual(expected);
    });
  });

  describe(MessageBuilder.prototype.setContent.name, () => {
    it('should set the content', () => {
      const actual = new MessageBuilder().setContent('Hello, world!').toJSON();
      const expected = expect.objectContaining({ content: 'Hello, world!' });
      expect(actual).toStrictEqual(expected);
    });
  });

  describe(MessageBuilder.prototype.addEmbed.name, () => {
    it('should add an embed using the EmbedBuilder', () => {
      const embed = new EmbedBuilder().setTitle('<title>').setDescription('<description>');
      const actual = new MessageBuilder().addEmbed(embed).toJSON().embeds;
      const expected = [expect.objectContaining(embed.toJSON())];
      expect(actual).toStrictEqual(expected);
    });

    it('should add an embed using the interface type', () => {
      const embed: Embed = { type: 'rich', title: '<title>', description: '<description>' };
      const actual = new MessageBuilder().addEmbed(embed).toJSON().embeds;
      const expected = [expect.objectContaining(embed)];
      expect(actual).toStrictEqual(expected);
    });

    it('should add multiple embeds', () => {
      const embed1: Embed = { type: 'rich', title: '<title1>', description: '<description1>' };
      const embed2 = new EmbedBuilder().setTitle('<title2>').setDescription('<description2>');
      const actual = new MessageBuilder().addEmbed(embed1).addEmbed(embed2).toJSON().embeds;
      const expected = [expect.objectContaining(embed1), expect.objectContaining(embed2.toJSON())];
      expect(actual).toStrictEqual(expected);
    });
  });

  describe(MessageBuilder.prototype.addFile.name, () => {
    it('should add a file', () => {
      const file = 'a-file.txt';
      const actual = new MessageBuilder().addFile(file).toJSON().files;
      const expected = [file];
      expect(actual).toStrictEqual(expected);
    });

    it('should add multiple files', () => {
      const file1 = 'a-file.txt';
      const file2 = 'another-file.txt';
      const actual = new MessageBuilder().addFile(file1).addFile(file2).toJSON().files;
      const expected = [file1, file2];
      expect(actual).toStrictEqual(expected);
    });
  });

  describe(MessageBuilder.prototype.setPoll.name, () => {
    it('should set the poll using the interface type', () => {
      const poll: PollCreateRequest = {
        question: { text: '<question>' },
        answers: [{ poll_media: { text: '<option1>' } }, { poll_media: { text: '<option2>' } }],
      };
      const actual = new MessageBuilder().setPoll(poll).toJSON().poll;
      const expected = expect.objectContaining(poll);
      expect(actual).toStrictEqual(expected);
    });

    it('should set the poll using the PollBuilder', () => {
      const poll = new PollBuilder({ text: '<question>' })
        .addAnswer({ text: '<option1>' })
        .addAnswer({ text: '<option2>' });
      const actual = new MessageBuilder().setPoll(poll).toJSON().poll;
      const expected = expect.objectContaining(poll.toJSON());
      expect(actual).toStrictEqual(expected);
    });
  });

  describe(MessageBuilder.prototype.setUsername.name, () => {
    it('should set the username', () => {
      const actual = new MessageBuilder().setUsername('<username>').toJSON();
      const expected = expect.objectContaining({ username: '<username>' });
      expect(actual).toStrictEqual(expected);
    });
  });

  describe(MessageBuilder.prototype.setAvatarUrl.name, () => {
    it('should set the avatar URL', () => {
      const actual = new MessageBuilder().setAvatarUrl('<avatar_url>').toJSON();
      const expected = expect.objectContaining({ avatar_url: '<avatar_url>' });
      expect(actual).toStrictEqual(expected);
    });
  });

  describe(MessageBuilder.prototype.setTts.name, () => {
    it('should set the TTS', () => {
      const actual = new MessageBuilder().setTts(true).toJSON();
      const expected = expect.objectContaining({ tts: true });
      expect(actual).toStrictEqual(expected);
    });
  });

  describe(MessageBuilder.prototype.setAllowedMentions.name, () => {
    it('should set the allowed mentions', () => {
      const actual = new MessageBuilder().setAllowedMentions(['everyone'], ['<role>'], ['<user>'], true).toJSON();
      const expected = expect.objectContaining({
        allowed_mentions: { parse: ['everyone'], roles: ['<role>'], users: ['<user>'], replied_user: true },
      });
      expect(actual).toStrictEqual(expected);
    });
  });

  describe(MessageBuilder.prototype.addComponents.name, () => {
    it('should add a single component', () => {
      const component: MessageComponent = {
        type: MessageComponentType.Button,
        style: ButtonStyle.Primary,
        disabled: false,
        custom_id: '<custom_id>',
      };
      const actual = new MessageBuilder().addComponents(component).toJSON();
      const expected = expect.objectContaining({ components: [component] });
      expect(actual).toStrictEqual(expected);
    });

    it('should add multiple components', () => {
      const component1: MessageComponent = {
        type: MessageComponentType.Button,
        style: ButtonStyle.Primary,
        disabled: false,
        custom_id: '<custom_id_1>',
      };
      const component2: MessageComponent = {
        type: MessageComponentType.Button,
        style: ButtonStyle.Secondary,
        disabled: true,
        custom_id: '<custom_id_2>',
      };
      const actual = new MessageBuilder().addComponents([component1, component2]).toJSON();
      const expected = expect.objectContaining({ components: [component1, component2] });
      expect(actual).toStrictEqual(expected);
    });
  });

  describe(MessageBuilder.prototype.addAttachments.name, () => {
    it('should add a single attachment', () => {
      const attachment: Attachment = {
        id: '<attachment_id>',
        filename: '<filename>',
        size: 12_345,
        url: '<url>',
        proxy_url: '<proxy_url>',
      };
      const actual = new MessageBuilder().addAttachments(attachment).toJSON();
      const expected = expect.objectContaining({ attachments: [attachment] });
      expect(actual).toStrictEqual(expected);
    });

    it('should add multiple attachments', () => {
      const attachment1: Attachment = {
        id: '<attachment_id_1>',
        filename: '<filename_1>',
        size: 12_345,
        url: '<url_1>',
        proxy_url: '<proxy_url_1>',
      };
      const attachment2: Attachment = {
        id: '<attachment_id_2>',
        filename: '<filename_2>',
        size: 67_890,
        url: '<url_2>',
        proxy_url: '<proxy_url_2>',
      };

      const actual = new MessageBuilder().addAttachments([attachment1, attachment2]).toJSON();
      const expected = expect.objectContaining({ attachments: [attachment1, attachment2] });
      expect(actual).toStrictEqual(expected);
    });
  });

  describe(MessageBuilder.prototype.setFlags.name, () => {
    it('should set the flags', () => {
      const actual = new MessageBuilder().setFlags(1).toJSON();
      const expected = expect.objectContaining({ flags: 1 });
      expect(actual).toStrictEqual(expected);
    });
  });

  describe(MessageBuilder.prototype.setThreadName.name, () => {
    it('should set the thread name', () => {
      const actual = new MessageBuilder().setThreadName('<thread_name>').toJSON();
      const expected = expect.objectContaining({ thread_name: '<thread_name>' });
      expect(actual).toStrictEqual(expected);
    });
  });

  describe(MessageBuilder.prototype.addAppliedTags.name, () => {
    it('should add a single applied tag', () => {
      const actual = new MessageBuilder().addAppliedTags('<tag>').toJSON();
      const expected = expect.objectContaining({ applied_tags: ['<tag>'] });
      expect(actual).toStrictEqual(expected);
    });

    it('should add multiple applied tags', () => {
      const actual = new MessageBuilder().addAppliedTags(['<tag1>', '<tag2>']).toJSON();
      const expected = expect.objectContaining({ applied_tags: ['<tag1>', '<tag2>'] });
      expect(actual).toStrictEqual(expected);
    });
  });
});
