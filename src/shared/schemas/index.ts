import { z } from 'zod';

export const ChakraValueSchema = z.enum(['UA', 'OA', 'N']); // Under-Active, Over-Active, Normal

export const ChakraStatusSchema = z.object({
  root: ChakraValueSchema,
  sacral: ChakraValueSchema,
  solar_plexus: ChakraValueSchema,
  heart: ChakraValueSchema,
  throat: ChakraValueSchema,
  third_eye: ChakraValueSchema,
  crown: ChakraValueSchema,
});

export const PatientSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string().min(2),
  phoneNumber: z.string(),
  email: z.string().email().optional(),
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string(), // ISO date
  createdAt: z.string(),
});

export const CaseSchema = z.object({
  id: z.string().uuid(),
  patientId: z.string().uuid(),
  healerId: z.string().uuid(),
  title: z.string().min(3),
  description: z.string().optional(),
  status: z.enum(['open', 'closed', 'archived']),
  priority: z.enum(['low', 'medium', 'high']),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const RecordSchema = z.object({
  id: z.string().uuid(),
  caseId: z.string().uuid(),
  timestamp: z.string(),
  type: z.enum(['session', 'note', 'follow_up']),
  chakraStatus: ChakraStatusSchema,
  symptoms: z.array(z.object({
    point: z.string(), // SVG coordinate or region ID
    intensity: z.number().min(0).max(10),
    description: z.string().optional(),
  })),
  notes: z.string(),
  afterVisitInstructions: z.array(z.object({
    instruction: z.string(),
    isCompleted: z.boolean(),
  })),
});

export type Patient = z.infer<typeof PatientSchema>;
export type Case = z.infer<typeof CaseSchema>;
export type Record = z.infer<typeof RecordSchema>;
export type ChakraStatus = z.infer<typeof ChakraStatusSchema>;
