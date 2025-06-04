import { AnalyzedFactors, PRIORITY } from "../models/common.models";
import { HIGH_PRIORITY_TERMS, MEDIUM_PRIORITY_TERMS } from "../utils/priorityLevels";

export class MessageKeywordAnalzyerManager {
    constructor() { }

    public exec(message: string): AnalyzedFactors {
        const lowerMessage = message.toLowerCase();
        const keywords: string[] = [];
        let priority: PRIORITY = PRIORITY.LOW;
        let reason = "No urgent issues detected";

        for (const { term, reason: termReason } of HIGH_PRIORITY_TERMS) {
            if (lowerMessage.includes(term)) {
                keywords.push(term);
                priority = PRIORITY.HIGH;
                reason = termReason;
                break;
            }
        }

        if (priority !== PRIORITY.HIGH) {
            for (const { term, reason: termReason } of MEDIUM_PRIORITY_TERMS) {
                if (lowerMessage.includes(term)) {
                    keywords.push(term);
                    priority = PRIORITY.MEDIUM;
                    reason = termReason;
                    break;
                }
            }
        }

        return {
            keywords,
            priority,
            reason
        };
    }
}