import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { ReservationCreateRequest } from "../models/reservation-model";
import { ReservationService } from "../services/reservation-service";

export class ReservationController {
    static async createReservation(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const request: ReservationCreateRequest = req.body as ReservationCreateRequest;
            const response = await ReservationService.createReservation(request);

            res.status(201).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async getReservation(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);
            const response = await ReservationService.getReservation(id);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async getReservations(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await ReservationService.getReservations();

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }
}