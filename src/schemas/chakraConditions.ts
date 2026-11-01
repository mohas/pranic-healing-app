import { z } from 'zod';
import { componentBaseSchema } from './componentBase';

export const chakraStateSchema = z.object({
  activity: z.enum(['n', 'ua', 'oa']).optional(),
  secondState: z.enum(['n', 'd', 'c']).optional(),
});

export const chakraConditionsSchema = componentBaseSchema.extend({
  type: z.literal('chakraConditions'),
  phase: z.enum(['none', 'before', 'after']),
  measuredAt: z.string(),
  root: chakraStateSchema,
  sacral: chakraStateSchema,
  solarPlexus: chakraStateSchema,
  heart: chakraStateSchema,
  throat: chakraStateSchema,
  thirdEye: chakraStateSchema,
  crown: chakraStateSchema,
});

export type ChakraConditions = z.infer<typeof chakraConditionsSchema>;
