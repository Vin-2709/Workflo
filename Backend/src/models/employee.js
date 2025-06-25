import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String,
    task:[{type:mongoose.Schema.Types.ObjectId,ref:"task"}],
    domain:String

    

}
);

const employee=mongoose.model('employee',userSchema);
export default employee;