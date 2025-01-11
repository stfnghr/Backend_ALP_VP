import { z, ZodType } from "zod";

export class TrafficValidation {
    static create: ZodType<{ lot_id: string, status: string }> = z.object({
        lot_id: z.string().min(1).max(5),
        status: z.string().min(1).max(12)
    });
}