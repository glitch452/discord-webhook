import fs from 'node:fs';
import { basename } from 'node:path';
import { WebhookPayload } from '../types/WebhookPayload.js';

export async function sendWebhook(hookUrl: string, payload: WebhookPayload): Promise<Response> {
  const { files, ...body } = payload;
  const jsonPayload = JSON.stringify(body);

  if (files?.length) {
    const form = new FormData();

    if (Object.keys(body).length) {
      form.append('payload_json', jsonPayload);
    }

    files.forEach((filePath, i) => {
      form.append(`file${i}`, {
        [Symbol.toStringTag]: 'File',
        name: basename(filePath),
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        stream: () => fs.createReadStream(filePath),
      });
    });

    return fetch(hookUrl, { method: 'POST', body: form });
  }

  return fetch(hookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: jsonPayload,
  });
}
