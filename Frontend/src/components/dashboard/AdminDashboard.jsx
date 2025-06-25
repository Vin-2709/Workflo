import React, { useState, useEffect } from "react";
import Header             from "../ui/Header";
import Dashboard          from "../layout/Dashboard";
import { useParams, useNavigate } from "react-router-dom";
import { ChartNoAxesCombined }     from "lucide-react";
import StatusCards        from "../ui/StatusCards";
import AdminModal         from "../Modal/AdminModal";
import CreateTaskModal    from "../Modal/CreateTaskModal";
import EditTaskModal      from "../Modal/EditTaskModal";
import axios    from "axios";


axios.defaults.withCredentials = true;

const AdminDashboard = ({ changeUser, userdata }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [modalTask, setModalTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      console.error('No admin ID found in URL parameters');
      setError('No admin ID provided. Please check the URL.');
      setLoading(false);
      return;
    }
    initializeDashboard();
  }, [id]);

  const initializeDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      await getUser();
      await getStatus();
      await deadlineCheck();
    } catch (err) {
      console.error('Dashboard initialization failed:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/${id}`);
      setUser(res.data.user);
      changeUser(res.data.user);
    } catch (err) {
      if (err.response?.status === 401) navigate('/login');
      throw err;
    }
  };

  const getStatus = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/gettask/${id}`);
      setTasks(res.data.tasks || []);
    } catch (err) {
      if (err.response?.status === 401) navigate('/login');
      throw err;
    }
  };

  const deadlineCheck = async () => {
    if (!tasks.length) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const overdue = tasks.filter(t => {
      const dl = new Date(t.deadline);
      dl.setHours(0,0,0,0);
      return dl < today && t.status !== 'Completed' && t.status !== 'Failed';
    });
    await Promise.all(
      overdue.map(t => axios.post(`${import.meta.env.VITE_BACKEND_URL}/taskstatusupdate/${t._id}`, { Status: 'Failed' }))
    );
  };

  const openModal = (task) => {
    setModalTask(task);
    setShowModal(true);
  };
  const closeModal = () => {
    setModalTask(null);
    setShowModal(false);
  };

  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);
  const onAdminUploadSuccess = () => getStatus();
  const onTaskCreated = () => getStatus();
  const openEditModal = (taskId) => setEditingTaskId(taskId);
  const closeEditModal = () => setEditingTaskId(null);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 to-blue-800 flex items-center justify-center">
      <div className="text-white text-xl">Loading dashboard...</div>
    </div>
  );
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 to-blue-800 flex items-center justify-center">
      <div className="text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Error Loading Dashboard</h2>
        <p className="mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Retry</button>
      </div>
    </div>
  );
  if (!user) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 to-blue-800 flex items-center justify-center">
      <div className="text-white">User data not available</div>
    </div>
  );

  const completionRate = tasks.length > 0
    ? Math.round((tasks.filter(t => t.status.trim().toLowerCase() === 'completed').length / tasks.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 to-blue-800 overflow-auto">
      <Header changeUser={changeUser} name={user?.name || userdata?.username} />
      <div className="w-[1250px] mx-auto mt-15 px-10 py-8 bg-gradient-to-br from-[#192950] via-[#1e3a8a] to-[#272494] rounded-3xl shadow-xl shadow-indigo-950">

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <ChartNoAxesCombined size={42} className="text-white drop-shadow" />
            <h1 className="text-white text-4xl font-bold tracking-tight leading-snug">Dashboard Overview</h1>
          </div>
          <button onClick={openCreateModal} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 rounded-xl text-white font-semibold shadow-lg shadow-black/30 transition">
            <span className="text-xl">+</span> Assign Task
          </button>
        </div>

        <div className="mb-10">
          <h3 className="text-white text-lg font-semibold mb-2">Task Completion Rate</h3>
          <div className="w-full bg-white/20 h-4 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full transition-all duration-500" style={{ width: `${completionRate}%` }}></div>
          </div>
          <p className="text-white mt-1 text-sm italic">{completionRate}% of total tasks completed</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatusCards title="Active Tasks" data={tasks} status="Pending" />
          <StatusCards title="Completed Tasks" data={tasks} status="Completed" />
          <StatusCards title="Failed Tasks" data={tasks} status="Failed" />
        </div>
      </div>

    
      <Dashboard openModal={openModal} openEdit={openEditModal} tasks={tasks} />

      {showModal && (
        <AdminModal task={modalTask} onClose={closeModal} onUploadSuccess={onAdminUploadSuccess} changeUser={changeUser} userdata={userdata} />
      )}

      {showCreateModal && (
        <CreateTaskModal onClose={closeCreateModal} onTaskCreated={onTaskCreated} />
      )}

      {editingTaskId && (
        <EditTaskModal
          taskId={editingTaskId}
          onClose={closeEditModal}
          onTaskUpdated={() => { closeEditModal(); getStatus(); }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;

