import jwt from "jsonwebtoken";

interface TokenPayload {
    userId: string;
    role: string;
}

const generateToken = ({
    userId,
    role,
}: TokenPayload): string => {
    return jwt.sign(
        { userId, role },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "7d",
        }
    );
};

export default generateToken;