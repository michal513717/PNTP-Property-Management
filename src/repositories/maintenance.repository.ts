import mongoose, { Model } from "mongoose"
import { Maintenance, MaintenanceDocument, MaintenanceSchema } from "../models/mongoSchemas"
import * as log4js from 'log4js';

const logger = log4js.getLogger();

export class MaintenanceRepository {

    private maintenanceModel: Model<MaintenanceDocument>;

    constructor(){
        this.maintenanceModel = mongoose.model<MaintenanceDocument>("Maintenance", MaintenanceSchema, 'maintenances');
    }

    async create(maintenanceData: Omit<Maintenance, '_id'>): Promise<any>{
        const maintenance = new this.maintenanceModel(maintenanceData);

        return await maintenance.save();
    };

    public async findById(id: string): Promise<MaintenanceDocument | null> {
        try {
            return this.maintenanceModel.findById(id).exec();
        } catch (error) {
            logger.error("Error fetching maintenance", error);
            return null;
        }
    }

    public async getAll(): Promise<MaintenanceDocument[]> {
        try {
            return await this.maintenanceModel.find().lean();
        } catch (error) {
            logger.error("Error fetching all maintenance", error);
            return [];
        }
    }
}