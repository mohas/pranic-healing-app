import { z } from 'zod';
import { baseEntitySchema } from './base';

export const generalChatSchema = baseEntitySchema.extend({
  type: z.literal('generalChat'),
  patientId: z.string(),
  healerId: z.string(),
});

export type GeneralChat = z.infer<typeof generalChatSchema>;
