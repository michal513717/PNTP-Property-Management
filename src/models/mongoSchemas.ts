import { Document, Schema, Types } from "mongoose"

export type Maintenance = {
    _id: Types.ObjectId;
    tenantContact: string;
    originalMessage: string;
    priorityLevel: number;
    submissionDate: Date;
    resolved: boolean;
};

export type MaintenanceDocument = Document & {
    _id: Types.ObjectId;
    tenantContact: string;
    originalMessage: string;
    priorityLevel: number;
    submissionDate: Date;
    resolved: boolean;
};

export const MaintenanceSchema = new Schema<MaintenanceDocument>({
    tenantContact: { type: String, required: true },
    originalMessage: { type: String, required: true },
    priorityLevel: { type: Number, required: true },
    submissionDate: Date,
    resolved: Boolean
}, {
    versionKey: false,
    collection: 'maintenances'
})