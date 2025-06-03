import mongoose, { Model } from "mongoose"
import { Maintenance, MaintenanceSchema } from "../models/mongoSchemas"
import * as log4js from 'log4js';

const logger = log4js.getLogger();

export class MaintenanceRepository {

    private maintenanceModel: Model<Maintenance>;

    constructor(){
        this.maintenanceModel = mongoose.model<Maintenance>("Maintenance", MaintenanceSchema, 'maintenances');
    }

    async create(maintenanceData: Maintenance): Promise<any>{
        const maintenance = new this.maintenanceModel(maintenanceData);

        return await maintenance.save();
    };

    public async findById(id: string): Promise<Maintenance | null> {
        try {
            return this.maintenanceModel.findById(id).exec();
        } catch (error) {
            logger.error("Error fetching maintenance", error);
            return null;
        }
    }

    public async getAll(): Promise<Maintenance[]> {
        try {
            return await this.maintenanceModel.find().lean();
        } catch (error) {
            logger.error("Error fetching all maintenance", error);
            return [];
        }
    }
}