import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";
import { PenaltyCreateRequest, PenaltyResponse,toPenaltyResponse } from "../models/penalty-model";

export class PenaltyService {
    static async createPenalty(data: PenaltyCreateRequest): Promise<PenaltyResponse> {
        const penalty = await prismaClient.penalty.create({
            data: {
                description: data.description,
                userId: data.userId
            }
        });

        return toPenaltyResponse(penalty);
    }

    static async getPenaltyById(id: number): Promise<PenaltyResponse> {
        const penalty = await prismaClient.penalty.findUnique({
            where: {
                id: id
            }
        });

        if (!penalty) {
            throw new ResponseError(404, "Penalty not found");
        }

        return toPenaltyResponse(penalty);
    }

    static async getPenalties(): Promise<PenaltyResponse[]> {
        const penalties = await prismaClient.penalty.findMany();
        return penalties.map(toPenaltyResponse);
    }
}