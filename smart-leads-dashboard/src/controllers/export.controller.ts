import { Request, Response } from "express";
import Lead from "../models/lead.model";

export const exportLeadsCSV = async (req: Request, res: Response) => {
    try {
        const leads = await Lead.find();

        // CSV Header
        let csv = "Name,Email,Status,Source,CreatedAt\n";

        // Convert rows
        leads.forEach((lead) => {
            csv += `${lead.name},${lead.email},${lead.status},${lead.source},${lead.createdAt}\n`;
        });

        res.header("Content-Type", "text/csv");
        res.attachment("leads.csv");

        return res.send(csv);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "CSV export failed",
        });
    }
};