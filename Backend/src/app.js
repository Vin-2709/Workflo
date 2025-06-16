import express from 'express';
import employeeModel from '../models/employee.js';
import taskmodel from '../models/task.js';
import cors from 'cors';
import adminModel from '../models/admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieparser from 'cookie-parser'
import { Uploadmulter } from './middlewares/multer.js';
import { Uploadcloudinary} from '../utils/cloudinary.js'



dotenv.config();
const app=express();
app.use(cors({
  origin: true,
  credentials: true               
}));
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    console.log("hi this is home page");    
})


app.post('/register', async (req,res)=>{
    try {
        let {name,email,password,dob,role,domain}=req.body;
        if(!name || !email || !password || !role  ||!domain) return res.status(401).json({
            message:"Please fill all the input fields",
            success:false
        })

        const userexistsInemployee=await employeeModel.findOne({email}) 
        const userexistsInadmin=await adminModel.findOne({email}) 
        const user=userexistsInemployee || userexistsInadmin
        

        if(user) return res.status(400).json({
            message:"User already exists with this email",
            success:false
        })
        const hashedpassword= await bcrypt.hash(password,10);
        let createduser;
        if (role.toLowerCase() === "admin") {
           createduser=await adminModel.create({
            name,
            email,
            password:hashedpassword,
            role,
            
        })
        }
       if (role.toLowerCase() === "employee") {
            createduser=await employeeModel.create({
            name,
            email,
            password:hashedpassword,
            role,
            domain
        })
        }
        if(createduser) return res.status(200).json({
            message:"Account created , Please log in !",
            success:true,
        })
        return  res.status(400).json({
            message:"User not created ",
            success:true,
        })
        
        
    } catch (error) {
        console.log(error);
    }
});

app.get('/logout/:id',async(req,res)=>{
    try {

        res.clearCookie('token', {
            httpOnly: true,
            secure: false,      
            sameSite: 'lax'   
        });
        res.status(200).json({
            message:"Logged out ",
            success:true
        })

        
    } catch (error) {
        console.log(error);
    }
})

app.post('/login', async (req,res)=>{
    try {
        let {email,password,role} =req.body;
        let user;
        if(role.toLowerCase()==="admin"){
           user= await adminModel.findOne({email});
        }
        else if(role.toLowerCase()==="employee"){
           user= await employeeModel.findOne({email});
        }
        
        if(!user) return res.status(404).json({
            message:"User not found",
            success:false
        });
        const passmatch=await bcrypt.compare(password,user.password)
        if(!passmatch) return res.status(404).json({
            message:"Incorrect email or password ! ",
            success:false
        });
        if(user.role.trim().toLowerCase() !== role.trim().toLowerCase()) return res.status(404).json({
            message:"User not found with this role",
            success:false
        });

        const tokenData={
            userId:user._id
        }

        const token= await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});

        
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'none',secure:true}).json({
            message:"User found",
            success:true,
            user,
            userId:user._id         //sending data to frontend
        })
        
    } catch (error) {
       console.log(error);
       return res.status(500).json({
           message:"Server error",
           success:false
       });
    }
})

//middleware
const isLogged =(req,res,next)=>{
    if(!req.cookies.token) {
        console.log("No token found");
        return res.status(401).json({
            message:"Please login",
            success:false
        });
    }
    
    try {
        let data=jwt.verify(req.cookies.token,process.env.SECRET_KEY);
        console.log("Token verified successfully");
        req.user=data;
        next();
    } catch (error) {
        console.log("JWT verification failed:", error.message);
        return res.status(401).json({
            message:"Invalid token",
            success:false
        });
    }
}


app.get('/admin/:id', isLogged,async (req,res)=>{
    try {
        const user = await adminModel.findById(req.params.id);
        const tasks=await taskmodel.find({assignedBy:req.params.id}).populate('assignedTo').sort({ createdAt: -1 });;
        if(!user) return res.status(404).json({
            message:"User not found",
            success:false
        });
        
        return res.status(200).json({
            message:"User found",
            success:true,
            user,
            tasks
        })
        
    } catch (error) {
       console.log(error);
       return res.status(500).json({
           message:"Server error",
           success:false
       });
    }
})

