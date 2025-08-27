import path from 'node:path';
import { http } from 'msw';
import { server } from '../../vitest.setup.js';
import { sendWebhook } from './sendWebhook.js';

describe(sendWebhook.name, () => {
  const payload = { content: 'Hello, world!' };
  const hookUrl = 'https://discord.com/api/webhooks/1234567890/TOKEN';

  it('should send a request with the correct payload', async () => {
    let actual: any;
    server.use(
      http.all('*', async ({ request }) => {
        actual = await request.json();
        return new Response(undefined, { status: 204 });
      }),
    );

    await sendWebhook(hookUrl, payload);

    expect(actual).toStrictEqual(payload);
  });

  it('should set the Content-Type header in the request', async () => {
    let actual: any;
    server.use(
      http.all('*', ({ request }) => {
        actual = request.headers.get('Content-Type');
        return new Response(undefined, { status: 204 });
      }),
    );

    await sendWebhook(hookUrl, payload);

    expect(actual).toBe('application/json');
  });

  it('should send the request using the POST method', async () => {
    let actual: any;
    server.use(
      http.all('*', ({ request }) => {
        actual = request.method;
        return new Response(undefined, { status: 204 });
      }),
    );

    await sendWebhook(hookUrl, payload);

    expect(actual).toBe('POST');
  });

  it('should send the request to the given hook url', async () => {
    let actual: any;
    server.use(
      http.all('*', ({ request }) => {
        actual = request.url;
        return new Response(undefined, { status: 204 });
      }),
    );

    await sendWebhook(hookUrl, payload);

    expect(actual).toBe(hookUrl);
  });

  describe('With files', () => {
    const payloadWithFiles = { ...payload, files: [import.meta.filename] };

    it('should send a request with the correct payload', async () => {
      let actual: any;
      server.use(
        http.all('*', async ({ request }) => {
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          actual = JSON.parse((await request.formData()).get('payload_json') as string);
          return new Response(undefined, { status: 204 });
        }),
      );

      await sendWebhook(hookUrl, payloadWithFiles);

      const { files: _, ...expected } = payloadWithFiles;
      expect(actual).toStrictEqual(expected);
    });

    it('should set the Content-Type header in the request', async () => {
      let actual: any;
      server.use(
        http.all('*', ({ request }) => {
          actual = request.headers.get('Content-Type');
          return new Response(undefined, { status: 204 });
        }),
      );

      await sendWebhook(hookUrl, payloadWithFiles);

      expect(actual).toContain('multipart/form-data; boundary=----');
    });

    it('should send the request using the POST method', async () => {
      let actual: any;
      server.use(
        http.all('*', ({ request }) => {
          actual = request.method;
          return new Response(undefined, { status: 204 });
        }),
      );

      await sendWebhook(hookUrl, payloadWithFiles);

      expect(actual).toBe('POST');
    });

    it('should send the request to the given hook url', async () => {
      let actual: any;
      server.use(
        http.all('*', ({ request }) => {
          actual = request.url;
          return new Response(undefined, { status: 204 });
        }),
      );

      await sendWebhook(hookUrl, payloadWithFiles);

      expect(actual).toBe(hookUrl);
    });

    it('should include the given file in the request', async () => {
      let actual: any;
      server.use(
        http.all('*', async ({ request }) => {
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          actual = (await request.formData()).get('file0');
          return new Response(undefined, { status: 204 });
        }),
      );

      await sendWebhook(hookUrl, payloadWithFiles);

      const expected = expect.objectContaining({
        name: path.basename(import.meta.filename),
        type: 'application/octet-stream',
      });
      expect(actual).toStrictEqual(expected);
    });

    it('should include the given files in the request when multiple files are provided', async () => {
      let actual: any;
      server.use(
        http.all('*', async ({ request }) => {
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          const formData = await request.formData();
          actual = [formData.get('file0'), formData.get('file1')];
          return new Response(undefined, { status: 204 });
        }),
      );

      await sendWebhook(hookUrl, { files: [import.meta.filename, import.meta.filename] });

      const expected = [
        expect.objectContaining({
          name: path.basename(import.meta.filename),
          type: 'application/octet-stream',
        }),
        expect.objectContaining({
          name: path.basename(import.meta.filename),
          type: 'application/octet-stream',
        }),
      ];
      expect(actual).toStrictEqual(expected);
    });
  });
});
