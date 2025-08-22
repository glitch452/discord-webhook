import { WebhookPayload } from '../types/webhook-payload.js';

export async function sendWebhook(hookUrl: string, body: WebhookPayload) {
  return fetch(hookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
