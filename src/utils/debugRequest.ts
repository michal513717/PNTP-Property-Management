import type { Request, Response, NextFunction } from "express";
import { Application } from "express";
import * as log4js from 'log4js';

const logger = log4js.getLogger("http");

export const debugRequest = async (application: Application) => {

    application.use((req: Request, res: Response, next: NextFunction) => {
        logger.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            logger.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
        });

        next();
    });
}