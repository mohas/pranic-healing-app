import { z } from 'zod';
import { baseEntitySchema } from './base';

export const caseSchema = baseEntitySchema.extend({
  type: z.literal('case'),
  patientId: z.string(),
  title: z.string(),
  description: z.string(),
  diagnosis: z.string(),
  status: z.enum(['open', 'closed', 'abandoned']),
  openedAt: z.string(),
  closedAt: z.string().optional(),
  owningHealerId: z.string(),
});

export type Case = z.infer<typeof caseSchema>;
