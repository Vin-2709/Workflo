// import React, { useState } from "react";
// import axios from "axios";
// import { X, UploadCloud, FileUp, FileDown, Trash2, Sparkles } from "lucide-react";
// import AdminAiModal from "./AdminAiModal"; 

// const AdminModal = ({ task, onClose, onUploadSuccess }) => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [showAskAi, setShowAskAi] = useState(false);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const totalFiles = selectedFiles.length + files.length;
//     if (totalFiles > 5) {
//       alert(`You can only upload a maximum of 5 files.`);
//       return;
//     }
//     setSelectedFiles(prev => [...prev, ...files]);
//   };

//   const handleRemove = (idx) => {
//     setSelectedFiles(prev => prev.filter((_, i) => i !== idx));
//   };

//   const handleUpload = async () => {
//     if (!selectedFiles.length) return alert("No files selected");

//     setUploading(true);
//     const formData = new FormData();
//     selectedFiles.forEach((file) => formData.append("files", file));

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/admin-upload/${task._id}`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         }
//       );
//       alert(`Uploaded ${res.data.uploadedCount || selectedFiles.length} file(s)`);
//       setSelectedFiles([]);
//       if (onUploadSuccess) onUploadSuccess(res.data);
//       onClose();
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert(`Upload failed: ${err.response?.data?.message || err.message}`);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <>
//       <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
//         <div className="bg-blue-900 w-[600px] min-h-[650px] rounded-2xl p-8 text-white shadow-2xl border border-indigo-400">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold tracking-wide flex items-center gap-2">
//               <FileUp size={22} /> Manage Files
//             </h2>
//             <button onClick={onClose} className="hover:text-red-400 transition">
//               <X size={22} />
//             </button>
//           </div>

//           <div className="mb-6">
//             <p className="text-lg font-medium">
//               Task: <span className="text-indigo-300">{task.domain}</span>
//             </p>
//           </div>

//           <div className="mb-6">
//             <h3 className="font-semibold mb-2 text-sm text-indigo-200 flex items-center gap-1">
//               <FileDown size={16} /> Employee Uploaded Files
//             </h3>
//             <div className="bg-indigo-100 p-3 rounded text-black text-sm">
//               {task.employeeFiles?.length > 0 ? (
//                 <ul className="list-disc ml-4 space-y-1">
//                   {task.employeeFiles.map((file, idx) => (
//                     <li key={idx}>
//                       <a href={file} className="hover:underline" target="_blank" rel="noopener noreferrer">
//                         File {idx + 1}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 "No files uploaded by employee"
//               )}
//             </div>
//           </div>

//           <div className="mb-6">
//             <h3 className="font-semibold mb-2 text-sm text-indigo-200 flex items-center gap-1">
//               <FileUp size={16} /> Your Attachments
//             </h3>
//             <div className="bg-indigo-100 p-3 rounded text-black text-sm">
//               {task.adminFiles?.length > 0 ? (
//                 <ul className="list-disc ml-4 space-y-1">
//                   {task.adminFiles.map((file, idx) => (
//                     <li key={idx}>
//                       <a href={file} className="hover:underline" target="_blank" rel="noopener noreferrer">
//                         File {idx + 1}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 "No files from admin"
//               )}
//             </div>
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium mb-1 text-indigo-200">
//               Attach Files (Max 5) - Currently selected: {selectedFiles.length}
//             </label>
//             <input
//               type="file"
//               multiple
//               accept="*/*"
//               className="w-full file:bg-indigo-600 file:text-white file:px-3 file:py-1 file:rounded-lg file:cursor-pointer text-sm bg-indigo-50 text-black rounded-lg p-2 mb-3"
//               onChange={handleFileChange}
//               disabled={uploading}
//             />
//             {selectedFiles.length > 0 && (
//               <div className="bg-indigo-100 rounded p-2 text-black text-sm max-h-24 overflow-y-auto">
//                 <ul className="space-y-1">
//                   {selectedFiles.map((file, idx) => (
//                     <li key={idx} className="flex justify-between items-center">
//                       {file.name}
//                       <button
//                         onClick={() => handleRemove(idx)}
//                         disabled={uploading}
//                         className="text-red-600 text-xs hover:underline flex items-center gap-1"
//                       >
//                         <Trash2 size={14} /> Remove
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handleUpload}
//             disabled={uploading || selectedFiles.length === 0}
//             className={`w-full py-3 rounded-lg font-medium flex justify-center items-center gap-2 transition ${
//               uploading || selectedFiles.length === 0
//                 ? "bg-gray-400 text-gray-800 cursor-not-allowed"
//                 : "bg-indigo-700 hover:bg-indigo-800 text-white"
//             }`}
//           >
//             <UploadCloud size={18} />
//             {uploading ? "Uploading..." : `Upload ${selectedFiles.length} File${selectedFiles.length !== 1 ? "s" : ""}`}
//           </button>

//           {/* AI Ask Button */}
//           <button
//             onClick={() => setShowAskAi(true)}
//             className="w-full mt-3 py-3 rounded-lg font-medium flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white transition"
//           >
//             <Sparkles size={18} />
//             Ask AI 
//           </button>
//         </div>
//       </div>

//       {showAskAi && <AdminAiModal task={task} onClose={() => setShowAskAi(false)} />}
//     </>
//   );
// };

// export default AdminModal;
import React, { useState } from "react";
import axios from "axios";
import { X, UploadCloud, FileUp, FileDown, Trash2, Sparkles, MessageCircle, Send } from "lucide-react";
import AdminAiModal from "./AdminAiModal"; 

const AdminModal = ({ task, onClose, onUploadSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [showAskAi, setShowAskAi] = useState(false);
  const [adminComment, setAdminComment] = useState(task.AdminComments || "");
  const [submittingComment, setSubmittingComment] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const totalFiles = selectedFiles.length + files.length;
    if (totalFiles > 5) {
      alert(`You can only upload a maximum of 5 files.`);
      return;
    }
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleRemove = (idx) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) return alert("No files selected");

    setUploading(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin-upload/${task._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      alert(`Uploaded ${res.data.uploadedCount || selectedFiles.length} file(s)`);
      setSelectedFiles([]);
      if (onUploadSuccess) onUploadSuccess(res.data);
      onClose();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(`Upload failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!adminComment.trim()) {
      alert("Please enter a comment");
      return;
    }

    setSubmittingComment(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin-comment/${task._id}`,
        { comment: adminComment },
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
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-blue-900 w-[600px] min-h-[750px] max-h-[90vh] overflow-y-auto rounded-2xl p-8 text-white shadow-2xl border border-indigo-400">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold tracking-wide flex items-center gap-2">
              <FileUp size={22} /> Manage Files & Comments
            </h2>
            <button onClick={onClose} className="hover:text-red-400 transition">
              <X size={22} />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-lg font-medium">
              Task: <span className="text-indigo-300">{task.domain}</span>
            </p>
          </div>

          {/* Comments Section */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-sm text-indigo-200 flex items-center gap-1">
              <MessageCircle size={16} /> Comments
            </h3>
            
            {/* Employee Comment Display */}
            {task.EmployeeComments && (
              <div className="bg-green-100 p-3 rounded mb-3 text-black text-sm">
                <p className="font-semibold text-green-800 mb-1">Employee's Comments:</p>
                <p className="whitespace-pre-wrap">{task.EmployeeComments}</p>
              </div>
            )}

            {/* Admin Comment Display */}
            {task.AdminComments && (
              <div className="bg-blue-100 p-3 rounded mb-3 text-black text-sm">
                <p className="font-semibold text-blue-800 mb-1">Your Previous Comment:</p>
                <p className="whitespace-pre-wrap">{task.AdminComments}</p>
              </div>
            )}

            {/* Admin Comment Input */}
            <div className="bg-indigo-100 p-3 rounded text-black h-[20vh]">
              <label className="block font-semibold text-indigo-900 mb-2 ">
                Add Your Comment:
              </label>
              <textarea
                value={adminComment}
                onChange={(e) => setAdminComment(e.target.value)}
                placeholder="Enter your comment for the employee..."
                className="w-full p-2 border border-indigo-300 rounded text-sm resize-vertical min-h-[8vh]"
                disabled={submittingComment}
              />
              <button
                onClick={handleCommentSubmit}
                disabled={submittingComment || !adminComment.trim()}
                className={`mt-2 px-4 py-2 rounded text-white font-medium flex items-center gap-2 h-[4vh] min-w-[7vw] ${
                  submittingComment || !adminComment.trim()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                <Send size={16} />
                {submittingComment ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-sm text-indigo-200 flex items-center gap-1">
              <FileDown size={16} /> Employee Uploaded Files
            </h3>
            <div className="bg-indigo-100 p-3 rounded text-black text-sm">
              {task.employeeFiles?.length > 0 ? (
                <ul className="list-disc ml-4 space-y-1">
                  {task.employeeFiles.map((file, idx) => (
                    <li key={idx}>
                      <a href={file} className="hover:underline" target="_blank" rel="noopener noreferrer">
                        File {idx + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                "No files uploaded by employee"
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-sm text-indigo-200 flex items-center gap-1">
              <FileUp size={16} /> Your Attachments
            </h3>
            <div className="bg-indigo-100 p-3 rounded text-black text-sm">
              {task.adminFiles?.length > 0 ? (
                <ul className="list-disc ml-4 space-y-1">
                  {task.adminFiles.map((file, idx) => (
                    <li key={idx}>
                      <a href={file} className="hover:underline" target="_blank" rel="noopener noreferrer">
                        File {idx + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                "No files from admin"
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-indigo-200">
              Attach Files (Max 5) - Currently selected: {selectedFiles.length}
            </label>
            <input
              type="file"
              multiple
              accept="*/*"
              className="w-full file:bg-indigo-600 file:text-white file:px-3 file:py-1 file:rounded-lg file:cursor-pointer text-sm bg-indigo-50 text-black rounded-lg p-2 mb-3"
              onChange={handleFileChange}
              disabled={uploading}
            />
            {selectedFiles.length > 0 && (
              <div className="bg-indigo-100 rounded p-2 text-black text-sm max-h-24 overflow-y-auto">
                <ul className="space-y-1">
                  {selectedFiles.map((file, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      {file.name}
                      <button
                        onClick={() => handleRemove(idx)}
                        disabled={uploading}
                        className="text-red-600 text-xs hover:underline flex items-center gap-1"
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading || selectedFiles.length === 0}
            className={`w-full py-3 rounded-lg font-medium flex justify-center items-center gap-2 transition ${
              uploading || selectedFiles.length === 0
                ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                : "bg-indigo-700 hover:bg-indigo-800 text-white"
            }`}
          >
            <UploadCloud size={18} />
            {uploading ? "Uploading..." : `Upload ${selectedFiles.length} File${selectedFiles.length !== 1 ? "s" : ""}`}
          </button>

          {/* AI Ask Button */}
          <button
            onClick={() => setShowAskAi(true)}
            className="w-full mt-3 py-3 rounded-lg font-medium flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            <Sparkles size={18} />
            Ask AI 
          </button>
        </div>
      </div>

      {showAskAi && <AdminAiModal task={task} onClose={() => setShowAskAi(false)} />}
    </>
  );
};

export default AdminModal;