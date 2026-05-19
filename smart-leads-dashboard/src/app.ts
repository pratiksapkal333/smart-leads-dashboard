import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import leadRoutes from "./routes/lead.routes";
import exportRoutes from "./routes/export.routes";

const app = express();

// Configure CORS to allow your specific frontend domain
app.use(cors({
    origin: "https://smart-leads-dashboard-jqit.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(morgan("dev"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/export", exportRoutes);

// Health check route
app.get("/", (_req, res) => {
    res.send("Smart Leads Dashboard API Running");
});

export default app;