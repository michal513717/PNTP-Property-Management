import type { Request, Response, NextFunction } from "express";
import { Application } from "express";
import * as log4js from 'log4js';

export const configureNotValidRoute = (app: Application) => {
    app.all("*", async (req: Request, _res: Response, next: NextFunction) => {
        const err = new Error(`Route ${req.originalUrl} not found`) as Error & {
            statusCode: number;
        };
        err.statusCode = 404;
        next(err);
    });

    app.use(
        (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
            const isNonNullObject = typeof err === "object" && err !== null;

            const status =
                isNonNullObject && "status" in err ? err.status : "error";
            const statusCode =
                isNonNullObject && "statusCode" in err
                    ? isNaN(Number(err.statusCode))
                        ? 500
                        : (err.statusCode as number)
                    : 500;

            const message = isNonNullObject && "message" in err ? err.message : "";

            res.status(statusCode).json({
                status,
                message,
            });
        }
    );
}