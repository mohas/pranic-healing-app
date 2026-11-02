import { z } from 'zod';
import { baseEntitySchema } from './base';

export const componentBaseSchema = baseEntitySchema.extend({
  caseId: z.string(),
  patientId: z.string(),
  recordId: z.string().optional(),
  authorId: z.string(),
});

export type ComponentBase = z.infer<typeof componentBaseSchema>;
