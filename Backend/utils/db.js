import mongoose from 'mongoose';

const connectDB= async ()=>{
   try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(process.env.MONGO_URI);
    console.log("mongo connected")
    
   } catch (error) {
     console.error(error);
   }
}

export default connectDB;