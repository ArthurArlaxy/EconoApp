import { Handler } from "express"
import { HttpError } from "../Error/HttpError"
import { ReportService } from "../Service/ReportsService"

export class ReportsController {
    constructor(private reportService: ReportService) {}

    getReports: Handler = async (req, res, next) => {
        try {
            if (!req.user) throw new HttpError("Invalid token", 401)
            const userId = (req.user as any).id
            const reports = await this.reportService.getReportService(userId)
            res.json(reports)
        } catch (error) {
            next(error)
        }
    }
}