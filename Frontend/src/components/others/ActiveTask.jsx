import React,{useState,useEffect} from 'react';

const ActiveTasks=({data})=>{
    const count = data.filter(task => task.status === "Pending").length;

    return (
       <div className='hover:translate-y-2 transition-transform duration-300 hover:cursor-pointer bg-blue-100  border-t-6 border-green-500 w-[24%] h-[130px] shadow-lg  text-green-600 text-center rounded-2xl p-2 text-[27px] font-semibold  shadow-blue-900'>
            <h1>Active Tasks</h1>
            <h1 className='font-bold mt-3 text-[30px]'>{count}</h1>
        </div>
    )
}
export default ActiveTasks