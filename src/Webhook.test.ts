import path from 'node:path';
import { http } from 'msw';
import { server } from '../vitest.setup.js';
import { MessageBuilder } from './builders/MessageBuilder.js';
import { WebhookPayload } from './types/WebhookPayload.js';
import { Webhook } from './Webhook.js';

describe(Webhook.name, () => {
  const hookUrl = 'https://discord.com/api/webhooks/1234567890/TOKEN';

  it('should submit the request to the given webhook url when the constructor input is a string', async () => {
    let actual: any;
    server.use(
      http.post('*', ({ request }) => {
        actual = request.url;
        return new Response(undefined, { status: 204 });
      }),
    );

    const webhook = new Webhook(hookUrl);
    await webhook.send('<message>');

    expect(actual).toBe(hookUrl);
  });

  it('should submit the request to the given webhook url when the constructor input is an object', async () => {
    let actual: any;
    server.use(
      http.post('*', ({ request }) => {
        actual = request.url;
        return new Response(undefined, { status: 204 });
      }),
    );

    const webhook = new Webhook({ url: hookUrl });
    await webhook.send('<message>');

    expect(actual).toBe(hookUrl);
  });

  describe(Webhook.prototype.send.name, () => {
    it('should submit the request with the given message in the payload when the input is a string', async () => {
      let actual: any;
      server.use(
        http.post('*', async ({ request }) => {
          actual = await request.json();
          return new Response(undefined, { status: 204 });
        }),
      );

      const webhook = new Webhook(hookUrl);
      await webhook.send('<message>');

      const expected = expect.objectContaining({ content: '<message>' });
      expect(actual).toStrictEqual(expected);
    });

    it('should submit the request with the given message in the payload when the input is a MessageBuilder', async () => {
      let actual: any;
      server.use(
        http.post('*', async ({ request }) => {
          actual = await request.json();
          return new Response(undefined, { status: 204 });
        }),
      );

      const webhook = new Webhook(hookUrl);
      const message = new MessageBuilder().setContent('<message>');
      await webhook.send(message);

      const expected = expect.objectContaining({ content: '<message>' });
      expect(actual).toStrictEqual(expected);
    });

    it('should submit the request with the given message in the payload when the input is an object', async () => {
      let actual: any;
      server.use(
        http.post('*', async ({ request }) => {
          actual = await request.json();
          return new Response(undefined, { status: 204 });
        }),
      );

      const webhook = new Webhook(hookUrl);
      const message: WebhookPayload = { content: '<message>', username: '<username>' };
      await webhook.send(message);

      const expected = expect.objectContaining(message);
      expect(actual).toStrictEqual(expected);
    });

    it('should return the response payload converted from json if the status code is 200', async () => {
      server.use(http.post('*', () => new Response(JSON.stringify({ content: '<message>' }), { status: 200 })));

      const webhook = new Webhook(hookUrl);
      const message = new MessageBuilder().setContent('<message>');

      const actual = await webhook.send(message);
      const expected = { content: '<message>' };
      expect(actual).toStrictEqual(expected);
    });

    it('should throw an error if the payload does not contain content, an embed, a file, or a poll', async () => {
      const message = new MessageBuilder();
      const webhook = new Webhook(hookUrl);
      await expect(webhook.send(message)).rejects.toThrowError('At least one of');
    });

    it('should throw an error if the response is not a 200 or 204 status code', async () => {
      server.use(http.post('*', () => new Response(undefined, { status: 500 })));
      const webhook = new Webhook(hookUrl);
      await expect(webhook.send('<message>')).rejects.toThrowError();
    });

    it('should not throw an error if the response is not a 200 or 204 status code and the throwsErrors input is false', async () => {
      server.use(http.post('*', () => new Response(undefined, { status: 500 })));
      const webhook = new Webhook({ url: hookUrl, throwErrors: false });
      await expect(webhook.send('<message>')).resolves.toBeUndefined();
    });

    it('should retry the request if the response is a 429 status code and the retryOnLimit input is true', async () => {
      const retryTime = 10;
      let attempts = 0;
      server.use(
        http.post('*', () => {
          attempts++;
          if (attempts === 1) {
            return new Response(JSON.stringify({ retry_after: retryTime }), { status: 429 });
          }
          return new Response(undefined, { status: 204 });
        }),
      );

      const webhook = new Webhook({ url: hookUrl, retryOnLimit: true });

      await expect(webhook.send('<message>')).resolves.toBeUndefined();
      // eslint-disable-next-line vitest/max-expects
      expect(attempts).toBe(2);
    });

    it('should retry the request multiple if the responses are a 429 status code and the retryOnLimit input is true then fail on an error status', async () => {
      vi.useFakeTimers();
      const retryTime = 10;
      let attempts = 0;
      server.use(
        http.post('*', () => {
          attempts++;
          if (attempts === 1 || attempts === 2) {
            return new Response(JSON.stringify({ retry_after: retryTime }), { status: 429 });
          }
          return new Response(undefined, { status: 500 });
        }),
      );

      const webhook = new Webhook({ url: hookUrl, retryOnLimit: true });

      // eslint-disable-next-line vitest/valid-expect
      const expectPromise = expect(webhook.send('<message>')).rejects.toThrowError();
      await vi.advanceTimersByTimeAsync(retryTime);
      await vi.advanceTimersByTimeAsync(retryTime);
      await expectPromise;
      // eslint-disable-next-line vitest/max-expects
      expect(attempts).toBe(3);
      vi.useRealTimers();
    });

    it('should retry the request if the response is a 429 status code and the retryOnLimit input is false', async () => {
      const retryTime = 10;
      let attempts = 0;
      server.use(
        http.post('*', () => {
          attempts++;
          if (attempts === 1) {
            return new Response(JSON.stringify({ retry_after: retryTime }), { status: 429 });
          }
          return new Response(undefined, { status: 204 });
        }),
      );

      const webhook = new Webhook({ url: hookUrl, retryOnLimit: false });

      await expect(webhook.send('<message>')).rejects.toThrowError();
      // eslint-disable-next-line vitest/max-expects
      expect(attempts).toBe(1);
    });

    it('should submit the request with the given file in the payload', async () => {
      let actual: any;
      server.use(
        http.post('*', async ({ request }) => {
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          actual = ((await request.formData()).get('file0') as File).name;
          return new Response('{}', { status: 200 });
        }),
      );

      const webhook = new Webhook(hookUrl);
      const message = new MessageBuilder().addFile(import.meta.filename);
      await webhook.send(message);

      expect(actual).toBe(path.basename(import.meta.filename));
    });
  });

  describe.each(['info', 'success', 'warning', 'error'] as const)('%s', (method) => {
    it(`should send a message to the webhook with the ${method} colour`, async () => {
      let actual: any;
      server.use(
        http.all('*', async ({ request }) => {
          actual = await request.json();
          return new Response(undefined, { status: 204 });
        }),
      );

      const webhook = new Webhook(hookUrl);
      await webhook[method]('<title>');

      const expected = expect.objectContaining({
        embeds: [expect.objectContaining({ color: Webhook[`${method}Color`] })],
      });
      expect(actual).toStrictEqual(expected);
    });

    it('should send a message to the webhook with the given title', async () => {
      let actual: any;
      server.use(
        http.all('*', async ({ request }) => {
          actual = await request.json();
          return new Response(undefined, { status: 204 });
        }),
      );

      const webhook = new Webhook(hookUrl);
      await webhook[method]('<title>');

      const expected = expect.objectContaining({
        embeds: [expect.objectContaining({ title: '<title>' })],
      });
      expect(actual).toStrictEqual(expected);
    });

    it('should send a message to the webhook with the given field', async () => {
      let actual: any;
      server.use(
        http.all('*', async ({ request }) => {
          actual = await request.json();
          return new Response(undefined, { status: 204 });
        }),
      );

      const webhook = new Webhook(hookUrl);
      await webhook[method]('<title>', '<fieldName>', '<fieldValue>', true);

      const expected = expect.objectContaining({
        embeds: [
          expect.objectContaining({
            fields: [{ name: '<fieldName>', value: '<fieldValue>', inline: true }],
          }),
        ],
      });
      expect(actual).toStrictEqual(expected);
    });
  });
});
