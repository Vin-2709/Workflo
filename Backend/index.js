
import dotenv from 'dotenv';
dotenv.config({});
import connectDB from "./utils/db.js";
import app from "./src/app.js";

PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    connectDB();
    console.log("server is running ");
})
