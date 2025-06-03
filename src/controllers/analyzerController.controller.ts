import { APPLICATION_CONFIG } from "../utils/applicationConfig"
import { MessageKeywordAnalzyerManager } from "../managers/messageKeywordAnalzyerManager";
import { MessageAiAnalzyerManager } from "../managers/messageAiAnalzyerManager";
import { AnalyzedFactors } from "../models/common.models";

export class AnalyzerController {
    constructor(
        private messageKeywordAnalzyerManager: MessageKeywordAnalzyerManager,
        private messageAiAnalzyerManager: MessageAiAnalzyerManager
    ) { }

    async analyzeMessage(message: string): Promise<any> {
        return this.isAiAnalzyeAccessible() ? this.analyzeMessageByKeywords(message) : this.analyzeMessageByAI(message);
    }

    private isAiAnalzyeAccessible(): boolean {
        if (APPLICATION_CONFIG.ENABLE_AI_TO_ANALYZE === false) {
            return false;
        }

        return process.env.CHAT_GTP_KEY !== "";
    };

    private analyzeMessageByKeywords(question: string): AnalyzedFactors {
        return this.messageKeywordAnalzyerManager.exec(question);
    }

    private async analyzeMessageByAI(question: string): Promise<AnalyzedFactors> {
        return this.messageAiAnalzyerManager.exec(question);
    }
}