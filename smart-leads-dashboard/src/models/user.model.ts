import mongoose, { Schema, Model } from "mongoose";
import { IUser, UserRole } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.SALES,
        },
    },
    {
        timestamps: true,
    }
);

const User: Model<IUser> = mongoose.model<IUser>(
    "User",
    userSchema
);

export default User;