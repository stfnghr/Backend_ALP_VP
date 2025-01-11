import { NextFunction, Response } from "express";
import { PenaltyService } from "../services/penalty-service";
import { UserRequest } from "../types/user-request";

export class PenaltyController {
  static async createPenalty(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await PenaltyService.createPenalty(req.body);
      res.status(201).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async getPenaltyById(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const penaltyId = Number(req.params.id);
      const response = await PenaltyService.getPenaltyById(penaltyId);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async getPenalties(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await PenaltyService.getPenalties();
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}
