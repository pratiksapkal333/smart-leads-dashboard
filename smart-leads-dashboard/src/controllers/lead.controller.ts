import { Request, Response } from "express";
import {
    createLeadService,
    getAllLeadsService,
    getSingleLeadService,
    updateLeadService,
    deleteLeadService,
} from "../services/lead.service";

export const createLead = async (req: Request, res: Response): Promise<void> => {
    try {
        const lead = await createLeadService(req.body);
        res.status(201).json({ success: true, data: lead });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create lead", error });
    }
};

export const getAllLeads = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await getAllLeadsService(req.query as any);
        res.status(200).json({ success: true, ...result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch leads", error });
    }
};

// 💡 NEW: Exported function for CSV download
export const exportLeads = async (req: Request, res: Response): Promise<void> => {
    try {
        // 1. Await the service call
        const result = await getAllLeadsService(req.query as any);

        // 2. Extract 'leads' from 'result.data' based on your error message
        const leads = result.data;

        // 3. Convert data to CSV format
        const csvRows = ["Name,Email,Status,Source"];
        for (const lead of leads) {
            // Ensure these fields exist on your ILead model
            csvRows.push(`${lead.name},${lead.email},${lead.status},${lead.source}`);
        }

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", 'attachment; filename="leads.csv"');
        res.status(200).send(csvRows.join("\n"));
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to export leads",
            error
        });
    }
};

export const getSingleLead = async (req: Request, res: Response): Promise<void> => {
    try {
        const lead = await getSingleLeadService(req.params.id as string);
        res.status(200).json({ success: true, data: lead });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch lead", error });
    }
};

export const updateLead = async (req: Request, res: Response): Promise<void> => {
    try {
        const lead = await updateLeadService(req.params.id as string, req.body);
        res.status(200).json({ success: true, data: lead });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update lead", error });
    }
};

export const deleteLead = async (req: Request, res: Response): Promise<void> => {
    try {
        await deleteLeadService(req.params.id as string);
        res.status(200).json({ success: true, message: "Lead deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete lead", error });
    }
};