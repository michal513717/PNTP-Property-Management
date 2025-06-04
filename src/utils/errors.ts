import { ERROR_CODES, ResponseStatus } from "../models/common.models";

export abstract class ErrorWithCode extends Error {
    constructor(message: string, public status: number, public code: ERROR_CODES) {
        super(message);
    }

    public toJSON() {
        return {
            result: {
                status: ResponseStatus.FAILED,
                message: this.message,
                code: this.code
            }
        }
    }
};

export class ValidationError extends ErrorWithCode {
    constructor(){
        super("Validation error", 403, ERROR_CODES.VALIDATION_ERROR);
    }
};