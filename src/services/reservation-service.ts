import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";
import { ReservationCreateRequest, ReservationResponse, toReservationResponse, toReservationResponseList } from "../models/reservation-model";

export class ReservationService {
  static async createReservation(data: ReservationCreateRequest): Promise<ReservationResponse> {
    const parkingLot = await prismaClient.parkingLot.findUnique({
      where: {
        id: data.parkingLotId,
      },
    });

    if (!parkingLot) {
      throw new ResponseError(404, "Parking lot not found");
    }

    const user = await prismaClient.user.findUnique({
      where: {
        id: data.userId,
      },
    });

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    const reservation = await prismaClient.reservation.create({
      data: {
        lotId: data.parkingLotId,
        userId: data.userId,
        inAt: data.checkInAt,
        outAt: null, // Ensure outAt is null initially
        status: "active", // Set the reservation status to active
        qrId: data.qrId
      },
    });

    return toReservationResponse(reservation);
  }

  static async checkoutReservation(id: number): Promise<ReservationResponse> {
    const reservation = await prismaClient.reservation.findUnique({
      where: {
        id: id,
      },
    });

    if (!reservation) {
      throw new ResponseError(404, "Booking not found");
    }

    if (reservation.outAt) {
      throw new ResponseError(400, "Booking already checked out");
    }

    const parkingLot = await prismaClient.parkingLot.findUnique({
      where: {
        id: reservation.id,
      },
    });

    if (!parkingLot) {
      throw new ResponseError(404, "Parking lot not found");
    }

    const checkOutAt = new Date();
    const checkInAt = reservation.inAt;
    const duration = checkOutAt.getTime() - checkInAt.getTime();

    await prismaClient.reservation.update({
      where: {
        id: id,
      },
      data: {
        outAt: checkOutAt,
      },
    });

    return toReservationResponse({
      ...reservation,
      outAt: checkOutAt,
    });
  }

  static async getReservation(id: number): Promise<ReservationResponse> {
    const reservation = await prismaClient.reservation.findUnique({
      where: {
        id: id,
      },
    });

    if (!reservation) {
      throw new ResponseError(404, "Booking not found");
    }

    return toReservationResponse(reservation);
  }

  static async getReservations(): Promise<ReservationResponse[]> {
    const reservations = await prismaClient.reservation.findMany();

    return toReservationResponseList(reservations);
  }
}