app.get('/employee/:id',isLogged, async (req,res)=>{
    try {
        const user = await employeeModel.findById(req.params.id);
        const tasks=await taskmodel.find({assignedTo:req.params.id}).populate('assignedTo').sort({ createdAt: -1 });;
        if(!user) return res.status(404).json({
            message:"User not found",
            success:false
        });
        
        return res.status(200).json({
            message:"User found",
            success:true,
            user,
            tasks
        })
        
    } catch (error) {
       console.log(error);
       return res.status(500).json({
           message:"Server error",
           success:false
       });
    }
})



//    
app.post('/admin/:id/assigntask', isLogged,  Uploadmulter.array("files", 5), async (req, res) => {
    try {
        let { name, email, domain, description, deadline } = req.body;
        if (!name || !email || !description || !domain || !deadline) return res.status(401).json({
            message: "Please fill all the input fields",
            success: false
        });

        const employee = await employeeModel.findOne({ email });
        if (!employee || employee.role === 'admin') return res.status(400).json({
            message: "Employee not found",
            success: false
        });

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
        return res.status(500).json({ message: "Server error", success: false });
    }
});

app.post('/taskstatusupdate/:id' ,isLogged,async (req,res)=>{
       let{Status}=req.body;
       const update=await taskmodel.findOneAndUpdate(
        {_id:req.params.id},{status:Status},{new:true}
       ).sort({createdAt:-1});  
       return res.status(200).json({
        message:"updated status",
        success:true,
        Status:update.status
        })
})

app.get('/admin/gettask/:id',isLogged,async(req,res)=>{
    try {
       const tasks=await taskmodel.find({
        assignedBy:req.params.id,
    }).sort({ createdAt: -1 });;
    if(tasks) res.status(200).json({
        message:"Tasks found",
        success:true,
        tasks
    })
    else if(!tasks) res.status(400).json({
        message:"No tasks found",
        success:false
    })  
    } catch (error) {
        console.log(error)
    }
   
})


app.get('/gettask/:id',isLogged,async(req,res)=>{
    try {
       const tasks=await taskmodel.find({
        assignedTo:req.params.id,
    }).populate('assignedBy').sort({ createdAt: -1 });;
    if(tasks) res.status(200).json({
        message:"Tasks found",
        success:true,
        tasks
    })
    else if(!tasks) res.status(400).json({
        message:"No tasks found",
        success:false
    })  
    } catch (error) {
        console.log(error)
    }
   
})


app.get("/task/:id",isLogged,async (req,res)=>{
    let task=await taskmodel.findOne({
        _id:req.params.id
    }).populate('assignedTo');
    if(task) res.status(200).json({
        success:true,
        task
    })
    else if(!task) res.status(400).json({
        message:"No Task exists",
        success:false,
    })
})

app.get("/delete/:id",isLogged,async (req,res)=>{
    let task= await taskmodel.findOneAndDelete({
        _id:req.params.id
    })
    if(task) return res.status(200).json({
        message:"Successfully deleted",
        success:true
    })
    return res.status(400).json({
        message:"Error occured",
        success:false
    })


})

app.put('/edit-task/:id',isLogged,  async (req, res) => {
    try {
        const { id } = req.params;
        const { domain, deadline, description, } = req.body;
        
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
});



// Upload file by admin
app.post("/admin-upload/:taskId", isLogged,  Uploadmulter.array("files", 5), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) return res.status(400).json({ success: false, message: "No file" });

        const uploadedUrls = [];
        for (const file of req.files) {
            const result = await Uploadcloudinary(file.path);
            if (result?.secure_url) {
                uploadedUrls.push(result.secure_url);
            }
        }

        if (uploadedUrls.length === 0) {
          console.log(uploadedUrls.length);
          return res.status(500).json({ success: false, message: "Upload failed" });
        }

        const task = await taskmodel.findById(req.params.taskId);
        task.adminFiles.push(...uploadedUrls);
        await task.save();

        res.json({ success: true, urls: uploadedUrls, type: "admin" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
});

// Upload file by employee
app.post("/employee-upload/:taskId", isLogged, Uploadmulter.array("files", 5), async (req, res) => {
  try {
    console.log("Employee upload request received");
    console.log("Files received:", req.files?.length || 0);
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
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
      return res.status(404).json({ success: false, message: "Task not found" });
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
});


export default app;
