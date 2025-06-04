import { PRIORITY } from "../models/common.models";
import { Maintenance } from "../models/mongoSchemas";
import { MaintenanceRepository } from "../repositories/maintenance.repository";

export class GetMaintanaceQuery {
    constructor(
        private maintenanceRepository: MaintenanceRepository
    ) { }

    async execute(priorityLevel: PRIORITY): Promise<Maintenance[]> {
        return this.maintenanceRepository.getByPriority(priorityLevel);
    }
}