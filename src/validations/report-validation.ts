import { z, ZodType } from "zod";

export class ReportValidation {
  static create: ZodType<{ 
    user_id: string, 
    description: string, 
    image: string, 
    licensePlate: string 
  }> = z.object({
    user_id: z.string().min(1).max(50),
    description: z.string().min(1).max(50),
    image: z.string().min(1).max(50),
    licensePlate: z.string().min(1).max(50)
    })
}