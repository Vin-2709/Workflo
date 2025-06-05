
import React, { useState, useEffect } from 'react' // Added useEffect
import axios from 'axios' // Added axios import
axios.defaults.withCredentials = true;
import Header from '../other/Header'
import Dashboard from '../other/Dashboard'
import { Link, useParams } from 'react-router-dom'
import ActiveTasks from '../others/ActiveTask'
import FailedTask from '../others/FailedTask'
import CompletedTask from '../others/CompletedTask'


const AdminDashboard = ({changeUser,userdata}) => {
  
  const { id } = useParams();
  const [user, setUser] = useState(null); 
  const [tasks,setTasks]=useState([]);
  useEffect(() => {
    getstatus();
    getUser();
    deadlineCheck();
  }, [id, changeUser]); 

   const getUser = async () => {
      try {
        const res = await axios.get(`https://task-management-theta-pied.vercel.app/admin/${id}`);
        setUser(res.data.user);
        changeUser(res.data.user); 
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    const getstatus= async()=>{
       try {
          const response=await axios.get(`https://task-management-theta-pied.vercel.app/admin/gettask/${id}`)
          console.log(response);
          setTasks(response.data.tasks)
       } catch (error) {
          console.log(error);
       }
    }

    const deadlineCheck=()=>{
       const today=new Date();
       today.setHours(0,0,0,0);
       tasks.forEach(async(task)=>{
        const deadline=new Date(task.deadline);
        deadline.setHours(0,0,0,0);
        if(deadline<today && task.status !=="Completed " && task.status !="Failed"){
          await axios.post(`https://task-management-theta-pied.vercel.app/taskstatusupdate/${task._id}`, {Status:"Failed"});
        }
       });
    }

  if (!user) return <div className="text-white">Loading...</div>;
  
  return (
    <div className=' bg-radial-[at_50%_75%] from-sky-400 via-blue-400 to-indigo-500 to-90% min-h-screen w-auto overflow-auto   '>
      <Header changeUser={changeUser} name={user?.name || userdata?.username} /> 
      <h1 className=' text-white  font-serif text-[45px] font-bold text-center mt-8 [text-shadow:2px_2px_8px_rgba(0,0,0,0.7)]'>Dashboard  Overview</h1>
      <div className='flex justify-center mt-8'>
        <Link to={`/createtask/${id}`}><button className='bg-green-600 text-white w-[125px] h-[40px]  mx-10 rounded-md font-bold cursor-pointer shadow-md shadow-black '> + Assign Task</button></Link>
      </div>
      

      <div className='flex justify-center gap-8 mt-10'>
        <ActiveTasks data={tasks}/>
        <CompletedTask data={tasks}/>
        <FailedTask data={tasks}/> 
      </div>
      
      <Dashboard/>
   </div>
  )
}

export default AdminDashboard
