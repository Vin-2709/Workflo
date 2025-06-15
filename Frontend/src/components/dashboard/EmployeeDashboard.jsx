import React,{useState,useEffect} from 'react'
import Header from '../other/Header.jsx'
import ActiveTask from '../others/ActiveTask.jsx'
import CompletedTask from '../others/CompletedTask.jsx'
import FailedTask from '../others/FailedTask.jsx'
import NewTask from '../others/NewTask.jsx'
import TaskCard from '../others/TaskCard.jsx'
import '../others/taskcard.css'
import { useParams } from 'react-router-dom'
import Modal from '../Modal/EmployeeModal.jsx';
import axios from 'axios';
import { ChevronLeft} from 'lucide-react';
import { ChevronRight} from 'lucide-react';
axios.defaults.withCredentials = true;



const EmployeeDashboard = ({changeUser,userdata}) => {
   const {id}= useParams();
   const[user,setUser]= useState("");
   const [tasks, setTasks]=useState([]);
  const [modalTask,setModalTask]=useState(null);
  const [showModal,setShowModal]=useState(false);

   useEffect(()=>{
    getUser();
    getTask();
    deadlineCheck();
   },[id]);

   useEffect(() => {
    if (tasks.length > 0) {
      deadlineCheck();
    }
  }, [tasks]);
    
    const getUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/employee/${id}`);
        setUser(res.data.user);
        changeUser(res.data.user); 
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };
   
    const getTask= async()=>{
    const response= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/gettask/${id}`);
    console.log(response);
    setTasks(response.data.tasks);
   }

  const deadlineCheck=()=>{
        const today=new Date();
        today.setHours(0,0,0,0);
        tasks.forEach(async(task)=>{
          const deadline=new Date(task.deadline);
          deadline.setHours(0,0,0,0);
          if(deadline<today && task.status !=="Completed" && task.status !="Failed"){
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/taskstatusupdate/${task._id}`, {Status:"Failed"});
          }
        });
      }

   const updateTaskStatus = (taskId, newStatus) => {
     setTasks(prevTasks => 
       prevTasks.map(task => 
         task._id === taskId ? {...task, status: newStatus} : task
       )
     );
   }

   const openModal=(task)=>{
     setModalTask(task);
     setShowModal(true);
   }

   const closeModal=(task)=>{
    setModalTask(null);
    setShowModal(false);
   }

  return (
    <div className=' bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-400 to-90% h-screen overflow-hidden'>
      <Header changeUser={changeUser} name={user?.name || userdata?.username} />

      <div className='flex justify-between p-10 mt-6 w-full'>
        <NewTask data={tasks} />
        <ActiveTask data={tasks} />
        <CompletedTask data={tasks} />
        <FailedTask data={tasks} />
      </div>

      <div className=' w-full h-auto  p-7'>
        <h2 className="flex justify-center space-x-2 text-2xl font-bold">
  <ChevronLeft size={35} className="text-white hover:text-indigo-300 mt-2 "  />
  <span className=' text-white  font-serif text-[35px] font-bold text-center [text-shadow:2px_2px_8px_rgba(0,0,0,0.7)]' >All Tasks</span>
  <ChevronRight size={35} className="text-white hover:text-indigo-300 mt-2"  />
</h2>
        <div className=' scrollbar-minimal mt-1 flex overflow-x-auto  flex-nowrap scrollbar-hide'>
          {tasks.length === 0 ? (<div>No tasks </div>) :
            tasks.map((task, index) => (
              <TaskCard key={task.id || index} data={task} onstatusUpdate={updateTaskStatus}  openModal={openModal} />
            ))
          }
        </div>
      </div>
      {showModal && 
            <Modal
              task={modalTask}
              onClose={closeModal}
            />}
      
    </div>
  )
}

export default EmployeeDashboard;
