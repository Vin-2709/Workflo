import React, { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useParams, useNavigate } from "react-router-dom";
import {
  Pencil,
  FileCheck,
  CircleX,
  Trash2,
  CircleCheckBig,
  Clock,
} from "lucide-react";

const Dashboard = ({ openModal, openEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/${id}`
      );
      if (response.data.success) {
        setAdmin(response.data.user);
        setTasks(response.data.tasks);
      }
    } catch (error) {
      console.log("Error occurred");
    }
  };

  const deletetask = async (taskId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/delete/${taskId}`
    );
    if (response.data.success) {
      setTasks(tasks.filter((task) => task._id !== taskId));
    }
  };

  const statusUpdate = async (taskId, status) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/taskstatusupdate/${taskId}`,
      {
        Status: status,
      }
    );
    if (response.data.success) {
      setTasks(
        tasks.map((task) =>
          task._id === taskId ? { ...task, status: response.data.Status } : task
        )
      );
    } else {
      console.log("Error updating status");
    }
  };

  const toggleDescription = (taskId) => {
    setExpandedRows((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const filteredTasks = tasks.filter((task) =>
    selectedStatus === "All"
      ? true
      : task.status.trim().toLowerCase() === selectedStatus.toLowerCase()
  );

  return (
    <div className="flex flex-col mt-20 w-full px-6 py-10 text-white font-sans bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#312e81] min-h-screen">
      <div className="flex justify-center items-center gap-3 mb-8">
        <h1 className="text-white font-serif text-4xl font-bold text-center [text-shadow:2px_2px_8px_rgba(0,0,0,0.7)]">
          All Tasks
        </h1>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {["All", "Pending", "Completed", "Failed"].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
              selectedStatus === status
                ? "bg-white text-indigo-800"
                : "bg-indigo-500 text-white hover:bg-indigo-400"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-2xl">
        <table className="w-full min-w-[1100px]">
          <thead>
            <tr className="text-left text-sm text-white uppercase bg-indigo-700">
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Domain</th>
              <th className="px-9 py-4">Description</th>
              <th className="px-8 py-4">Deadline</th>
              <th className="px-15 py-4">Status</th>
              <th className="px-10 py-4">Actions</th>
              <th className="px-10 py-4">Files</th>
              <th className="px-10 py-4">Review</th>
            </tr>
          </thead>
          <tbody className="text-white text-sm">
            {filteredTasks.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-6 text-lg">
                  No tasks
                </td>
              </tr>
            ) : (
              filteredTasks.map((task) => (
                <tr
                  key={task._id}
                  className="border-b border-indigo-600 hover:bg-indigo-800/30 transition"
                >
                  <td className="px-6 py-5">{task.assignedTo?.name || "N/A"}</td>
                  <td className="px-6 py-5">{task.assignedTo?.email || "N/A"}</td>
                  <td className="px-6 py-5">{task.domain || "N/A"}</td>
                  <td className="px-6 py-5 max-w-[300px]">
                    {expandedRows.includes(task._id) ? (
                      <>
                        {task.description} <br />
                        <button
                          className="text-sm text-indigo-300 underline"
                          onClick={() => toggleDescription(task._id)}
                        >
                          Read less
                        </button>
                      </>
                    ) : (
                      <>
                        {task.description?.slice(0, 40)}... <br />
                        <button
                          className="text-sm text-indigo-300 underline"
                          onClick={() => toggleDescription(task._id)}
                        >
                          Read more
                        </button>
                      </>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    {new Date(task.deadline).toLocaleDateString("en-GB") || "N/A"}
                  </td>
                  <td className="px-6 py-5 font-medium">
                    <div
                      className={`flex w-[110px] justify-center gap-1.5 px- py-2 rounded-full text-md font-medium
                        ${
                          task.status === "Completed"
                            ? "bg-emerald-600 text-white"
                            : task.status === "Failed"
                            ? "bg-red-600 text-white"
                            : "bg-yellow-400 text-black"
                        }`}
                    >
                      {task.status === "Completed" && <CircleCheckBig size={16} />}
                      {task.status === "Failed" && <CircleX size={16} />}
                      {task.status === "Pending" && <Clock size={16} />}
                      {task.status}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-2 justify-center">
                     <button
                        onClick={() => openEdit(task)}       
                        className="flex justify-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded"
                      >
                        
                         <div className="flex items-center gap-1">
                          <Pencil size={14}/> Edit
                        </div>
                      </button>
                      <button
                        onClick={() => deletetask(task._id)}
                        className="flex justify-center bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded text-white text-xs font-medium"
                      >
                        <div className="flex items-center gap-1">
                          <Trash2 size={14} /> Delete
                        </div>
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-5">
                    <button
                      onClick={() => openModal(task)}
                      className="bg-blue-700 hover:bg-neutral-600 px-2 py-2 rounded text-white text-xs font-medium"
                    >
                      <div className="flex items-center gap-1">
                        <FileCheck size={14} /> Manage files
                      </div>
                    </button>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => statusUpdate(task._id, "Completed")}
                        className="bg-green-600 hover:bg-green-800 px-4 py-1.5 rounded text-white text-xs font-medium"
                      >
                        <div className="flex items-center gap-1">
                          <CircleCheckBig size={14} /> Accept
                        </div>
                      </button>
                      <button
                        onClick={() => statusUpdate(task._id, "Failed")}
                        className="bg-red-700 hover:bg-red-800 px-4 py-1.5 rounded text-white text-xs font-medium"
                      >
                        <div className="flex items-center gap-1">
                          <CircleX size={14} /> Reject
                        </div>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;