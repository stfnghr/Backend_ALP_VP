import { NextFunction, Response } from "express";
import { ReportService } from "../services/report-services";
import { UserRequest } from "../types/user-request";

export class ReportController {
  static async createReport(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await ReportService.createReport(req.body, req.user!.id);
      res.status(201).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async getReportById(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const reportId = Number(req.params.id);
      const response = await ReportService.getReportById(reportId);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async getReports(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await ReportService.getReports();
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}
