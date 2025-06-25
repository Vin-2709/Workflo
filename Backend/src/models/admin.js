import mongoose from "mongoose";

const adminSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String,
    employees:[{type:mongoose.Schema.Types.ObjectId,ref:"employee"}],
    tasks:[{type:mongoose.Schema.Types.ObjectId, ref:"task"}]
}
);

const admin=mongoose.model('admin',adminSchema);
export default admin;