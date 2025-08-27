import { EmbedBuilder } from './EmbedBuilder.js';

describe(EmbedBuilder.name, () => {
  describe('constructor', () => {
    it('should set the given payload', () => {
      const actual = new EmbedBuilder({ type: 'rich', title: 'Hello, world!' }).toJSON();
      const expected = expect.objectContaining({ type: 'rich', title: 'Hello, world!' });
      expect(actual).toStrictEqual(expected);
    });
  });

  describe(EmbedBuilder.prototype.setTitle.name, () => {
    it('should set the title', () => {
      const actual = new EmbedBuilder().setTitle('Hello, world!').toJSON();
      const expected = expect.objectContaining({ title: 'Hello, world!' });
      expect(actual).toStrictEqual(expected);
    });
  });

  describe(EmbedBuilder.prototype.setDescription.name, () => {
    it('should set the description', () => {
      const actual = new EmbedBuilder().setDescription('Hello, world!').toJSON();
      const expected = expect.objectContaining({ description: 'Hello, world!' });
      expect(actual).toStrictEqual(expected);
    });
  });

  describe(EmbedBuilder.prototype.setUrl.name, () => {
    it('should set the url', () => {
      const actual = new EmbedBuilder().setUrl('Hello, world!').toJSON();
      const expected = expect.objectContaining({ url: 'Hello, world!' });
      expect(actual).toStrictEqual(expected);
    });
  });

  describe(EmbedBuilder.prototype.setTimestamp.name, () => {
    it('should set the timestamp field with the given value', () => {
      const date = new Date('2023-01-01T00:00:00Z');
      const embed = new EmbedBuilder().setTimestamp(date).toJSON().timestamp;
      expect(embed).toStrictEqual(date);
    });

    it('should set the timestamp field with the current date when no value is given', () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2025-08-23T12:00:00Z'));
      const embed = new EmbedBuilder().setTimestamp().toJSON().timestamp;
      expect(embed).toStrictEqual(new Date('2025-08-23T12:00:00Z'));
      vi.useRealTimers();
    });
  });

  describe(EmbedBuilder.prototype.setColor.name, () => {
    it('should set the color field with the given value', () => {
      const embed = new EmbedBuilder().setColor(56_789).toJSON().color;
      expect(embed).toBe(56_789);
    });

    it('should set the color field with the decimal equivalent of the given hex value', () => {
      const embed = new EmbedBuilder().setColor('#0000FF').toJSON().color;
      expect(embed).toBe(255);
    });

    it('should throw an error when given an invalid hex code', () => {
      expect(() => new EmbedBuilder().setColor('#0000GF')).toThrowError('Invalid color format: #0000GF');
    });
  });

  describe(EmbedBuilder.prototype.setFooter.name, () => {
    it('should set the footer with the given values', () => {
      const embed = new EmbedBuilder().setFooter('<text>', '<iconUrl>').toJSON().footer;
      const expected = expect.objectContaining({ text: '<text>', icon_url: '<iconUrl>' });
      expect(embed).toStrictEqual(expected);
    });
  });

  describe(EmbedBuilder.prototype.setImage.name, () => {
    it('should set the image with the given values', () => {
      const embed = new EmbedBuilder().setImage('<url>', '<proxyUrl>', 100, 200).toJSON().image;
      const expected = expect.objectContaining({ url: '<url>', proxy_url: '<proxyUrl>', height: 100, width: 200 });
      expect(embed).toStrictEqual(expected);
    });
  });

  describe(EmbedBuilder.prototype.setThumbnail.name, () => {
    it('should set the thumbnail with the given values', () => {
      const embed = new EmbedBuilder().setThumbnail('<url>', '<proxyUrl>', 100, 200).toJSON().thumbnail;
      const expected = expect.objectContaining({ url: '<url>', proxy_url: '<proxyUrl>', height: 100, width: 200 });
      expect(embed).toStrictEqual(expected);
    });
  });

  describe(EmbedBuilder.prototype.setVideo.name, () => {
    it('should set the video with the given values', () => {
      const embed = new EmbedBuilder().setVideo('<url>', '<proxyUrl>', 100, 200).toJSON().video;
      const expected = expect.objectContaining({ url: '<url>', proxy_url: '<proxyUrl>', height: 100, width: 200 });
      expect(embed).toStrictEqual(expected);
    });
  });

  describe(EmbedBuilder.prototype.setProvider.name, () => {
    it('should set the provider with the given values', () => {
      const embed = new EmbedBuilder().setProvider('<name>', '<url>').toJSON().provider;
      const expected = expect.objectContaining({ name: '<name>', url: '<url>' });
      expect(embed).toStrictEqual(expected);
    });
  });

  describe(EmbedBuilder.prototype.setAuthor.name, () => {
    it('should set the author with the given values', () => {
      const embed = new EmbedBuilder().setAuthor('<name>', '<iconUrl>', '<url>', '<proxyIconUrl>').toJSON().author;
      const expected = expect.objectContaining({
        name: '<name>',
        icon_url: '<iconUrl>',
        url: '<url>',
        proxy_icon_url: '<proxyIconUrl>',
      });
      expect(embed).toStrictEqual(expected);
    });
  });

  describe(EmbedBuilder.prototype.addField.name, () => {
    it('should add a field with the given values', () => {
      const embed = new EmbedBuilder().addField('<name>', '<value>', true).toJSON().fields;
      const expected = [expect.objectContaining({ name: '<name>', value: '<value>', inline: true })];
      expect(embed).toStrictEqual(expected);
    });
  });
});
