import { Report } from "@prisma/client"

export interface ReportCreateRequest {
    image: string;
    description: string;
    licensePlate: string;
}

export interface ReportResponse {
    id: number;
    image: string;
    description: string;
    licensePlate: string;
}

export function toReportResponseList(report: Report[]): ReportResponse[] {
    const result = report.map((data) => {
        return {
            id: data.id,
            image: data.image,
            description: data.description,
            licensePlate: data.licensePlate
        }
    })

    return result
}

export function toReportResponse(report: Report): ReportResponse {
    return {
        id: report.id,
        image: report.image,
        description: report.description,
        licensePlate: report.licensePlate
    }
}