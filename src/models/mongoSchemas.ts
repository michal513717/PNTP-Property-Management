import { Document, Schema, Types } from "mongoose"

export type Maintenance = Document & {
    _id: Types.ObjectId;
    tenatContact: string;
    originalMessage: string;
    priorityLevel: number;
    submissionDate: Date;
    resolved: boolean
};

export const MaintenanceSchema = new Schema<Maintenance>({
    tenatContact: { type: String, required: true },
    originalMessage: { type: String, required: true },
    priorityLevel: { type: Number, required: true },
    submissionDate: Date,
    resolved: Boolean
}, {
    versionKey: false,
    collection: 'maintenances'
})