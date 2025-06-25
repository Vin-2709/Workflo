import React, { useState } from "react";
import axios from "axios";
import {
  X, UploadCloud, FileUp, FileDown, Trash2, Sparkles, MessageCircle, Send
} from "lucide-react";
import AskAiModal from "./EmployeeAiModal";

const EmployeeModal = ({ task, onClose, onUploadSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [employeeComment, setEmployeeComment] = useState(task.EmployeeComments || "");
  const [submittingComment, setSubmittingComment] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const total = selectedFiles.length + files.length;
    if (total > 5) {
      return alert(`Max 5 files allowed. You selected ${total}.`);
    }
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleRemove = (idx) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) return alert("No files selected");
    setUploading(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/employee-upload/${task._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      alert("Files uploaded successfully!");
      if (onUploadSuccess) onUploadSuccess(res.data);
      setSelectedFiles([]);
      onClose();
    } catch (err) {
      console.error("Upload error", err);
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!employeeComment.trim()) {
      alert("Please enter a comment");
      return;
    }

    setSubmittingComment(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/employee-comment/${task._id}`,
        { comment: employeeComment },
        { withCredentials: true }
      );
      
      if (res.data.success) {
        alert("Comment added successfully!");
        if (onUploadSuccess) onUploadSuccess(res.data);
        onClose();
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(`Failed to add comment: ${err.response?.data?.message || err.message}`);
    } finally {
      setSubmittingComment(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 ">
      <div className="flex flex-col gap-[15px] bg-indigo-950 min-w-[700px] min-h-[650px] max-h-[95vh] overflow-y-auto rounded-xl px-8 pt-9 text-white shadow-xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 hover:text-red-400">
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <UploadCloud size={22} /> Manage Files & Comments
        </h2>

        <p className="text-lg mb-4">
          Task: <span className="text-indigo-300 font-medium">{task.domain}</span>
        </p>

        {/* Comments Section */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-sm text-indigo-200 flex items-center gap-1">
            <MessageCircle size={16} /> Comments
          </h3>
          
          {task.AdminComments && (
            <div className="bg-blue-100 p-3 rounded mb-3 text-black">
              <p className="font-semibold text-blue-800 mb-1">Admin Comment:</p>
              <p className="whitespace-pre-wrap">{task.AdminComments}</p>
            </div>
          )}

          {task.EmployeeComments && (
            <div className="bg-green-100 p-3 rounded mb-3 text-black">
              <p className="font-semibold text-green-800 mb-1">Your Previous Comment:</p>
              <p className="whitespace-pre-wrap">{task.EmployeeComments}</p>
            </div>
          )}

          <div className="bg-indigo-100 p-3 rounded text-black">
            <label className="block font-semibold text-indigo-900 mb-2">
              Add/Update Your Comment:
            </label>
            <textarea
              value={employeeComment}
              onChange={(e) => setEmployeeComment(e.target.value)}
              placeholder="Enter your comment or questions for the admin..."
              className="w-full p-2 border border-indigo-300 rounded text-sm resize-vertical min-h-[80px]"
              disabled={submittingComment}
            />
            <button
              onClick={handleCommentSubmit}
              disabled={submittingComment || !employeeComment.trim()}
              className={`mt-2 px-4 py-2 rounded text-white font-medium flex items-center gap-2 min-h-[1vh] ${
                submittingComment || !employeeComment.trim()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              <Send size={16} />
              {submittingComment ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>

        <div className="bg-indigo-100 text-black p-3 rounded mb-4">
          <p className="font-semibold mb-1 flex items-center gap-1">
            <FileDown className="text-indigo-700" size={16} /> Files from Admin
          </p>
          {task.adminFiles?.length ? (
            <ul className="list-disc ml-4 space-y-1">
              {task.adminFiles.map((file, i) => (
                <li key={i}>
                  <a href={file} target="_blank" rel="noopener noreferrer" className="hover:underline">File {i + 1}</a>
                </li>
              ))}
            </ul>
          ) : "No files"}
        </div>

        <div className="bg-indigo-100 text-black p-3 rounded mb-4">
          <p className="font-semibold mb-1 flex items-center gap-1">
            <FileUp className="text-indigo-700" size={16} /> Your Uploaded Files
          </p>
          {task.employeeFiles?.length ? (
            <ul className="list-disc ml-4 space-y-1">
              {task.employeeFiles.map((file, i) => (
                <li key={i}>
                  <a href={file} target="_blank" rel="noopener noreferrer" className="hover:underline">File {i + 1}</a>
                </li>
              ))}
            </ul>
          ) : "No files yet"}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-indigo-200 mb-1">
            Choose and Upload Files (Max 5) - Selected: {selectedFiles.length}
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            disabled={uploading}
            className="w-full bg-indigo-50 text-black rounded-lg p-2 text-sm file:bg-indigo-600 file:text-white file:px-3 file:py-1 file:rounded-lg file:cursor-pointer"
          />
          {selectedFiles.length > 0 && (
            <ul className="text-black text-sm bg-indigo-100 rounded mt-2 p-2 max-h-24 overflow-y-auto space-y-1">
              {selectedFiles.map((file, i) => (
                <li key={i} className="flex justify-between items-center">
                  {file.name}
                  <button
                    onClick={() => handleRemove(i)}
                    className="text-red-500 hover:underline text-xs"
                    disabled={uploading}
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-4 mt-3 mb-5">
          <button
            onClick={handleUpload}
            disabled={uploading || !selectedFiles.length}
            className={`w-full py-2 rounded bg-indigo-700 hover:bg-indigo-800 text-white flex items-center justify-center gap-2 ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <UploadCloud size={18} /> {uploading ? "Uploading..." : `Upload (${selectedFiles.length})`}
          </button>

          <button
            onClick={() => setShowAiModal(true)}
            className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
          >
            <Sparkles size={18} /> Ask AI
          </button>
        </div>

        {showAiModal && <AskAiModal task={task} onClose={() => setShowAiModal(false)} />}
      </div>
    </div>
  );
};

export default EmployeeModal;
