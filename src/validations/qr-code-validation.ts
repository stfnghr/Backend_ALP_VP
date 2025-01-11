import { z, ZodType } from "zod";

export class QRCodeValidation {
  static create: ZodType<{
    reservation_id: string;
    QR_in: string;
    QR_out: string;
  }> = z.object({
    reservation_id: z.string().min(1).max(50),
    QR_in: z.string().min(1).max(5),
    QR_out: z.string().min(1).max(12),
  });
}
