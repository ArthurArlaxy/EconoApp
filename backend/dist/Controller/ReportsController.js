"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsController = void 0;
const HttpError_1 = require("../Error/HttpError");
class ReportsController {
    constructor(reportService) {
        this.reportService = reportService;
        this.getReports = async (req, res, next) => {
            try {
                if (!req.user)
                    throw new HttpError_1.HttpError("Invalid token", 401);
                const userId = req.user.id;
                const reports = await this.reportService.getReportService(userId);
                res.json(reports);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.ReportsController = ReportsController;
