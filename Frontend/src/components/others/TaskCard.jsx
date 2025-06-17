import React ,{useState,useEffect}from 'react'
import './taskcard.css';
import axios from 'axios';

const TaskCard= ({data,onstatusUpdate,openModal})=>{
    const[status,setStatus]=useState(data.status);
    const [selectedFiles, setSelectedFiles] = useState([]);
    useEffect(()=>{
        setStatus(data.status);
    },[data.status]);
    
    const statusUpdate= async(newStatus)=>{
          setStatus(newStatus);
        
         if(onstatusUpdate) {
             onstatusUpdate(data._id, newStatus);
         }
         
        
         const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/taskstatusupdate/${data._id}`,{
            Status:newStatus,
         });
         console.log(response);
    }

    const handleUpload = async () => {
        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append("files", file); 
        });

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/employee-upload/${data._id}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );
            alert("Files uploaded successfully!");
            setSelectedFiles([]);
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        }
    };

  

     return (
        <div className='flex flex-col bg-gray-200 text-black m-2 p-4 min-h-[650px] rounded-lg min-w-[400px] shadow-lg shadow-blue-700 mt-8 hover:scale-105 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-out cursor-pointer'>
            
            {/* Task Details Section */}
            <div className='flex flex-col p-2 flex-1'>
                <h1 className='font-bold text-lg'>Domain: {data.domain}</h1>
                
                <div className='mt-3'>
                    <span className='font-bold'>Description:</span>
                    <p className='text-[16px] mt-1 text-gray-700 line-clamp-4'>
                        {data.description}
                    </p>
                </div>
                
                <h1 className='font-bold mt-3'>
                    Deadline: {new Date(data.deadline).toLocaleDateString('en-GB')}
                </h1>
                
                <h1 className='font-bold mt-3'>
                    Status: <span className={`${
                        status === 'Completed' ? 'text-green-600' : 
                        status === 'Failed' ? 'text-red-600' : 
                        'text-yellow-600'
                    }`}>{status}</span>
                </h1>
                
                <h1 className='font-bold mt-3'>
                    Assigned by: {data.assignedBy?.name || 'Unknown'}
                </h1>
            </div>

            {/* Action Buttons Section */}
            <div className='flex justify-between items-center gap-4 mt-2 pt-2 border-t border-gray-200'>
                
                {/* Status Update Button */}
              <div className='flex '>
                {status === "Failed" ? (
                   <div className="w-full text-center py-2 f">
                   <span className=" ml-25  bg-red-700 text-white px-4 py-2 rounded-md font-medium">
                    Task Failed
                    </span>
               </div>
                    ) : status !== "Completed" ? (
                        <button
                            onClick={() => statusUpdate("Completed")}
                            className='bg-green-600 hover:bg-green-700 w-[135px] text-white px-1 py-2 rounded-md shadow-md transition-colors duration-200 text-[14px] cursor-pointer'
                        >
                            Mark as Completed
                        </button>
                    ) : (
                        <button
                            onClick={() => statusUpdate("Pending")}
                            className='bg-blue-400 hover:bg-blue-500 w-[135px] text-white px-1 py-2 rounded-md shadow-md transition-colors duration-200 text-[14px] cursor-pointer'
                        >
                            Mark as Pending
                        </button>
                    )}
                </div>

                
                {status !== "Failed" && (
                    <button onClick={()=>{openModal(data)}}
                        className='bg-blue-800 hover:bg-blue-900 text-white px-2 py-2 rounded-md shadow-md transition-colors duration-200 cursor-pointer text-[14px]'
                    > Manage Files
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskCard;