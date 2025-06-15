import React, { useState, useEffect } from 'react'
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronsDown } from 'lucide-react';


const Dashboard = ({openModal}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [admin, setAdmin] = useState(null);


    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {

            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/${id}`);
            if (response.data.success) {
                setAdmin(response.data.user);
                setTasks(response.data.tasks);
            }
        } catch (error) {
            console.log("Error occured");
        }
    }




const deletetask = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/delete/${id}`);
    console.log(response);

    if (response.data.success) {
        setTasks(tasks.filter(task => task._id !== id));
    }

}

const statusUpdate=async(id,status) => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/taskstatusupdate/${id}`,{
        Status: status
    });
    console.log(response);
    if (response.data.success) {
        
        setTasks(tasks.map(task => task._id === id ? { ...task, status: response.data.Status } : task));
    }
    else{
        console.log("Error updating status");
    }
}



return (
    <div className='flex flex-col   w-[100%]   py-6 shadow-xl text-white   mt-15'>

        <div className='flex justify-center gap-3'>
            <h1 className=' text-white  font-serif text-[35px] font-bold text-center mt-8 [text-shadow:2px_2px_8px_rgba(0,0,0,0.7)]' >All Tasks</h1>
            <ChevronsDown size={40} className='mt-10'/>
        </div>
        
        <div className="rounded-2xl overflow-hidden flex justify-center mt-7">
            <table class="w-[98%]  ">

                <thead class="bg-radial-[at_50%_75%] from-blue-500  to-blue-800 to-90% text-white rounded-md w-full">
                    <tr>
                        <th class="px-4 py-3 text-left font-semibold min-w-[150px]">Employee's Name</th>
                        <th class="px-4 py-3 text-left font-semibold min-w-[200px]">Employee Email</th>
                        <th class="px-4 py-3 text-left font-semibold min-w-[120px]">Domain</th>
                        <th class="px-4 py-3 text-center font-semibold min-w-[250px]">Description</th>
                        <th class="px-4 py-3 text-left font-semibold min-w-[180px]">Deadline</th>
                        <th class="px-4 py-3 text-left font-semibold min-w-[100px]">Status</th>
                        <th class="px-4 py-3 text-left font-semibold min-w-[100px]">Actions</th>
                        <th class="px-4 py-3 text-left font-semibold min-w-[100px]">Manage Files</th>
                        <th class="px-4 py-3 text-left font-semibold min-w-[100px]">Submission Review</th>
                    </tr>
                </thead>




                {tasks.length === 0 ? (
                    <div className="w-full  flex justify-center items-center py-8   ml-112  ">
                        <p className="text-3xl text-black font-serif text-[23px] font-bold text-center mb-3 ">No tasks</p>
                    </div>


                ) : (
                    <tbody class="bg-indigo-950 text-white ">
                        {tasks.map((task) => (
                            <tr class="border-b border-gray-500">
                                <td class="px-4 py-3">{task.assignedTo?.name || 'N/A'}</td>
                                <td class="px-4 py-3">{task.assignedTo?.email || 'N/A'}</td>
                                <td class="px-4 py-3">{task.domain || 'N/A'}</td>
                                <td class="px-4 py-3 ">{task.description || 'N/A'}</td>
                                <td class="px-4 py-3">{new Date(task.deadline).toLocaleDateString('en-GB') || 'N/A'}</td>
                                <td class="px-4 py-3 font-semibold">{task.status || 'N/A'}</td>
                                <td><div className='flex flex-col gap-3 p-3'>
                                    <button onClick={() => navigate(`/edit-task/${task._id}`)} className='bg-blue-600 hover:bg-blue-700 w-17 rounded-md mr-2 cursor-pointer p-1 '>Edit</button>
                                    <button onClick={() => deletetask(task._id)} className='bg-red-700 hover:bg-red-800 w-17 rounded-md mr-2 cursor-pointer p-1'>Delete</button>
                                </div></td>
                                <td>
                                    <div className='flex flex-col  gap-3 p-3'>
                                 <button onClick={() => openModal(task)} className='bg-blue-500 hover:bg-blue-800 w-25  rounded-md ml-2 mr-3 cursor-pointer p-1 text-[14px] '>View & Manage Files</button>
                                 </div>
                                </td>
                                  <td><div className='flex flex-col gap-3 p-3'>
                                    <button onClick={() => statusUpdate(task._id,"Completed")} className='bg-green-600 hover:bg-green-800 w-20 rounded-md mr-2 cursor-pointer p-1'>Accept</button>
                                    <button onClick={() => statusUpdate(task._id,"Failed")} className='bg-red-700 hover:bg-red-800 w-20 rounded-md mr-2 cursor-pointer p-1'>Reject</button>
                                </div></td>
                            </tr>
                        ))}
                    </tbody>
                )
                }


            </table>
        </div>



    </div>

)
}

export default Dashboard;
