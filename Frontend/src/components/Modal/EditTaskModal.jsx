import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { X } from 'lucide-react';

const EditTaskModal = ({ taskId, adminId, onClose, onTaskUpdated }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    domain: '',
    description: '',
    deadline: new Date(),
    status: 'Pending',
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        let actualTaskId = taskId;
        
        // If taskId is an object,  extract ID
        if (typeof taskId === 'object' && taskId !== null) {
          actualTaskId = taskId._id || taskId.id || taskId.taskId;
        }
        
        if (!actualTaskId || typeof actualTaskId !== 'string') {
          setError('Invalid task ID provided');
          setLoading(false);
          return;
        }
        
        console.log('Fetching task with ID:', actualTaskId);
        
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/task/${actualTaskId}`);
        
        if (res.data.success) {
          const t = res.data.task;
          console.log('Task data received:', t);
          
          setFormData({
            name: t.assignedTo?.name || '',
            email: t.assignedTo?.email || '',
            domain: t.domain || '',
            description: t.description || '',
            deadline: t.deadline ? new Date(t.deadline) : new Date(),
            status: t.status || 'Pending',
          });
          setError('');
        } else {
          setError(res.data.message || 'Failed to load task');
        }
      } catch (err) {
        console.error('Error fetching task:', err);
        setError(err.response?.data?.message || 'Error fetching task');
      } finally {
        setLoading(false);
      }
    };
    
    if (taskId) {
      fetchTask();
    } else {
      setError('No task ID provided');
      setLoading(false);
    }
  }, [taskId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let actualTaskId = taskId;
      if (typeof taskId === 'object' && taskId !== null) {
        actualTaskId = taskId._id || taskId.id || taskId.taskId;
      }
      
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/edit-task/${actualTaskId}`,
        {
          domain: formData.domain,
          deadline: formData.deadline,
          description: formData.description,
        }
      );
      
      if (res.data.success) {
        if (onTaskUpdated) onTaskUpdated();
        onClose();
      } else {
        setError(res.data.message || 'Update failed');
      }
    } catch (err) {
      console.error('Error updating task:', err);
      setError(err.response?.data?.message || 'Error updating task');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-gradient-to-br from-indigo-800 to-purple-800 rounded-xl w-[600px] p-6">
          <div className="text-white text-center">Loading task details...</div>
        </div>
      </div>
    );
  }

  // Error state - if there's an error and no data loaded
  if (error && !formData.name && !formData.email) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-gradient-to-br from-indigo-800 to-purple-800 rounded-xl w-[600px] p-6 relative">
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={onClose}
          >
            <X size={20} />
          </button>
          <h2 className="text-white text-2xl font-bold mb-4">Error</h2>
          <div className="text-red-400 mb-4">{error}</div>
          <div className="text-white mb-4">
            <strong>Debug Info:</strong><br />
            Task ID Type: {typeof taskId}<br />
            Task ID Value: {JSON.stringify(taskId)}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Main modal content
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-indigo-800 to-purple-800 rounded-xl w-[600px] max-w-[90vw] p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        
        <h2 className="text-white text-2xl font-bold mb-4">Edit Task</h2>
        
        {error && (
          <div className="text-red-400 mb-3 p-2 bg-red-100/10 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white font-semibold mb-1">Employee Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              readOnly
              className="w-full px-3 py-2 rounded-md bg-gray-100 text-black border border-gray-300"
            />
          </div>
          
          <div>
            <label className="block text-white font-semibold mb-1">Employee Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full px-3 py-2 rounded-md bg-gray-100 text-black border border-gray-300"
            />
          </div>
          
          <div>
            <label className="block text-white font-semibold mb-1">Domain</label>
            <select
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Domain</option>
              <option value="Development">Development</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Design">Design</option>
              <option value="Sales">Sales</option>
              <option value="Human-resources">Human Resources</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Engineering">Engineering</option>
              <option value="Legal">Legal</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description..."
              required
              className="w-full px-3 py-2 rounded-md bg-white text-black h-24 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
            />
          </div>
          
          <div>
            <label className="block text-white font-semibold mb-1">Deadline</label>
            <DatePicker
              selected={formData.deadline}
              onChange={date => setFormData({...formData, deadline: date})}
              minDate={new Date()}
              dateFormat="MMMM d, yyyy"
              className="w-full px-3 py-2 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText="Select deadline"
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded text-white transition-colors"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;