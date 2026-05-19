import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import generateToken from "../utils/generateToken";

export const registerUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(400).json({
                success: false,
                message: "User already exists",
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "Sales User", // Fallback safety
        });

        const token = generateToken({
            userId: user._id.toString(),
            role: user.role,
        });

        // 💡 Map _id to id so frontend can read 'user.id' seamlessly
        const userResponse = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        };

        res.status(201).json({
            success: true,
            token,
            user: userResponse,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Registration failed",
            error,
        });
    }
};

export const loginUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
            return;
        }

        const token = generateToken({
            userId: user._id.toString(),
            role: user.role,
        });

        // 💡 Map _id to id here as well to fix the runtime session initialization
        const userResponse = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        };

        res.status(200).json({
            success: true,
            token,
            user: userResponse,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed",
            error,
        });
    }
};