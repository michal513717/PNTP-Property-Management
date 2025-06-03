import { AnalyzedFactors } from "../models/common.models";


export abstract class MessageAnalyzer {
    public abstract exec(message: string): AnalyzedFactors | Promise<AnalyzedFactors>;
}