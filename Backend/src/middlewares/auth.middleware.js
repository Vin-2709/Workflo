import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const isLogged = (req, res, next) => {
    if (!req.cookies.token) {
        console.log("No token found");
        return res.status(401).json({
            message: "Please login",
            success: false
        });
    }
    
    try {
        let data = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
        console.log("Token verified successfully");
        req.user = data;
        next();
    } catch (error) {
        console.log("JWT verification failed:", error.message);
        return res.status(401).json({
            message: "Invalid token",
            success: false
        });
    }
};