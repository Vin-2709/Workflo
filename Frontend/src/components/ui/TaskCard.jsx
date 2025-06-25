import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, FileText, Calendar } from 'lucide-react';

axios.defaults.withCredentials = true;

const TaskCard = ({ data, onstatusUpdate, openModal }) => {
  const [status, setStatus] = useState(data.status);

  useEffect(() => {
    setStatus(data.status);
  }, [data.status]);

  const statusUpdate = async (newStatus) => {
    setStatus(newStatus);
    if (onstatusUpdate) onstatusUpdate(data._id, newStatus);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/taskstatusupdate/${data._id}`,
        { Status: newStatus }
      );
    } catch (err) {
      console.error('Status update failed', err);
    }
  };

  return (
    <div className="bg-blue-900/60 backdrop-blur-sm rounded-3xl border border-white/20 p-6 m-4 min-w-85 h-96 flex flex-col justify-between shadow-lg transition-transform hover:scale-105">
      {/* Header */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">{data.domain}</h3>
          <span
            className={
              `px-3 py-1 rounded-full text-sm font-medium ` +
              (status === 'Completed'
                ? 'bg-green-600 text-white'
                : status === 'Failed'
                ? 'bg-red-600 text-white'
                : 'bg-yellow-500 text-white')
            }
          >
            {status}
          </span>
        </div>

        <p className="text-white/90 mb-4 line-clamp-4">{data.description}</p>
      </div>

      {/* Deadline & AssignedBy */}
      <div className="text-white/80 text-sm mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Calendar className="w-5 h-5" />
          <span>{new Date(data.deadline).toLocaleDateString('en-GB')}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>By: {data.assignedBy?.name || 'Unknown'}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        {/* Complete / Pending Toggle */}
        <div>
          {status !== 'Completed' ? (
            <button
              onClick={() => statusUpdate('Completed')}
              className="flex items-center h-[40px] text-[12px] space-x-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-3 py-2 rounded-xl font-medium transition-all"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Complete</span>
            </button>
          ) : (
            <button
              onClick={() => statusUpdate('Pending')}
              className="flex items-center h-[40px] text-[12px] space-x-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 py-2 rounded-xl font-medium transition-all"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Pending</span>
            </button>
          )}
        </div>

        {/* Manage Files aligned */}
        <button
          onClick={() => openModal(data)}
          className="flex items-center h-[40px] text-[12px] space-x-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-2 py-2 rounded-xl font-medium transition-all"
        >
          <FileText className="w-5 h-5" />
          <span>Manage Files</span>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;


