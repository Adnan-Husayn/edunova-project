
import { z } from 'zod';

export const PersonValidator = z.object({
    name: z.string().min(1, "Name is required"),
    role: z.string().min(1, "Role is required"),
    team: z.string().min(1, "Team is required"),
    email: z.string().email("Invalid email address")
})



export type PersonCreationRequest = z.infer<typeof PersonValidator>