import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";
import { ReportCreateRequest, ReportResponse,toReportResponse } from "../models/report-model";

export class ReportService {
    static async createReport(data: ReportCreateRequest, userId: number): Promise<ReportResponse> {
        const response = await prismaClient.report.create({
        data: {
            image: data.image,
            description: data.description,
            licensePlate: data.licensePlate,
            userId: userId
        }
        });
    
        return toReportResponse(response);
    }
    
    static async getReportById(id: number): Promise<ReportResponse> {
        const response = await prismaClient.report.findUnique({
        where: {
            id: id
        }
        });
    
        if (!response) {
        throw new ResponseError(404, "Report not found");
        }
    
        return toReportResponse(response);
    }

    static async getReports(): Promise<ReportResponse[]> {
        const response = await prismaClient.report.findMany();
        return response.map(toReportResponse);
    }
}