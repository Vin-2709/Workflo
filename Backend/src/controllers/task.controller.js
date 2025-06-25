import taskmodel from '../models/task.js';
import employeeModel from '../models/employee.js';
import adminModel from '../models/admin.js';

export const updateTaskStatus = async (req, res) => {
    try {
        let { Status } = req.body;
        const update = await taskmodel.findOneAndUpdate(
            {_id: req.params.id},
            {status: Status},
            {new: true}
        ).sort({createdAt: -1});
        
        return res.status(200).json({
            message: "updated status",
            success: true,
            Status: update.status
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export const getTaskById = async (req, res) => {
    try {
        let task = await taskmodel.findOne({
            _id: req.params.id
        }).populate('assignedTo');

        if (task) {
            res.status(200).json({
                success: true,
                task
            });
        } else {
            res.status(400).json({
                message: "No Task exists",
                success: false,
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

export const deleteTask = async (req, res) => {
    try {
        let task = await taskmodel.findOneAndDelete({
            _id: req.params.id
        });

        if (task) {
            return res.status(200).json({
                message: "Successfully deleted",
                success: true
            });
        }
        
        return res.status(400).json({
            message: "Error occurred",
            success: false
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export const editTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { domain, deadline, description } = req.body;
        
        const updatedTask = await taskmodel.findByIdAndUpdate(
            id,
            { 
                domain, 
                deadline, 
                description, 
                status: "Pending"  
            },
            { new: true }
        );
        
        if (updatedTask) {
            res.json({ success: true, task: updatedTask });
        } else {
            res.json({ success: false, message: 'Task not found' });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getTaskWithComments = async (req, res) => {
    try {
        const { taskId } = req.params;
        
        const task = await taskmodel.findById(taskId)
            .populate('assignedTo', 'name email domain')
            .populate('assignedBy', 'name email');

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        const user = await employeeModel.findById(req.user.userId) || 
                     await adminModel.findById(req.user.userId);
        
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "User not found"
            });
        }

        const hasPermission = (
            task.assignedTo._id.toString() === req.user.userId ||
            task.assignedBy._id.toString() === req.user.userId
        );

        if (!hasPermission) {
            return res.status(403).json({
                success: false,
                message: "You don't have permission to view this task"
            });
        }

        res.status(200).json({
            success: true,
            task
        });

    } catch (error) {
        console.error("Get task error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch task: " + error.message
        });
    }
};