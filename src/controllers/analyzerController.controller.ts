import { APPLICATION_CONFIG } from "../utils/applicationConfig"
import { MessageKeywordAnalzyerManager } from "../managers/messageKeywordAnalzyerManager";
import { MessageAiAnalzyerManager } from "../managers/messageAiAnalzyerManager";
import { AnalyzedFactors } from "../models/common.models";
import type { Request, Response } from "express";
import { MessageAnalyzer } from "../managers/messageAnalzyer";

export class AnalyzerController {
    constructor(
        private messageAnalyzer: MessageAnalyzer
    ) { }

    async analyzeMessage(req: Request, res: Response): Promise<any> {
        this.messageAnalyzer.exec(req.body.message);
    }
}