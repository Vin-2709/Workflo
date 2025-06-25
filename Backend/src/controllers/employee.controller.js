import employeeModel from '../models/employee.js';
import taskmodel from '../models/task.js';

export const getEmployeeProfile = async (req, res) => {
    try {
        const user = await employeeModel.findById(req.params.id);
        const tasks = await taskmodel.find({assignedTo: req.params.id})
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

export const getEmployeeTasks = async (req, res) => {
    try {
        const tasks = await taskmodel.find({
            assignedTo: req.params.id,
        }).populate('assignedBy').sort({ createdAt: -1 });

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