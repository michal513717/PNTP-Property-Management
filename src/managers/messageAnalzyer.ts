import { AnalyzedFactors } from "../models/common.models";
import { APPLICATION_CONFIG } from "../utils/applicationConfig";
import { MessageAiAnalzyerManager } from "./messageAiAnalzyerManager";
import { MessageKeywordAnalzyerManager } from "./messageKeywordAnalzyerManager";


export class MessageAnalyzer {

    constructor(
        private messageAiAnalyzerManager: MessageAiAnalzyerManager,
        private messageKeywordAnalzyerManager: MessageKeywordAnalzyerManager
    ){ }

    public isAiAnalzyeAccessible(): boolean {
        if (APPLICATION_CONFIG.ENABLE_AI_TO_ANALYZE === false) {
            return false;
        }

        return process.env.CHAT_GTP_KEY !== "";
    };

    public async exec(message: string): Promise<AnalyzedFactors>{
        return this.isAiAnalzyeAccessible() ? await this.messageAiAnalyzerManager.exec(message) : this.messageKeywordAnalzyerManager.exec(message);
    }
}