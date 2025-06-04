import { GetMaintanaceQuery } from "../queries/get-maintenance.query"
import type { Request, Response } from "express"
import { MaintenanceRepository } from "../repositories/maintenance.repository";
import { MessageAnalyzer } from "../managers/messageAnalzyer";
import { createRequestValidator } from "../validators/createRequest.validator";
import { validationResult } from 'express-validator';
import { ErrorWithCode, ValidationError } from "../utils/errors";
import { MaintenanceRequest } from "../models/requests.models";
import { internalServerErrorResponse, validationErrorResponse } from "../utils/responses";
import { getMaintanacesValidator } from "../validators/getMaintenances.validator";
import { PRIORITY } from "../models/common.models";

export class RequestsController {

    constructor(
        private getMaintanaceQuery: GetMaintanaceQuery,
        private maintenanceRepository: MaintenanceRepository,
        private messageAnalyzer: MessageAnalyzer,
    ) { }

    async getMaintanacesByPriority(req: Request<{}, {}, {}, {priority: PRIORITY}>, res: Response) {
        try {
            
            await Promise.all(getMaintanacesValidator.map(validation => validation.run(req)));

            if (validationResult(req).isEmpty() === false) {
                throw new ValidationError();
            }

            //@ts-ignore
            const maintenances = await this.getMaintanaceQuery.execute(req.query.priority.toUpperCase());
            
            const result = maintenances.map((item) => ({
                id: item._id,
                priority: item.priorityLevel,
                message: item.originalMessage,
                createdAt: item.submissionDate,
                resolved: item.resolved
            }));

            res.status(200).send({ requests: result});
        } catch (error) {

            if (validationResult(req).isEmpty() === false) {
                return validationErrorResponse(res, validationResult(req).array());
            }

            if (error instanceof ErrorWithCode) {
                return res.status(error.status).json(error.toJSON());
            }

            return internalServerErrorResponse(res);
        }
    };

    async createMaintance(req: Request<{}, {}, MaintenanceRequest>, res: Response) {
        try {
            await Promise.all(createRequestValidator.map(validation => validation.run(req)));

            if (validationResult(req).isEmpty() === false) {
                throw new ValidationError();
            }

            const analyzeResult = await this.messageAnalyzer.exec(req.body.message);

            const maintenance = {
                tenantContact: req.body.tenantId,
                originalMessage: req.body.message,
                submissionDate: req.body.timestamp,
                priorityLevel: analyzeResult.priority,
                resolved: false
            };

            const createdMaintenance = await this.maintenanceRepository.create(maintenance);

            res.status(200).json({
                requestId: createdMaintenance._id,
                priority: analyzeResult.priority,
                analyzedFactors: {
                    keywords: analyzeResult.keywords,
                    reason: analyzeResult.reason
                }
            })
        } catch (error) {
            if (validationResult(req).isEmpty() === false) {
                return validationErrorResponse(res, validationResult(req).array());
            }

            if (error instanceof ErrorWithCode) {
                return res.status(error.status).json(error.toJSON());
            }

            return internalServerErrorResponse(res);
        }
    }
}