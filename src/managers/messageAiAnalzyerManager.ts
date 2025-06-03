import { OpenAI } from 'openai';
import { MessageAnalyzer } from './messageAnalzyer';
import { AnalyzedFactors } from '../models/common.models';
import { MessageKeywordAnalzyerManager } from './messageKeywordAnalzyerManager';

export class MessageAiAnalzyerManager extends MessageAnalyzer {

    constructor(
        private messageKeyWordAnalzyer: MessageKeywordAnalzyerManager
    ){
        super();
    }

    public async exec(message: string): Promise<AnalyzedFactors> {
        try {
            const agent = new OpenAI({
                apiKey: process.env.CHAT_GTP_KEY!,
                dangerouslyAllowBrowser: true,
            });

            const request = await agent.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content:
                            'You are a helpful assistant in property maintenance. You will extract structured JSON from user messages. Return this format:\n\n{\n  "keywords": string[],\n  "urgencyIndicators": number,\n  "alarmScore": number,\n  "priorityScore": number,\n  "priority": "low" | "medium" | "high"\n}',
                    },
                    { role: 'user', content: message },
                ],
                temperature: 0.2,
            });

            const raw = request.choices[0]?.message?.content;
            if (!raw) throw new Error('No response from OpenAI');

            const jsonStart = raw.indexOf('{');
            const jsonEnd = raw.lastIndexOf('}');
            const jsonString = raw.slice(jsonStart, jsonEnd + 1);
            const result: AnalyzedFactors = JSON.parse(jsonString);

            return result;
        } catch (error) {
            console.error('Error using OpenAI:', error);
            return this.messageKeyWordAnalzyer.exec(message);
        }
    }
}
