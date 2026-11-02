import { z } from 'zod';
import { baseEntitySchema } from './base';

export const appointmentSchema = baseEntitySchema.extend({
  type: z.literal('appointment'),
  healerId: z.string(),
  patientId: z.string(),
  caseId: z.string().optional(),
  start: z.string(),
  end: z.string(),
  status: z.enum(['scheduled', 'completed', 'cancelled']),
  notes: z.string().optional(),
  recordId: z.string().optional(),
});

export type Appointment = z.infer<typeof appointmentSchema>;
