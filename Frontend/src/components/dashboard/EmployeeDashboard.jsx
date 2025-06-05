// import React,{useState,useEffect} from 'react'
// import Header from '../other/Header.jsx'
// import ActiveTask from '../others/ActiveTask.jsx'
// import CompletedTask from '../others/CompletedTask.jsx'
// import FailedTask from '../others/FailedTask.jsx'
// import NewTask from '../others/NewTask.jsx'
// import TaskCard from '../others/TaskCard.jsx'
// import '../others/taskcard.css'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'



// const EmployeeDashboard = ({changeUser,userdata}) => {
      

//    const {id}= useParams();
//    const[user,setUser]= useState("");
//    const [tasks, setTasks]=useState([]);

//    useEffect(()=>{

//     getUser();
//     getTask();
       
//    },[id]);
    
//     const getUser = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/employee/${id}`);
//         setUser(res.data.user);
//         changeUser(res.data.user); 
//       } catch (err) {
//         console.error('Error fetching user:', err);
//       }
//     };
   
//     const getTask= async()=>{
//     const response= await axios.get(`http://localhost:5000/gettask/${id}`);
//     console.log(response);
//     setTasks(response.data.tasks);
//    }
  
//     const handleStatusUpdate = (taskId, newStatus) => {
//      setTasks(prevTasks => 
//        prevTasks.map(task => {
//          if(task._id === taskId) {
//            return {...task, status: newStatus}; 
//          }
//          return task;
//        })
//      );
//    }


//   //  const deadlineCheck=()=>{
//   //    const today=new Date();
//   //    today.setHours(0,0,0,0);
//   //    const updatedTasks=()=>{
//   //      tasks.map((task)=>{
//   //       const deadline=new Date(task.deadline);
//   //       deadline.setHours(0,0,0,0)
//   //        if(deadline<today &&
//   //         task.status !="Completed"
//   //         && task.status !="Failed"
//   //        ){
           
//   //          axios.post(`http://localhost:5000/taskstatusupdate/${task._id}`,{Status:"Failed",})
//   //           return {...task, status:"Failed"};
//   //        }
//   //        return task;
//   //      })
//   //    }
//   //    setTasks(updatedTasks);
//   //  }



//   return (
//     <div className=' bg-blue-950 h-screen overflow-hidden'>
       
//           <Header changeUser={changeUser} name={user?.name || userdata?.username} /> 
       

//         <div className='flex justify-between p-10 mt-6 w-full'>
//            <NewTask data={tasks}/>
//            <ActiveTask data={tasks}/>
//            <CompletedTask data={tasks}/>
//            <FailedTask data={tasks}/>

//         </div>

//         <div className='w-full h-auto  p-7'>
//           <h1 className='text-white flex justify-center mb-0 text-[30px]  font-extrabold '>All Tasks</h1>
//           <div className=' scrollbar-minimal mt-3 flex overflow-x-auto  flex-nowrap scrollbar-hide'>
//           {tasks.length===0?(<div>No tasks </div>):
//           tasks.map((task,index)=>(
//               <TaskCard key={task.id || index} data={task} onstatusUpdate={handleStatusUpdate}/>
//           ))
// }
//         </div>
//         </div>
//     </div>
    
//   )
// }

// export default EmployeeDashboard;


import React,{useState,useEffect} from 'react'
import Header from '../other/Header.jsx'
import ActiveTask from '../others/ActiveTask.jsx'
import CompletedTask from '../others/CompletedTask.jsx'
import FailedTask from '../others/FailedTask.jsx'
import NewTask from '../others/NewTask.jsx'
import TaskCard from '../others/TaskCard.jsx'
import '../others/taskcard.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
axios.defaults.withCredentials = true;



const EmployeeDashboard = ({changeUser,userdata}) => {
   const {id}= useParams();
   const[user,setUser]= useState("");
   const [tasks, setTasks]=useState([]);

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

  return (
    <div className=' bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-400 to-90% h-screen overflow-hidden'>
        <Header changeUser={changeUser} name={user?.name || userdata?.username} /> 

        <div className='flex justify-between p-10 mt-6 w-full'>
           <NewTask data={tasks}/>
           <ActiveTask data={tasks}/>
           <CompletedTask data={tasks}/>
           <FailedTask data={tasks}/>
        </div>

        <div className='w-full h-auto  p-7'>
          <h1 className='text-gray-800 flex justify-center mb-0 text-[30px]  font-extrabold '>All Tasks</h1>
          <div className=' scrollbar-minimal mt-3 flex overflow-x-auto  flex-nowrap scrollbar-hide'>
          {tasks.length===0?(<div>No tasks </div>):
          tasks.map((task,index)=>(
              <TaskCard key={task.id || index} data={task} onstatusUpdate={updateTaskStatus}/>
          ))
}
        </div>
        </div>
    </div>
  )
}

export default EmployeeDashboard;
