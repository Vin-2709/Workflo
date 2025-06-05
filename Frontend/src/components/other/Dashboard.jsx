import React, { useState, useEffect } from 'react'
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useParams, useNavigate } from 'react-router-dom';



const Dashboard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [admin, setAdmin] = useState(null);


    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {

            const response = await axios.get(`https://task-management-theta-pied.vercel.app/admin/${id}`);
            if (response.data.success) {
                setAdmin(response.data.user);
                setTasks(response.data.tasks);
            }
        } catch (error) {
            console.log("Error occured");
        }
    }




const deletetask = async (id) => {
    const response = await axios.get(`https://task-management-theta-pied.vercel.app/delete/${id}`);
    console.log(response);

    if (response.data.success) {
        setTasks(tasks.filter(task => task._id !== id));
    }

}



return (
    <div className='flex flex-col   w-[100%]  bg-radial from-blue-200 to-blue-400  py-6 shadow-xl text-white   mt-25'>

        <h1 className='text-3xl text-black  font-serif text-[35px] font-bold text-center mt-8' >All Tasks</h1>
        <div className="rounded-2xl overflow-hidden flex justify-center mt-7">
            <table class="w-[93%]  ">

                <thead class="bg-radial-[at_50%_75%] from-red-500  to-red-800 to-90% text-white rounded-md">
                    <tr>
                        <th class="px-4 py-3 text-left font-semibold min-w-[150px]">Employee's Name</th>
                        <th class="px-4 py-3 text-left font-semibold min-w-[200px]">Employee Email</th>
                        <th class="px-4 py-3 text-left font-semibold min-w-[120px]">Domain</th>
                        <th class="px-4 py-3 text-center font-semibold min-w-[250px]">Description</th>
                        <th class="px-4 py-3 text-left font-semibold min-w-[180px]">Deadline</th>
                        <th class="px-4 py-3 text-left font-semibold min-w-[100px]">Status</th>
                        <th class="px-4 py-3 text-left font-semibold min-w-[100px]">Actions</th>
                    </tr>
                </thead>




                {tasks.length === 0 ? (
                    <div className="w-full  flex justify-center items-center py-8   ml-112  ">
                        <p className="text-3xl text-black font-serif text-[23px] font-bold text-center mb-3 ">No tasks</p>
                    </div>


                ) : (
                    <tbody class="bg-indigo-950 text-white">
                        {tasks.map((task) => (
                            <tr class="border-b border-gray-500">
                                <td class="px-4 py-3">{task.assignedTo?.name || 'N/A'}</td>
                                <td class="px-4 py-3">{task.assignedTo?.email || 'N/A'}</td>
                                <td class="px-4 py-3">{task.domain || 'N/A'}</td>
                                <td class="px-4 py-3 ">{task.description || 'N/A'}</td>
                                <td class="px-4 py-3">{new Date(task.deadline).toLocaleDateString('en-GB') || 'N/A'}</td>
                                <td class="px-4 py-3">{task.status || 'N/A'}</td>
                                <td><div className='flex p-3'>
                                    <button onClick={() => navigate(`/edit-task/${task._id}`)} className='bg-blue-500 hover:bg-blue-600 w-14 rounded-md mr-2 cursor-pointer'>Edit</button>
                                    <h1>/</h1>
                                    <button onClick={() => deletetask(task._id)} className='bg-red-500 hover:bg-red-600 w-14 rounded-md ml-2 cursor-pointer'>Delete</button>
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
