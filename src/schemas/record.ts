import { z } from 'zod';
import { baseEntitySchema } from './base';

export const recordSchema = baseEntitySchema.extend({
  type: z.literal('record'),
  caseId: z.string(),
  patientId: z.string(),
  kind: z.enum(['healing_session', 'standalone_measurement', 'note', 'status_change']),
  dateTime: z.string(),
  authorId: z.string(),
  status: z.enum(['created', 'draft', 'completed']),
  statusChange: z.enum(['created', 'open', 'closed', 'reopened', 'abandoned']).optional(),
});

export type Record = z.infer<typeof recordSchema>;
