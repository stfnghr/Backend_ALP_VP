import { Penalty } from "@prisma/client"

export interface PenaltyCreateRequest {
    description: string;
    userId: number;
}

export interface PenaltyResponse {
    id: number;
    description: string;
    userId: number;
}

export function toPenaltyResponseList(penalty: Penalty[]): PenaltyResponse[] {
    const result = penalty.map((data) => {
        return {
            id: data.id,
            description: data.description,
            userId: data.userId
        }
    })

    return result
}

export function toPenaltyResponse(penalty: Penalty): PenaltyResponse {
    return {
        id: penalty.id,
        description: penalty.description,
        userId: penalty.userId
    }
}