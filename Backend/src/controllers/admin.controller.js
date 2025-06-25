import adminModel from '../models/admin.js';
import employeeModel from '../models/employee.js';
import taskmodel from '../models/task.js';
import { Uploadcloudinary } from '../utils/cloudinary.js';

export const getAdminProfile = async (req, res) => {
    try {
        const user = await adminModel.findById(req.params.id);
        const tasks = await taskmodel.find({assignedBy: req.params.id})
            .populate('assignedTo')
            .sort({ createdAt: -1 });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        
        return res.status(200).json({
            message: "User found",
            success: true,
            user,
            tasks
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export const assignTask = async (req, res) => {
    try {
        let { name, email, domain, description, deadline } = req.body;
        
        if (!name || !email || !description || !domain || !deadline) {
            return res.status(401).json({
                message: "Please fill all the input fields",
                success: false
            });
        }

        const employee = await employeeModel.findOne({ email });
        if (!employee || employee.role === 'admin') {
            return res.status(400).json({
                message: "Employee not found",
                success: false
            });
        }

        let fileUrls = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await Uploadcloudinary(file.path);
                if (result?.secure_url) fileUrls.push(result.secure_url);
            }
        }

        const taskcreated = await taskmodel.create({
            assignedBy: req.params.id,
            assignedTo: employee._id,
            domain,
            description,
            deadline,
            status: "Pending",
            adminFiles: fileUrls,
            employeeFiles: []
        });

        return res.status(200).json({
            message: "Task Assigned",
            success: true,
            taskcreated
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: "Server error", 
            success: false 
        });
    }
};

export const getAdminTasks = async (req, res) => {
    try {
        const tasks = await taskmodel.find({
            assignedBy: req.params.id,
        }).sort({ createdAt: -1 });

        if (tasks) {
            res.status(200).json({
                message: "Tasks found",
                success: true,
                tasks
            });
        } else {
            res.status(400).json({
                message: "No tasks found",
                success: false
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};