import * as http from "http";

export type HttpServer = http.Server;
export type NextFunction = (args: CommonNextFunctionArgs) => void;
export type CommonNextFunctionArgs = unknown;
export interface Command { };
export interface CommandHandler<T extends Command> {
    handle(command: T): Promise<void>;
};
export enum ResponseStatus {
    FAILED = "FAILED",
    SUCCESS = "SUCCESS"
};
export enum ERROR_CODES {
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    VALIDATION_ERROR = "VALIDATION_ERROR"
};
export enum PRIORITY {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
};
// export interface AnalyzedFactors {
//     keywords: string[];
//     urgencyIndicators: number;
//     alarmScore: number;
//     priorityScore: number;
//     priority: PRIORITY;
// }

export type AnalyzedFactors = {
    keywords: string[];
    priority: PRIORITY;
    reason?: string;
}