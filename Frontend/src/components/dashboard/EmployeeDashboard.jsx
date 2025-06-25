import React, { useState, useEffect } from 'react';
import Header       from '../ui/Header';
import StatusCards  from '../ui/StatusCards';
import TaskCard     from '../ui/TaskCard';
import '../ui/taskcard.css';
import { useParams } from 'react-router-dom';
import Modal from '../Modal/EmployeeModal.jsx';
import axios from 'axios';
import { ChevronLeft, ChevronRight, AtSign, Linkedin } from 'lucide-react';
axios.defaults.withCredentials = true;

const EmployeeDashboard = ({ changeUser, userdata }) => {
  const { id } = useParams();
  const [user, setUser] = useState('');
  const [tasks, setTasks] = useState([]);
  const [modalTask, setModalTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getUser();
    getTask();
    deadlineCheck();
  }, [id]);

  useEffect(() => {
    if (tasks.length > 0) deadlineCheck();
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

  const getTask = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/employee/gettask/${id}`);
      setTasks(response.data.tasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const deadlineCheck = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    tasks.forEach(async (task) => {
      const deadline = new Date(task.deadline);
      deadline.setHours(0, 0, 0, 0);
      if (deadline < today && !['Completed','Failed'].includes(task.status)) {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/taskstatusupdate/${task._id}`,
          { Status: 'Failed' }
        );
      }
    });
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prev) => prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t)));
  };

  const openModal = (task) => {
    setModalTask(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalTask(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 to-blue-800 overflow-hidden">
      <Header changeUser={changeUser} name={user?.name || userdata?.username} />

      <section className="flex flex-wrap justify-center gap-4 py-6 px-4">
        <StatusCards title="New Tasks" data={tasks} status="New" />
        <StatusCards title="Active Tasks" data={tasks} status="Pending" />
        <StatusCards title="Completed Tasks" data={tasks} status="Completed" />
        <StatusCards title="Failed Tasks" data={tasks} status="Failed" />

      </section>

      <section className="px-6">
        <h2 className="flex justify-center items-center text-4xl font-bold text-white space-x-3 mb-6">
          <ChevronLeft size={35} className="hover:text-blue-300 transition-colors" />
          <span className="[text-shadow:2px_2px_8px_rgba(0,0,0,0.7)]">All Tasks</span>
          <ChevronRight size={35} className="hover:text-blue-300 transition-colors" />
        </h2>

        <div className="scrollbar-hide flex gap-6 overflow-x-auto px-1 pb-6">
          {tasks.length === 0 ? (
            <div className="text-white text-center w-full">No tasks assigned</div>
          ) : (
            tasks.map((task, idx) => (
              <TaskCard
                key={task._id || idx}
                data={task}
                onstatusUpdate={updateTaskStatus}
                openModal={openModal}
              />
            ))
          )}
        </div>
      </section>

      {showModal && <Modal task={modalTask} onClose={closeModal} />}

      
    </div>
  );
};

export default EmployeeDashboard;
