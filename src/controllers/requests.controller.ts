import { GetMaintanaceQuery } from "../queries/get-maintenance.query"
import type { Request, Response } from "express"
import { MaintenanceRepository } from "../repositories/maintenance.repository";
import { MessageAnalyzer } from "../managers/messageAnalzyer";
import { createRequestValidator } from "../validators/createRequest.validator";
import { validationResult } from 'express-validator';
import { ValidationError } from "../utils/errors";
import { MaintenanceRequest } from "../models/requests.models";

export class RequestsController {

    constructor(
        private getMaintanaceQuery: GetMaintanaceQuery,
        private maintenanceRepository: MaintenanceRepository,
        private messageAnalyzer: MessageAnalyzer,
    ) { }

    async getAllMaintanaces(req: Request, res: Response) {
        const maintenances = await this.getMaintanaceQuery.execute();
        res.status(200).send({ result: { message: "Success", maintenances } });
    };

    async createMaintance(req: Request<{}, {}, MaintenanceRequest>, res: Response) {

        await Promise.all(createRequestValidator.map(validation => validation.run(req)));

        if (validationResult(req).isEmpty() === false) {
            throw new ValidationError();
        }

        const analyzeResult = await this.messageAnalyzer.exec(req.body.message);

        const maintenance = { 
            tenantContact: req.body.tenantId,
            originalMessage: req.body.message,
            priorityLevel: analyzeResult.priorityScore,
            submissionDate: req.body.timestamp,
            resolved: false
        };

        this.maintenanceRepository.create(maintenance);
    }
}