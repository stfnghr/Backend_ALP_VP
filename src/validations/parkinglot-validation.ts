import { z, ZodType } from "zod";

export class ParkingLotValidation {
  static create: ZodType<{ floor: string; number: string }> = z.object({
    floor: z.string().min(1).max(5),
    number: z.string().min(1).max(12),
  });
}
