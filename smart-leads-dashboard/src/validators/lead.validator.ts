import { z } from "zod";

export const createLeadSchema = z.object({
    body: z.object({
        name: z.string().min(2),

        email: z.email(),

        status: z.enum([
            "New",
            "Contacted",
            "Qualified",
            "Lost",
        ]),

        source: z.enum([
            "Website",
            "Instagram",
            "Referral",
        ]),
    }),
});

export const updateLeadSchema =
    createLeadSchema.partial();