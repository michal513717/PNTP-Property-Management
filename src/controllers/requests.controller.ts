import { GetMaintanaceQuery } from "../queries/get-maintenance.query"
import type { Request, Response } from "express"
import { MaintenanceRepository } from "../repositories/maintenance.repository";
import { MessageAiAnalzyerManager } from "../managers/messageAiAnalzyerManager";
import { MessageKeywordAnalzyerManager } from "../managers/messageKeywordAnalzyerManager";

export class RequestsController {

    constructor(
        private getMaintanaceQuery: GetMaintanaceQuery,
        private maintenanceRepository: MaintenanceRepository,
        private messageAiAnalyzerManager: MessageAiAnalzyerManager,
        private messageKeywordAnalzyerManager: MessageKeywordAnalzyerManager
    ) { }

    async getAllMaintanaces(req: Request, res: Response) {
        const maintenances = await this.getMaintanaceQuery.execute();
        res.status(200).send({ result: { message: "Success", maintenances } });
    };

    async createMaintance(req: Request, res: Response) {
        const analyzeResult = this.messageAiAnalyzerManager.isAiAnalzyeAccessible()
            ? this.messageAiAnalyzerManager.exec(req.body.message)
            : this.messageKeywordAnalzyerManager.exec(req.body.message);
    }
}