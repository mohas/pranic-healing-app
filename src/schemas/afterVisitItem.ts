import { z } from 'zod';
import { componentBaseSchema } from './componentBase';

export const checkInSchema = z.object({
  timestamp: z.string(),
});

export const afterVisitItemSchema = componentBaseSchema.extend({
  type: z.literal('afterVisitItem'),
  itemType: z.enum(['medication', 'exercise', 'practice', 'diet', 'rest', 'other']),
  title: z.string(),
  instructions: z.string(),
  frequency: z.string(),
  duration: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.enum(['pending', 'in progress', 'done', 'dropped']),
  completionLog: z.array(checkInSchema),
});

export type AfterVisitItem = z.infer<typeof afterVisitItemSchema>;
