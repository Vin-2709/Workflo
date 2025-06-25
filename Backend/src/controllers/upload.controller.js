import taskmodel from '../models/task.js';
import { Uploadcloudinary } from '../utils/cloudinary.js';

export const adminUpload = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "No file" 
            });
        }

        const uploadedUrls = [];
        for (const file of req.files) {
            const result = await Uploadcloudinary(file.path);
            if (result?.secure_url) {
                uploadedUrls.push(result.secure_url);
            }
        }

        if (uploadedUrls.length === 0) {
            console.log(uploadedUrls.length);
            return res.status(500).json({ 
                success: false, 
                message: "Upload failed" 
            });
        }

        const task = await taskmodel.findById(req.params.taskId);
        task.adminFiles.push(...uploadedUrls);
        await task.save();

        res.json({ 
            success: true, 
            urls: uploadedUrls, 
            type: "admin" 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            success: false, 
            message: "Error" 
        });
    }
};

export const employeeUpload = async (req, res) => {
    try {
        console.log("Employee upload request received");
        console.log("Files received:", req.files?.length || 0);
        
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "No files uploaded" 
            });
        }

        const uploadedUrls = [];
        const failedUploads = [];

        for (const file of req.files) {
            console.log("Processing file:", file.filename, "at path:", file.path);
            
            const result = await Uploadcloudinary(file.path);
            if (result?.secure_url) {
                uploadedUrls.push(result.secure_url);
                console.log("Successfully uploaded:", result.secure_url);
            } else {
                failedUploads.push(file.filename);
                console.log("Failed to upload:", file.filename);
            }
        }

        if (uploadedUrls.length === 0) {
            console.log(uploadedUrls.length);
            return res.status(500).json({ 
                success: false, 
                message: "No files were uploaded to Cloudinary",
                failedFiles: failedUploads
            });
        }

        const task = await taskmodel.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ 
                success: false, 
                message: "Task not found" 
            });
        }

        task.employeeFiles.push(...uploadedUrls);
        await task.save();

        console.log("Files uploaded successfully:", uploadedUrls);
        res.json({ 
            success: true, 
            urls: uploadedUrls, 
            type: "employee",
            uploadedCount: uploadedUrls.length,
            failedCount: failedUploads.length
        });
    } catch (error) {
        console.error("Employee upload error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error uploading files: " + error.message 
        });
    }
};