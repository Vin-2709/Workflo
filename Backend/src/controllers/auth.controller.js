import employeeModel from '../models/employee.js';
import adminModel from '../models/admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
    try {
        let {name, email, password, dob, role, domain} = req.body;
        if (!name || !email || !password || !role || !domain) {
            return res.status(401).json({
                message: "Please fill all the input fields",
                success: false
            });
        }

        const userexistsInemployee = await employeeModel.findOne({email});
        const userexistsInadmin = await adminModel.findOne({email});
        const user = userexistsInemployee || userexistsInadmin;

        if (user) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            });
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        let createduser;

        if (role.toLowerCase() === "admin") {
            createduser = await adminModel.create({
                name,
                email,
                password: hashedpassword,
                role,
            });
        }

        if (role.toLowerCase() === "employee") {
            createduser = await employeeModel.create({
                name,
                email,
                password: hashedpassword,
                role,
                domain
            });
        }

        if (createduser) {
            return res.status(200).json({
                message: "Account created , Please log in !",
                success: true,
            });
        }

        return res.status(400).json({
            message: "User not created ",
            success: false,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export const login = async (req, res) => {
    try {
        let {email, password, role} = req.body;
        let user;

        console.log("Login attempt:", { email, role }); // Debug log

        if (role.toLowerCase() === "admin") {
            user = await adminModel.findOne({email});
        } else if (role.toLowerCase() === "employee") {
            user = await employeeModel.findOne({email});
        }
        
        console.log("User found:", user); // Debug log

        if (!user) {
            console.log("User not found for email and role"); // Debug log
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const passmatch = await bcrypt.compare(password, user.password);
        if (!passmatch) {
            console.log("Password mismatch"); // Debug log
            return res.status(404).json({
                message: "Incorrect email or password ! ",
                success: false
            });
        }

        if (user.role.trim().toLowerCase() !== role.trim().toLowerCase()) {
            console.log("Role mismatch"); 
            return res.status(404).json({
                message: "User not found with this role",
                success: false
            });
        }

        const tokenData = {
            userId: user._id
        };

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: '1d'});

        console.log("Login successful, returning user:", user);

        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        }).json({
            message: "User found",
            success: true,
            user,
            userId: user._id
        });
        
    } catch (error) {
        console.log("Login error:", error); 
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: false,      
            sameSite: 'lax'   
        });
        
        res.status(200).json({
            message: "Logged out ",
            success: true
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};