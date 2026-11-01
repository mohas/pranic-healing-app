import { z } from 'zod';
import { baseEntitySchema } from './base';

export const userSchema = baseEntitySchema.extend({
  type: z.literal('user'),
  email: z.string().email(),
  displayName: z.string(),
  handle: z.string(),
  preferredLanguage: z.string(),
  timezone: z.string(),
  avatar: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
