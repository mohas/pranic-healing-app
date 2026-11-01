import { z } from 'zod';
import { componentBaseSchema } from './componentBase';

export const memoSchema = componentBaseSchema.extend({
  type: z.literal('memo'),
  text: z.string(),
  chatId: z.string().optional(),
});

export type Memo = z.infer<typeof memoSchema>;
