import { ParkingLot } from "@prisma/client";

export interface ParkingLotCreateRequest {
    floor: string,
    number: string;
}

export interface ParkingLotResponse {
    id: number;
    floor: string;
    number: string;
}

export function toParkingLotResponseList(parkingLot: ParkingLot[]): ParkingLotResponse[] {
    const result = parkingLot.map((data) => {
        return {
            id: data.id,
            floor: data.floor,
            number: data.number
        }
    })

    return result
} 

export function toParkingLotResponse(parkingLot: ParkingLot): ParkingLotResponse {
    return {
        id: parkingLot.id,
        floor: parkingLot.floor,
        number: parkingLot.number
    }
}