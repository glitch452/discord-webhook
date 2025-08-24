import path from 'node:path';
import { HttpResponse, http } from 'msw';
import { server } from '../../vitest.setup.js';
import { sendFile } from './sendFile.js';

describe(sendFile.name, () => {
  const filePath = path.join(__dirname, 'sendFile.test.ts');
  const payload = { username: '<username>', avatar_url: '<avatar_url>' };
  const hookUrl = 'https://discord.com/api/webhooks/1234567890/TOKEN';

  it('should send a webhook with the correct username value', async () => {
    let actual: any;
    server.use(
      http.post('*', async ({ request }) => {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        actual = (await request.formData()).get('username');
        return new Response(undefined, { status: 204 });
      }),
    );

    await sendFile(hookUrl, filePath, payload);

    expect(actual).toBe('<username>');
  });

  it('should send a webhook with the correct avatar_url value', async () => {
    let actual: any;
    server.use(
      http.post('*', async ({ request }) => {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        actual = (await request.formData()).get('avatar_url');
        return new Response(undefined, { status: 204 });
      }),
    );

    await sendFile(hookUrl, filePath, payload);

    expect(actual).toBe('<avatar_url>');
  });

  it('should send a webhook with the correct file value', async () => {
    let actual: any;
    server.use(
      http.post('*', async ({ request }) => {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        actual = ((await request.formData()).get('file') as File).name;
        return new Response(undefined, { status: 204 });
      }),
    );

    await sendFile(hookUrl, filePath, payload);

    expect(actual).toBe('sendFile.test.ts');
  });

  it('should set the Content-Type header in the request', async () => {
    let actual: any;
    server.use(
      http.post('*', ({ request }) => {
        actual = request.headers.get('Content-Type');
        return new Response(undefined, { status: 204 });
      }),
    );

    await sendFile(hookUrl, filePath, payload);

    expect(actual).toContain('multipart/form-data');
  });

  it('should send the request using the POST method', async () => {
    let actual: any;
    server.use(
      http.all('*', ({ request }) => {
        actual = request.method;
        return new Response(undefined, { status: 204 });
      }),
    );

    await sendFile(hookUrl, filePath, payload);

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

    await sendFile(hookUrl, filePath, payload);

    expect(actual).toBe(hookUrl);
  });

  it('should reject the promise on an error from the request', async () => {
    server.use(http.all('*', () => HttpResponse.error()));
    await expect(sendFile(hookUrl, filePath, payload)).rejects.toThrow('Network error');
  });
});
