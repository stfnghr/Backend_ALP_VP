import { Reservation, User } from "@prisma/client";

export interface ReservationCreateRequest {
    parkingLotId: number;
    userId: number;
    checkInAt: Date;
    checkOutAt: Date;
    qrId: number;
}

export interface ReservationResponse {
    id: number;
    parkingLotId: number;
    userId: number;
    checkInAt: Date;
    checkOutAt: Date | null;
}

export function toReservationResponseList(reservation: Reservation[]): ReservationResponse[] {
    const result = reservation.map((data) => {
        return {
            id: data.id,
            parkingLotId: data.id,
            userId: data.userId,
            checkInAt: data.inAt,
            checkOutAt: data.outAt
        }
    })

    return result
}

export function toReservationResponse(reservation: Reservation): ReservationResponse {
    return {
        id: reservation.id,
        parkingLotId: reservation.id,
        userId: reservation.userId,
        checkInAt: reservation.inAt,
        checkOutAt: reservation.outAt
    }
}