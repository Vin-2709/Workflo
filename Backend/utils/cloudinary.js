import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const Uploadcloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log("No file path provided");
            return null;
        }

        if (!fs.existsSync(localFilePath)) {
            console.log("File does not exist at path:", localFilePath);
            return null;
        }
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            console.error("Missing Cloudinary environment variables");
            return null;
        }

        console.log("Uploading file to Cloudinary:", localFilePath);
        
        // Uploading file to Cloudinary 
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "task-management",
            timeout: 60000, 
        });

        console.log("Cloudinary upload successful:", response.secure_url);
        
        try {
            fs.unlinkSync(localFilePath);
            console.log("Local file deleted:", localFilePath);
        } catch (deleteError) {
            console.log("Warning: Could not delete local file:", deleteError.message);
        }

        return response;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        console.error("Error details:", {
            message: error.message,
            http_code: error.http_code,
            error_code: error.error?.code,
            api_key: process.env.CLOUDINARY_API_KEY,
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME 
        });
        
        // remove local file even if upload failed
        try {
            if (localFilePath && fs.existsSync(localFilePath)) {
                fs.unlinkSync(localFilePath);
                console.log("Local file deleted after failed upload");
            }
        } catch (deleteError) {
            console.log("Could not delete local file after failed upload:", deleteError.message);
        }
        
        return null;
    }
};