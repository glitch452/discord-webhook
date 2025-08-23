import { MessageBuilder } from './MessageBuilder.js';

describe(MessageBuilder.name, () => {
  describe(MessageBuilder.prototype.setText.name, () => {
    it('should set the content', () => {
      const message = new MessageBuilder().setText('Hello, world!').getJSON();
      const expected = { content: 'Hello, world!' };
      expect(message).toStrictEqual(expect.objectContaining(expected));
    });
  });

  describe(MessageBuilder.prototype.setAuthor.name, () => {
    it('should set the author fields with the given values', () => {
      const embed = new MessageBuilder().setAuthor('<name>', '<iconUrl>', '<url>').getJSON().embeds[0];
      const expected = { author: { name: '<name>', icon_url: '<iconUrl>', url: '<url>' } };
      expect(embed).toStrictEqual(expect.objectContaining(expected));
    });

    it('should set the author fields as undefined', () => {
      const embed = new MessageBuilder().setAuthor(undefined, undefined, undefined).getJSON().embeds[0];
      const expected = { author: {} };
      expect(embed).toStrictEqual(expect.objectContaining(expected));
    });
  });

  describe(MessageBuilder.prototype.setTitle.name, () => {
    it('should set the title field with the given value', () => {
      const embed = new MessageBuilder().setTitle('<title>').getJSON().embeds[0];
      const expected = { title: '<title>' };
      expect(embed).toStrictEqual(expect.objectContaining(expected));
    });
  });

  describe(MessageBuilder.prototype.setURL.name, () => {
    it('should set the url field with the given value', () => {
      const embed = new MessageBuilder().setURL('<url>').getJSON().embeds[0];
      const expected = { url: '<url>' };
      expect(embed).toStrictEqual(expect.objectContaining(expected));
    });
  });

  describe(MessageBuilder.prototype.setThumbnail.name, () => {
    it('should set the thumbnail field with the given value', () => {
      const embed = new MessageBuilder().setThumbnail('<url>').getJSON().embeds[0];
      const expected = { thumbnail: { url: '<url>' } };
      expect(embed).toStrictEqual(expect.objectContaining(expected));
    });
  });

  describe(MessageBuilder.prototype.setImage.name, () => {
    it('should set the image field with the given value', () => {
      const embed = new MessageBuilder().setImage('<url>').getJSON().embeds[0];
      const expected = { image: { url: '<url>' } };
      expect(embed).toStrictEqual(expect.objectContaining(expected));
    });
  });

  describe(MessageBuilder.prototype.setTimestamp.name, () => {
    it('should set the timestamp field with the given value', () => {
      const date = new Date('2023-01-01T00:00:00Z');
      const embed = new MessageBuilder().setTimestamp(date).getJSON().embeds[0];
      const expected = { timestamp: date };
      expect(embed).toStrictEqual(expect.objectContaining(expected));
    });

    it('should set the timestamp field with the current date when no value is given', () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2025-08-23T12:00:00Z'));
      const embed = new MessageBuilder().setTimestamp().getJSON().embeds[0];
      const expected = { timestamp: new Date('2025-08-23T12:00:00Z') };
      expect(embed).toStrictEqual(expect.objectContaining(expected));
      vi.useRealTimers();
    });
  });

  describe(MessageBuilder.prototype.setColor.name, () => {
    it('should set the color field with the given value', () => {
      const embed = new MessageBuilder().setColor(56_789).getJSON().embeds[0];
      const expected = { color: 56_789 };
      expect(embed).toStrictEqual(expect.objectContaining(expected));
    });

    it('should set the color field with the decimal equivalent of the given hex value', () => {
      const embed = new MessageBuilder().setColor('#0000FF').getJSON().embeds[0];
      const expected = { color: 255 };
      expect(embed).toStrictEqual(expect.objectContaining(expected));
    });

    it('should throw an error when given an invalid hex code', () => {
      expect(() => new MessageBuilder().setColor('#0000GF')).toThrowError('Invalid color format: #0000GF');
    });
  });

  describe(MessageBuilder.prototype.setDescription.name, () => {
    it('should set the description field with the given value', () => {
      const embed = new MessageBuilder().setDescription('<description>').getJSON().embeds[0];
      const expected = { description: '<description>' };
      expect(embed).toStrictEqual(expect.objectContaining(expected));
    });
  });

  describe(MessageBuilder.prototype.addField.name, () => {
    it('should add a field with the given values', () => {
      const embed = new MessageBuilder().addField('<name>', '<value>', true).getJSON().embeds[0];
      const expected = { fields: [{ name: '<name>', value: '<value>', inline: true }] };
      expect(embed).toStrictEqual(expect.objectContaining(expected));
    });
  });

  describe(MessageBuilder.prototype.setFooter.name, () => {
    it('should set the footer with the given values', () => {
      const embed = new MessageBuilder().setFooter('<text>', '<iconUrl>').getJSON().embeds[0];
      const expected = { footer: { text: '<text>', icon_url: '<iconUrl>' } };
      expect(embed).toStrictEqual(expect.objectContaining(expected));
    });
  });
});
