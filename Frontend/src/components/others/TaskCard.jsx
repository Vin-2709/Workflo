// import React ,{useState,useEffect}from 'react'
// import './taskcard.css';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';


// const TaskCard= ({data,onstatusUpdate})=>{
//     const[status,setStatus]=useState(data.status);

    

//     useEffect(()=>{
//         setStatus(data.status);
//     },[data.status]);
    
//     const statusUpdate= async(newStatus)=>{
//          setStatus(newStatus)
//          const response=await axios.post(`http://localhost:5000/taskstatusupdate/${data._id}`,{
//             Status:status,
           
//          });
//          console.log(response);
//          if(onstatusUpdate) {
//              onstatusUpdate(data._id, status);
//          }
//     }
  

//     return (
//         <div className= ' flex flex-col justify-between bg-blue-200 text-black m-2 p-4 h-auto rounded-md w-[350px] shadow-md shadow-blue-200 '>
//             <h1 className='font-bold'>Domain  : {data.domain}</h1>
//             <p className='text-wrap mt-2'>Description :  {data.description}</p>
//             <h1 className='font-bold mt-2' >Deadline : {new Date(data.deadline).toLocaleDateString()}</h1>
//             <h1 className='font-bold mt-2'>Status : {status}</h1>
//             <h1 className='font-bold mt-2'>Assigned by : {data.assignedBy?.name || 'Unknown'}</h1>
//             <div className='flex justify-between mt-3 '>
//                 {data.status!="Completed"? (<button onClick={()=>{setStatus("Completed")}} className='bg-green-600 text-white p-[2px] w-25 rounded-md shadow-md shadow-green-900 h-11 text-[14px] cursor-pointer '>Mark as Completed</button>):(<button onClick={()=>{setStatus("Pending")}} className='bg-yellow-500 text-white p-[2px] w-25 rounded-md shadow-md shadow-green-900 h-11 text-[14px] cursor-pointer '> Mark As Pending</button>)}  
//                 {data.status!="Failed" ? <button onClick={()=>{setStatus("Failed")}} className='bg-red-600 text-white p-[3px] w-25 rounded-md shadow-md shadow-red-900 h-11 text-[14px] cursor-pointer'>Mark as Failed</button>:(<button onClick={()=>{setStatus("Pending")}} className='bg-red-800 text-white p-[3px] w-25 rounded-md shadow-md shadow-red-900 h-11 text-[14px] cursor-pointer'>Undo Failure</button>)}
//             </div>
//         </div>
//     )
// }

// export default TaskCard;


// // import React ,{useState,useEffect}from 'react'
// // import './taskcard.css';
// // import axios from 'axios';

// // const TaskCard= ({data})=>{
// //     const[status,setStatus]=useState(data.status);

// //     useEffect(()=>{
// //         setStatus(data.status);
// //     },[data.status]);
    
// //     const statusUpdate= async(newStatus)=>{
// //          setStatus(newStatus);
// //          const response=await axios.post(`http://localhost:5000/taskstatusupdate/${data._id}`,{
// //             Status:newStatus,
// //          });
// //          console.log(response);
// //     }

// //     return (
// //         <div className= ' flex flex-col justify-between bg-blue-200 text-black m-2 p-4 h-auto rounded-md w-[350px] shadow-md shadow-blue-200 '>
// //             <h1 className='font-bold'>Domain  : {data.domain}</h1>
// //             <p className='text-wrap mt-2'>Description :  {data.description}</p>
// //             <h1 className='font-bold mt-2' >Deadline : {new Date(data.deadline).toLocaleDateString()}</h1>
// //             <h1 className='font-bold mt-2'>Status : {status}</h1>
// //             <h1 className='font-bold mt-2'>Assigned by : {data.assignedBy?.name || 'Unknown'}</h1>
// //             <div className='flex justify-between mt-3 '>
// //                 {status!="Completed"? (<button onClick={()=>statusUpdate("Completed")} className='bg-green-600 text-white p-[2px] w-25 rounded-md shadow-md shadow-green-900 h-11 text-[14px] cursor-pointer '>Mark as Completed</button>):(<button onClick={()=>statusUpdate("Pending")} className='bg-yellow-500 text-white p-[2px] w-25 rounded-md shadow-md shadow-green-900 h-11 text-[14px] cursor-pointer '> Mark As Pending</button>)}  
// //                 {status!="Failed" ? <button onClick={()=>statusUpdate("Failed")} className='bg-red-600 text-white p-[3px] w-25 rounded-md shadow-md shadow-red-900 h-11 text-[14px] cursor-pointer'>Mark as Failed</button>:(<button onClick={()=>statusUpdate("Pending")} className='bg-red-800 text-white p-[3px] w-25 rounded-md shadow-red-900 h-11 text-[14px] cursor-pointer'>Undo Failure</button>)}
// //             </div>
// //         </div>
// //     )
// // }

// // export default TaskCard;

import React ,{useState,useEffect}from 'react'
import './taskcard.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import dotenv from 'dotenv';
dotenv.config({});


const TaskCard= ({data,onstatusUpdate})=>{
    const[status,setStatus]=useState(data.status);

    

    useEffect(()=>{
        setStatus(data.status);
    },[data.status]);
    
    const statusUpdate= async(newStatus)=>{
          setStatus(newStatus);
         
         // Update parent state immediately for UI responsiveness
         if(onstatusUpdate) {
             onstatusUpdate(data._id, newStatus);
         }
         
        
         const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/taskstatusupdate/${data._id}`,{
            Status:newStatus,
         });
         console.log(response);
    }
  

    return (
        <div className= ' flex flex-col justify-between  bg-blue-200 text-black m-2 p-4 h-[380px] rounded-lg min-w-[400px] shadow-lg shadow-blue-700 mt-8  hover:scale-105 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer'>
            <div className='flex  flex-col p-2'>
            <h1 className='font-bold '>Domain  : {data.domain}</h1>
                <p className='text-wrap mt-3'> 
                    <span className='font-bold'>Description :</span>
                    <span className='block'>{data.description}</span>
                </p>
            <h1 className='font-bold mt-3' >Deadline : {new Date(data.deadline).toLocaleDateString('en-GB')}</h1>
            <h1 className='font-bold mt-3'>Status : {status}</h1>
            <h1 className='font-bold mt-3'>Assigned by : {data.assignedBy?.name || 'Unknown'}</h1>
            </div>
            <div className='flex justify-center gap-30 mt-3 '>
                {status=="Failed"?(
                    <div className='flex justify-center'>
                        <div className=' h-7 w-24 bg-red-600 text-white text-center rounded-md'><h1>Failed</h1></div>
                    </div>
                    
                ):(<>
                {status!="Completed" && status!="Failed"? (<button onClick={()=>statusUpdate("Completed")} className='bg-green-600 text-white p-[2px] w-25 rounded-md shadow-md shadow-green-900 h-11 text-[14px] cursor-pointer '>Mark as Completed</button>):(<button onClick={()=>statusUpdate("Pending")} className='bg-yellow-500 text-white p-[2px] w-25 rounded-md shadow-md shadow-green-900 h-11 text-[14px] cursor-pointer '> Mark As Pending</button>)}  
                {status!="Failed" ? (<button onClick={()=>statusUpdate("Failed")} className='bg-red-600 text-white p-[3px] w-25 rounded-md shadow-md shadow-red-900 h-11 text-[14px] cursor-pointer' >Mark as Failed</button>):(<button  className='bg-red-800 text-white p-[3px] w-25 rounded-md shadow-red-900 h-11 text-[14px] '>Failed</button>)}</>)}
            </div>
        </div>
    )
}


export default TaskCard;
