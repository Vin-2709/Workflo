import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";



 // Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});
    
const Upload=async (localpath)=>{
    try {
        if(!localpath) return null;
        const response=await cloudinary.uploader.upload(localpath,{
            resource_type:"auto"
        })
        console.log("file upload on cloudinary");
        return response;
    } catch (error) {
        fs.unlinkSync(localpath)
        return null;
    }
}

export {Upload};