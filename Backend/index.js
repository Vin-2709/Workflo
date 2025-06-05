
import dotenv from 'dotenv';
dotenv.config({});
import connectDB from "./utils/db.js";
import app from "./src/app.js";


app.listen("https://task-management-theta-pied.vercel.app",()=>{
    connectDB();
    console.log("server is running ");
})
