import { Maintenance } from "../models/mongoSchemas";
import { MaintenanceRepository } from "../repositories/maintenance.repository";

export class GetMaintanaceQuery {
    constructor(
        private maintenanceRepository: MaintenanceRepository
    ) { }

    async execute(): Promise<Maintenance[]> {
        return this.maintenanceRepository.getAll();
    }
}