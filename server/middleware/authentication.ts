import { UserModel } from "../models/users";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
    user?: {
        userId: string;
        username: string;
    };
}


export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Auth invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
        
        req.user = { userId: payload.userId as string, username: payload.name as string };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Auth invalid' });
    }
};
