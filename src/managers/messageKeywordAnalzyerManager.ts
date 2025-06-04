import { AnalyzedFactors, PRIORITY } from "../models/common.models";
import { MessageAnalyzer } from "./messageAnalzyer";

export class MessageKeywordAnalzyerManager {
    constructor() { }

    public exec(message: string): AnalyzedFactors {
        const lowerMessage = message.toLowerCase();
        const keywords: string[] = [];
        let priority: PRIORITY = PRIORITY.LOW;
        let reason = "No urgent issues detected";

        //It should be in some constans 
        const highPriorityTerms = [
            { term: 'gas leak', reason: 'Gas leak detected' },
            { term: 'smell gas', reason: 'Gas odor detected' },
            { term: 'electrical fire', reason: 'Electrical fire risk' },
            { term: 'sparks', reason: 'Electrical sparks detected' },
            { term: 'burst pipe', reason: 'Pipe burst detected' },
            { term: 'flooding', reason: 'Flooding detected' },
            { term: 'sewage', reason: 'Sewage issue detected' },
            { term: 'no heat', reason: 'Heating failure in cold weather' },
            { term: 'exposed wires', reason: 'Exposed electrical wires' }
        ];

        const mediumPriorityTerms = [
            { term: 'leak', reason: 'Water leak detected' },
            { term: 'broken', reason: 'Broken item needs repair' },
            { term: 'not working', reason: 'Appliance not functioning' },
            { term: 'clogged', reason: 'Drain clog detected' }
        ];

        for (const { term, reason: termReason } of highPriorityTerms) {
            if (lowerMessage.includes(term)) {
                keywords.push(term);
                priority = PRIORITY.HIGH;
                reason = termReason;
                break;
            }
        }

        if (priority !== PRIORITY.HIGH) {
            for (const { term, reason: termReason } of mediumPriorityTerms) {
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