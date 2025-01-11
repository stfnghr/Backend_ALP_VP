import { Reservation, User } from "@prisma/client";

export interface ReservationCreateRequest {
    parkingLotId: number;
    userId: number;
    checkInAt: Date;
    checkOutAt: Date;
}

export interface ReservationResponse {
    id: number;
    parkingLotId: number;
    userId: number;
    checkInAt: Date;
    checkOutAt: Date;
}

export function toReservationResponseList(reservation: Reservation[]): ReservationResponse[] {
    const result = reservation.map((data) => {
        return {
            id: data.id,
            parkingLotId: data.parkingLotId,
            userId: data.userId,
            checkInAt: data.checkInAt,
            checkOutAt: data.checkOutAt
        }
    })

    return result
}

export function toReservationResponse(reservation: Reservation): ReservationResponse {
    return {
        id: reservation.id,
        parkingLotId: reservation.parkingLotId,
        userId: reservation.userId,
        checkInAt: reservation.checkInAt,
        checkOutAt: reservation.checkOutAt
    }
}