import mongoose, { Schema, Model } from "mongoose";

import {
    ILead,
    LeadStatus,
    LeadSource,
} from "../interfaces/lead.interface";

const leadSchema = new Schema<ILead>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        status: {
            type: String,
            enum: Object.values(LeadStatus),
            default: LeadStatus.NEW,
        },

        source: {
            type: String,
            enum: Object.values(LeadSource),
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Lead: Model<ILead> = mongoose.model<ILead>(
    "Lead",
    leadSchema
);

export default Lead;