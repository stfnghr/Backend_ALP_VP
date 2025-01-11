import { z, ZodType } from "zod";

export class ReservationValidation {
    static create: ZodType<{ 
        user_id: string, 
        parking_lot_id: string, 
        start_time: string, 
        end_time: string 
    }> = z.object({
        user_id: z.string().min(1).max(50),
        parking_lot_id: z.string().min(1).max(50),
        start_time: z.string().min(1).max(50),
        end_time: z.string().min(1).max(50)
    })
}