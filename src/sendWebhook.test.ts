import { http } from 'msw';
import { server } from '../vitest.setup.js';
import { sendWebhook } from './sendWebhook.js';

describe(sendWebhook.name, () => {
  const payload = { content: 'Hello, world!' };
  const hookUrl = 'https://discord.com/api/webhooks/1234567890/TOKEN';

  it('should send a webhook with the correct payload', async () => {
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
});
