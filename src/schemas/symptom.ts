import { z } from 'zod';
import { componentBaseSchema } from './componentBase';

export const symptomSchema = componentBaseSchema.extend({
  type: z.literal('symptom'),
  title: z.string(),
  status: z.enum(['active', 'completed']),
  completedAt: z.string().optional(),
  completedInRecordId: z.string().optional(),
});

export type Symptom = z.infer<typeof symptomSchema>;
