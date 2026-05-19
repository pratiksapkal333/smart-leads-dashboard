import { Router } from "express";
import { exportLeadsCSV } from "../controllers/export.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get("/csv", authMiddleware, exportLeadsCSV);

export default router;