import { z } from 'zod';
import { componentBaseSchema } from './componentBase';

export const symptomEntrySchema = componentBaseSchema.extend({
  type: z.literal('symptomEntry'),
  symptomId: z.string(),
  note: z.string().optional(),
  severity: z.number().min(1).max(10).optional(),
  pain: z.number().min(1).max(10).optional(),
  pin: z.object({
    view: z.enum(['front', 'back']),
    x: z.number(),
    y: z.number(),
  }).optional(),
});

export type SymptomEntry = z.infer<typeof symptomEntrySchema>;
