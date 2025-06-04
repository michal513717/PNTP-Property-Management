import type { Request, Response } from "express";
import { MessageAnalyzer } from "../managers/messageAnalzyer";

export class AnalyzerController {
    constructor(
        private messageAnalyzer: MessageAnalyzer
    ) { }

    async analyzeMessage(req: Request, res: Response): Promise<any> {
        const result = await this.messageAnalyzer.exec(req.body.message);

        res.status(200).send({
            result: {
                keywords: result.keywords,
                urgencyIndicators: result.urgencyIndicators,
                priorityScore: result.priorityScore
            }
        })
    }
}