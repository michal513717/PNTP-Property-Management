import { GetMaintanaceQuery } from "../queries/get-maintenance.query"
import type { Request, Response } from "express"

export class RequestsController {

    constructor(
        private getMaintanaceQuery: GetMaintanaceQuery
    ) { }

    async getAllMaintanaces(req: Request, res: Response) {
        const maintenances = await this.getMaintanaceQuery.execute();
        res.status(200).send({ result: { message: "Success", maintenances } });
    };
}