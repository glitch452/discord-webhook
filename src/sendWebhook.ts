import { WebhookPayload } from './types/webhook-payload.js';

export async function sendWebhook(hookUrl: string, body: WebhookPayload): Promise<Response> {
  return fetch(hookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}
