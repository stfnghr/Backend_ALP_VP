import { z, ZodType } from "zod";

export class PenaltyValidation {
    static create: ZodType<{ user_id: string, duration: string, status: string }> = z.object({
        user_id: z.string().min(1).max(5),
        duration: z.string().min(1).max(12),
        status: z.string().min(1).max(12)
    });
}