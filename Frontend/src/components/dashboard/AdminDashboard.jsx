
import React, { useState, useEffect } from 'react' 
import axios from 'axios' 
axios.defaults.withCredentials = true;
import Header from '../other/Header'
import Dashboard from '../other/Dashboard'
import { Link, useParams } from 'react-router-dom'
import ActiveTasks from '../others/ActiveTask'
import FailedTask from '../others/FailedTask'
import CompletedTask from '../others/CompletedTask';
import AdminModal from '../Modal/AdminModal';
import { ChartNoAxesCombined } from 'lucide-react';



const AdminDashboard = ({changeUser,userdata}) => {
  
  const { id } = useParams();
  const [user, setUser] = useState(null); 
  const [tasks,setTasks]=useState([]);
  const [modalTask,setModalTask]=useState(null);
  const [showModal,setShowModal]=useState(false);
  useEffect(() => {
    getstatus();
    getUser();
    deadlineCheck();
  }, [id, changeUser]); 

   const getUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/${id}`);
        setUser(res.data.user);
        changeUser(res.data.user); 
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    const getstatus= async()=>{
       try {
          const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/gettask/${id}`)
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
          await axios.post(`${import.meta.env.VITE_BACKEND_URL}/taskstatusupdate/${task._id}`, {Status:"Failed"});
        }
       });
    }

   const openModal=(task)=>{
     setModalTask(task);
     setShowModal(true);
   }

   const closeModal=(task)=>{
    setModalTask(null);
    setShowModal(false);
   }

   const onAdminUploadSuccess = () => {
    getstatus(); 
  };

  if (!user) return <div className="text-white">Loading...</div>;
  
  return (
    <div className=' bg-radial-[at_50%_75%] from-sky-400 via-blue-400 to-indigo-500 to-90% min-h-screen w-auto overflow-auto   '>
      <Header changeUser={changeUser} name={user?.name || userdata?.username} /> 
      <div className='bg-radial-[at_50%_75%] from-blue-400 via-blue-800 to-blue-900 to-90% mt-15 w-[1250px] mx-auto p-9 rounded-3xl h-[500px] shadow-lg shadow-indigo-900'>
      <div className='flex justify-center gap-5 '>
          <ChartNoAxesCombined size={45} color='white' className='mt-2'/>
          <h1 className=' text-white  font-serif text-[45px] font-bold text-center  [text-shadow:2px_2px_8px_rgba(0,0,0,0.7)]'>Dashboard  Overview</h1>
      </div>
      
      <div className='flex justify-center mt-10'>
        <Link to={`/createtask/${id}`}><button className='bg-green-600 text-white w-[125px] h-[40px]  ml-50 rounded-md font-bold cursor-pointer shadow-md shadow-black '> + Assign Task</button></Link>
      </div>
      

      <div className='flex justify-center gap-8 mt-20'>
        <ActiveTasks data={tasks}/>
        <CompletedTask data={tasks}/>
        <FailedTask data={tasks}/> 
      </div>
      </div>
      
      <Dashboard openModal={openModal}/>
      {showModal && (
        <AdminModal
          task={modalTask}
          onClose={closeModal}
          onUploadSuccess={onAdminUploadSuccess}
        />
      )}
   </div>
  )
}

export default AdminDashboard
