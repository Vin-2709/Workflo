import { timeStamp } from "console";
import mongoose from "mongoose";

const taskSchema=mongoose.Schema({
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"employee"
    },
    employee_name:String,
    assignedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"admin"
    },
    domain:{
        type:String
    },
    description:{
        type: String,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    status:{
      type:String,
      default:"Incompleted"
    },
    adminFiles:[String],
    employeeFiles:[String],
    AdminComments:String,
    EmployeeComments:String

},{timestamps:true})

const task=mongoose.model('task',taskSchema);
export default task;