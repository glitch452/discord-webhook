import fs from 'node:fs';
import { basename } from 'node:path';
import { blob } from 'node:stream/consumers';
import { WebhookPayload } from '../types/WebhookPayload.js';

export async function sendWebhook(hookUrl: string, payload: WebhookPayload): Promise<Response> {
  const { files, ...body } = payload;
  const jsonPayload = JSON.stringify(body);

  if (files?.length) {
    const form = new FormData();

    if (Object.keys(body).length) {
      form.append('payload_json', jsonPayload);
    }

    for (const [i, filePath] of files.entries()) {
      // eslint-disable-next-line security/detect-non-literal-fs-filename -- Use at your own risk!
      const file = await blob(fs.createReadStream(filePath));
      form.append(`file${i}`, file, basename(filePath));
    }
    return fetch(hookUrl, { method: 'POST', body: form });
  }

  return fetch(hookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: jsonPayload,
  });
}
