import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

const validate =
    (schema: ZodSchema) =>
        (
            req: Request,
            res: Response,
            next: NextFunction
        ): void => {
            const result = schema.safeParse({
                body: req.body,
            });

            if (!result.success) {
                res.status(400).json({
                    success: false,
                    errors: result.error.issues,
                });

                return;
            }

            next();
        };

export default validate;