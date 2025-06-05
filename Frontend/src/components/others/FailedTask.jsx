import React,{useState,useEffect} from 'react';

const FailedTask=({data})=>{
    const count = data.filter(task => task.status === "Failed").length;

    return (
      <div className='hover:translate-y-2 transition-transform duration-300 hover:cursor-pointer bg-blue-100  border-t-6 border-red-500 w-[24%] h-[130px] shadow-lg  text-red-700 text-center rounded-2xl p-2 text-[27px] font-semibold  shadow-blue-900'>
            <h1>Failed Tasks</h1>
            <h1 className='font-bold mt-3 text-[30px]'>{count}</h1>
        </div>
    )
}

export default FailedTask