export enum LeadStatus {
    NEW = "New",
    CONTACTED = "Contacted",
    QUALIFIED = "Qualified",
    LOST = "Lost",
}

export enum LeadSource {
    WEBSITE = "Website",
    INSTAGRAM = "Instagram",
    REFERRAL = "Referral",
}

export interface ILead {
    name: string;
    email: string;
    status: LeadStatus;
    source: LeadSource;
    createdAt?: Date;
    updatedAt?: Date;
}