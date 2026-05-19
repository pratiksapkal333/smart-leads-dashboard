import {
    Request,
    Response,
    NextFunction,
} from "express";

import jwt from "jsonwebtoken";

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                role: string;
            };
        }
    }
}

const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        // 1. Try to get token from Authorization header (Standard approach)
        let token = req.headers.authorization?.startsWith("Bearer ")
            ? req.headers.authorization.split(" ")[1]
            : undefined;

        // 2. FALLBACK: If no header, check query string (for CSV export via window.open)
        if (!token && req.query.token) {
            token = req.query.token as string;
        }

        if (!token) {
            res.status(401).json({
                success: false,
                message: "No token provided",
            });
            return;
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );

        req.user = decoded as {
            userId: string;
            role: string;
        };

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export default authMiddleware;