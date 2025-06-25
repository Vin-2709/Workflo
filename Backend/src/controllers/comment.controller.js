import taskmodel from '../models/task.js';
import adminModel from '../models/admin.js';
import employeeModel from '../models/employee.js';

export const addAdminComment = async (req, res) => {
    try {
        const { comment } = req.body;
        const { taskId } = req.params;

        if (!comment || !comment.trim()) {
            return res.status(400).json({
                success: false,
                message: "Comment cannot be empty"
            });
        }

        const task = await taskmodel.findById(taskId);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        const admin = await adminModel.findById(req.user.userId);
        if (!admin || task.assignedBy.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "You don't have permission to comment on this task"
            });
        }

        const updatedTask = await taskmodel.findByIdAndUpdate(
            taskId,
            { AdminComments: comment.trim() },
            { new: true }
        ).populate('assignedTo assignedBy');

        res.status(200).json({
            success: true,
            message: "Admin comment added successfully",
            task: updatedTask
        });

    } catch (error) {
        console.error("Admin comment error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add admin comment: " + error.message
        });
    }
};

export const addEmployeeComment = async (req, res) => {
    try {
        const { comment } = req.body;
        const { taskId } = req.params;

        if (!comment || !comment.trim()) {
            return res.status(400).json({
                success: false,
                message: "Comment cannot be empty"
            });
        }

        const task = await taskmodel.findById(taskId);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        const employee = await employeeModel.findById(req.user.userId);
        if (!employee || task.assignedTo.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "You don't have permission to comment on this task"
            });
        }

        const updatedTask = await taskmodel.findByIdAndUpdate(
            taskId,
            { EmployeeComments: comment.trim() },
            { new: true }
        ).populate('assignedTo assignedBy');

        res.status(200).json({
            success: true,
            message: "Employee comment added successfully",
            task: updatedTask
        });

    } catch (error) {
        console.error("Employee comment error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add employee comment: " + error.message
        });
    }
};