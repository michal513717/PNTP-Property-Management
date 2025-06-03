import { AnalyzedFactors, PRIORITY } from "../models/common.models";
import { MessageAnalyzer } from "./messageAnalzyer";

export class MessageKeywordAnalzyerManager extends MessageAnalyzer {
    constructor() { super() }

    public exec(message: string): AnalyzedFactors {
        const highKeywords = [
            'leak', 'burst', 'flood', 'gas', 'fire', 'sparking', 'exposed wires',
            'no heat', 'smoke', 'broken window', 'sewage', 'frozen pipes'
        ];
        const mediumKeywords = [
            'broken', 'stuck', 'noisy', 'not working', 'malfunctioning', 'jammed'
        ];
        const lowKeywords = [
            'paint', 'cosmetic', 'squeaky', 'touch-up', 'minor'
        ];

        const alarmWords = ['urgent', 'immediately', 'asap', 'dangerous', 'emergency', 'help'];

        let keywords: string[] = [];
        let urgencyIndicators = 0;
        let alarmScore = 0;

        const msg = message.toLowerCase();

        function countOccurrences(wordList: string[]) {
            let count = 0;
            for (const word of wordList) {
                if (msg.includes(word)) {
                    keywords.push(word);
                    count++;
                }
            }
            return count;
        }

        const highCount = countOccurrences(highKeywords);
        const mediumCount = countOccurrences(mediumKeywords);
        const lowCount = countOccurrences(lowKeywords);
        const alarmCount = countOccurrences(alarmWords);

        urgencyIndicators += highCount * 3;
        urgencyIndicators += mediumCount * 2;
        urgencyIndicators += lowCount;
        alarmScore += alarmCount * 2;

        let priority: PRIORITY = PRIORITY.LOW;
        const totalScore = urgencyIndicators + alarmScore;

        if (totalScore >= 8) priority = PRIORITY.HIGH;
        else if (totalScore >= 4) priority = PRIORITY.MEDIUM;

        return {
            keywords,
            urgencyIndicators,
            alarmScore,
            priorityScore: totalScore / 10,
            priority
        };
    }
}