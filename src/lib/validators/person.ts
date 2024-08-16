
import { z } from 'zod';

export const PersonValidator = z.object({
    name: z.string(),
    role: z.string(),
    team: z.string()
})



export type PersonCreationRequest = z.infer<typeof PersonValidator>