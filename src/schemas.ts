import { z } from 'zod';

export const webhookResponseBodySchema = z.object({
  retry_after: z.number(),
});
