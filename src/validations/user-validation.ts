import { z, ZodType } from "zod";

export class UserValidation {
    static readonly REGISTER: ZodType = z.object({
      firstName: z.string().min(1).max(50),
      lastName: z.string().min(1).max(50),
      NIM: z.string().min(1).max(50),
      licensePlate: z.string().min(1).max(150),
      SIM: z.string().min(1).max(150),
      email: z.string().min(1).max(150),
      password: z.string().min(1).max(50)
    })

    static readonly LOGIN: ZodType = z.object({
        email: z.string().min(1).max(150),
        password: z.string().min(1).max(100)
    })
}