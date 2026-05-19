import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}

export const rbac =
    (allowedRoles: string[]) =>
        (req: AuthRequest, res: Response, next: NextFunction) => {
            const userRole = req.user?.role;

            if (!userRole) {
                return res.status(403).json({
                    success: false,
                    message: "No role found",
                });
            }

            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied: insufficient permissions",
                });
            }

            next();
        };