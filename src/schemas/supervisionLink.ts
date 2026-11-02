import { z } from 'zod';
import { baseEntitySchema } from './base';

export const supervisionLinkSchema = baseEntitySchema.extend({
  type: z.literal('supervisionLink'),
  caseId: z.string(),
  supervisorId: z.string(),
  status: z.enum(['pending', 'active', 'ended']),
  endedAt: z.string().optional(),
  endReason: z.string().optional(),
});

export type SupervisionLink = z.infer<typeof supervisionLinkSchema>;
