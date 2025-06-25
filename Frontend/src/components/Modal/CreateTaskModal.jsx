
import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { 
  X, 
  Plus, 
  User, 
  Mail, 
  Briefcase, 
  FileText, 
  Calendar, 
  Upload, 
  Trash2,
  Home,
  Sparkles
} from 'lucide-react';

const CreateTaskModal = ({ onClose, onTaskCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const totalFiles = selectedFiles.length + files.length;
    if (totalFiles > 5) {
      alert('You can only upload a maximum of 5 files.');
      return;
    }
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (idx) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setUploading(true);

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('domain', domain);
      formData.append('description', description);
      formData.append('deadline', deadline);
      
      // Append files if any
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/${id}/assigntask`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      console.log(response);
      setEmail('');
      setName('');
      setDomain('');
      setDeadline('');
      setDescription('');
      setSelectedFiles([]);
      setError('');
      setMessage(response.data?.message);
      

      if (onTaskCreated) {
        onTaskCreated();
      }
      
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error) {
      setMessage('');
      setError(error.response?.data?.message || 'Task creation failed');
      setEmail('');
      setName('');
      setDomain('');
      setDeadline('');
      setDescription('');
      setSelectedFiles([]);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 text-white shadow-2xl border border-indigo-400">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold tracking-wide flex items-center gap-2">
            <Plus size={22} /> Create Task
          </h2>
          <button onClick={onClose} className="hover:text-red-400 transition">
            <X size={22} />
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 mb-4 text-red-200">
            {error}
          </div>
        )}
        
        {message && (
          <div className="bg-green-500/20 border border-green-500 rounded-lg p-3 mb-4 text-green-200">
            {message}
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-indigo-200 flex items-center gap-2">
                  <User size={16} /> Employee Name
                </label>
                <input
                  type="text"
                  placeholder="Enter employee name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/90 text-gray-900 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-400 transition placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-indigo-200 flex items-center gap-2">
                  <Mail size={16} /> Employee Username
                </label>
                <input
                  type="email"
                  placeholder="Enter username/email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/90 text-gray-900 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-400 transition placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-indigo-200 flex items-center gap-2">
                  <Briefcase size={16} /> Domain
                </label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full bg-white/90 text-gray-900 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  required
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
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-indigo-200 flex items-center gap-2">
                  <FileText size={16} /> Description
                </label>
                <textarea
                  placeholder="Enter task description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white/90 text-gray-900 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-400 transition h-32 resize-none placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-indigo-200 flex items-center gap-2">
                  <Calendar size={16} /> Deadline
                </label>
                <DatePicker
                  selected={deadline}
                  onChange={(date) => setDeadline(date)}
                  className="w-full bg-white/90 text-gray-900 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  placeholderText="Select deadline"
                  dateFormat="MMMM d, yyyy"
                  minDate={new Date()}
                  required
                />
              </div>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="border-t border-indigo-400/30 pt-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-indigo-200 flex items-center gap-2">
                <Upload size={16} /> Attach Files (Max 5) - Currently selected: {selectedFiles.length}
              </label>
              <input
                type="file"
                multiple
                accept="*/*"
                className="w-full file:bg-indigo-600 file:text-white file:px-4 file:py-2 file:rounded-lg file:cursor-pointer file:border-0 text-sm bg-white/90 text-gray-900 rounded-lg p-3 mb-3 file:mr-4"
                onChange={handleFileChange}
                disabled={uploading}
              />
              
              {selectedFiles.length > 0 && (
                <div className="bg-white/10 rounded-lg p-3 text-white text-sm max-h-32 overflow-y-auto">
                  <ul className="space-y-2">
                    {selectedFiles.map((file, idx) => (
                      <li key={idx} className="flex justify-between items-center bg-white/20 rounded p-2">
                        <span className="truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(idx)}
                          disabled={uploading}
                          className="text-red-400 hover:text-red-300 flex items-center gap-1 ml-2 transition"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={uploading}
              className={`flex-1 py-3 rounded-lg font-medium flex justify-center items-center gap-2 transition ${
                uploading
                  ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
              }`}
            >
              <Sparkles size={18} />
              {uploading ? "Creating Task..." : "Create Task"}
            </button>
            
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-lg font-medium flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white transition shadow-lg"
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
