import { Document, Schema, Types } from "mongoose"
import { PRIORITY } from "./common.models";

export type Maintenance = {
    _id: Types.ObjectId;
    tenantContact: string;
    originalMessage: string;
    priorityLevel: PRIORITY;
    submissionDate: Date;
    resolved: boolean;
};

export type MaintenanceDocument = Document & {
    _id: Types.ObjectId;
    tenantContact: string;
    originalMessage: string;
    priorityLevel: PRIORITY;
    submissionDate: Date;
    resolved: boolean;
};

export const MaintenanceSchema = new Schema<MaintenanceDocument>({
    tenantContact: { type: String, required: true },
    originalMessage: { type: String, required: true },
    priorityLevel: { type: String, enum: Object.values(PRIORITY), required: true },
    submissionDate: Date,
    resolved: Boolean
}, {
    versionKey: false,
    collection: 'maintenances'
})