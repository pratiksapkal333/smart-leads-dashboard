import { Router } from "express";

import {
    createLead,
    getAllLeads,
    getSingleLead,
    updateLead,
    deleteLead,
    exportLeads, // Ensure this is exported from your controller
} from "../controllers/lead.controller";

import validate from "../middlewares/validate.middleware";
import authMiddleware from "../middlewares/auth.middleware";

import {
    createLeadSchema,
    updateLeadSchema,
} from "../validators/lead.validator";
import { rbac } from "../middlewares/rbac.middleware";

const router = Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// 1. STATIC ROUTES FIRST:
// Routes with specific paths must come before dynamic segments like :id
router.get("/export", exportLeads);

// 2. RESOURCE ROUTES:
router.post("/", validate(createLeadSchema), createLead);
router.get("/", getAllLeads);

// 3. DYNAMIC ROUTES:
// These catch everything else, so they must be defined last
router.get("/:id", getSingleLead);
router.patch("/:id", validate(updateLeadSchema), updateLead);
router.delete("/:id", rbac(["Admin"]), deleteLead);

export default router;