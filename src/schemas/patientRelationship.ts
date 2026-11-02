import { z } from 'zod';
import { baseEntitySchema } from './base';

export const patientRelationshipSchema = baseEntitySchema.extend({
  type: z.literal('patientRelationship'),
  healerId: z.string(),
  patientId: z.string(),
});

export type PatientRelationship = z.infer<typeof patientRelationshipSchema>;
