import { z } from 'zod';

export const baseEntitySchema = z.object({
  id: z.string(),
  type: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
});
