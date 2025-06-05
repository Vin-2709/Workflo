import React,{useState,useEffect} from 'react';

const CompletedTask=({data})=>{
   const count = data.filter(task => task.status === "Completed").length;
  

    return (
        <div className='hover:translate-y-2 transition-transform duration-300  hover:cursor-pointer border-t-6 border-yellow-400 bg-blue-100  w-[24%] h-[130px] shadow-lg  text-yellow-600 text-center rounded-2xl p-2 text-[27px] font-semibold  shadow-blue-900'>
            <h1>Completed Tasks</h1>
            <h1 className='font-bold mt-3 text-[30px]'>{count}</h1>
        </div>
    )
}

export default CompletedTask