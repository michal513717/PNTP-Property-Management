import type { Request, Response } from "express";
import { MessageAnalyzer } from "../managers/messageAnalzyer";
import { analyzeMessageValidator } from "../validators/analyzeMessege.validator";
import { internalServerErrorResponse, validationErrorResponse } from "../utils/responses";
import { validationResult } from "express-validator";
import { ErrorWithCode, ValidationError } from "../utils/errors";

export class AnalyzerController {
    constructor(
        private messageAnalyzer: MessageAnalyzer
    ) { }

    async analyzeMessage(req: Request, res: Response): Promise<any> {
        try {
            await Promise.all(analyzeMessageValidator.map(validation => validation.run(req)));

            if (validationResult(req).isEmpty() === false) {
                throw new ValidationError();
            }

            const result = await this.messageAnalyzer.exec(req.body.message);

            res.status(200).send({
                result: {
                    keywords: result.keywords,
                    urgencyIndicators: result.urgencyIndicators,
                    priorityScore: result.priorityScore
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