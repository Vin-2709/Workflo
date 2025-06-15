import React, { useState } from "react";
import axios from "axios";
import { X } from 'lucide-react';
import { Upload } from 'lucide-react';
import { Files } from 'lucide-react';


const Modal = ({ task, onClose, onUploadSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // Limit to 5 files total
    const totalFiles = selectedFiles.length + files.length;
    if (totalFiles > 5) {
      alert(`You can only upload a maximum of 5 files. You currently have ${selectedFiles.length} files selected.`);
      return;
    }
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleRemove = (idx) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) return alert("No files selected");
    
    // Validate file count
    if (selectedFiles.length > 5) {
      alert("Maximum 5 files allowed");
      return;
    }
    
    setUploading(true);

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    // Debug logs
    console.log("Task ID:", task._id);
    console.log("Files to upload:", selectedFiles.length);
    console.log("FormData entries:", [...formData.entries()]);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/employee-upload/${task._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      console.log("Upload success:", res.data);
      alert(`Successfully uploaded ${res.data.uploadedCount || selectedFiles.length} files!`);
      
      if (onUploadSuccess) {
        onUploadSuccess(res.data);
      }
      
      setSelectedFiles([]);
      onClose();
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert(`Upload failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    
   <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-md flex items-center justify-center z-50 transition-opacity duration-300 opacity-100">
  <div className="bg-indigo-900 rounded-lg w-[600px] h-[670px] p-10 relative flex flex-col text-white shadow-lg shadow-black">
    <button onClick={onClose} className="self-end mb-1">
      <X size={30} />
    </button>

    <div className="flex justify-center mb-2">
      <Files className="mt-4" />
      <h2 className="text-[25px] font-bold mb-1 py-1 px-4 rounded-t-lg text-center">
        Manage Files
      </h2>
    </div>

    <p className="text-lg mb-4 font-semibold">Task: {task.domain}</p>

    {/* Files from Admin */}
    <div className="mb-6">
      <h3 className="font-medium mb-2">Files from Admin</h3>
      <div className="bg-gray-300 text-black p-4 rounded">
        {task.adminFiles && task.adminFiles.length > 0 ? (
          <ul className="space-y-1">
            {task.adminFiles.map((file, idx) => (
              <li key={idx} className="text-black hover:underline">
                <a href={file} target="_blank" rel="noopener noreferrer">
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

    {/* Your Uploaded Files */}
    <div className="mb-6">
      <h3 className="font-medium mb-2">Your Uploaded Files</h3>
      <div className="bg-gray-300 text-black p-4 rounded">
        {task.employeeFiles && task.employeeFiles.length > 0 ? (
          <ul className="space-y-1">
            {task.employeeFiles.map((file, idx) => (
              <li key={idx} className="text-black hover:underline">
                <a href={file} target="_blank" rel="noopener noreferrer">
                  File {idx + 1}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          "No files uploaded yet"
        )}
      </div>
    </div>

    <hr className="border-gray-300 mb-6" />

    {/* Upload Section */}
    <div>
      <label className="block font-medium mb-2">
        Upload Files (Max 5) - Currently selected: {selectedFiles.length}
      </label>
      <input
        type="file"
        multiple
        accept="*/*"
        className="block rounded py-2 mb-3 file:mr-4 file:text-white file:font-medium file:rounded file:cursor-pointer"
        onChange={handleFileChange}
        disabled={uploading}
      />

      {selectedFiles.length > 0 && (
        <ul className="space-y-2 mb-4 max-h-32 overflow-y-auto">
          {selectedFiles.map((f, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center bg-yellow-50 p-2 rounded"
            >
              <span className="text-gray-800 truncate">{f.name}</span>
              <button
                onClick={() => handleRemove(idx)}
                className="text-red-500 hover:underline ml-2 flex-shrink-0"
                disabled={uploading}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || selectedFiles.length === 0}
        className={`w-full py-3 rounded font-medium ${
          uploading || selectedFiles.length === 0
            ? "bg-gray-400 text-gray-900 cursor-not-allowed"
            : "bg-indigo-700 hover:bg-blue-700 text-white"
        }`}
      >
        <Upload className="inline mr-2" />
        {uploading
          ? "Uploading..."
          : `Upload ${selectedFiles.length} File${
              selectedFiles.length !== 1 ? "s" : ""
            }`}
      </button>
    </div>
  </div>
</div>


  );
};

export default Modal;



// <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-md flex items-center justify-center z-50 transition-opacity duration-300 opacity-100">


    //   <div className="bg-indigo-800 rounded-lg w-[600px] p-10 relative mt-10 flex flex-col text-indigo-800 ">
    //     <button
    //       onClick={onClose}
    //       className="place-self-end "
    //     >
    //       <X  size={30}/>
    //     </button>

    //     <h2 className=" text-[25px] font-bold mb-1  py-2 px-4 rounded-t-lg text-center">
    //       Manage Files
    //     </h2>
    //     <p className="text-lg text-indigo-800 mb-4 font-semibold">
    //       Task: {task.domain}
    //     </p>

    //     {/* Files from Admin */}
    //     <div className="mb-6">
    //       <h3 className="font-medium mb-2">Files from Admin</h3>
    //       <div className="bg-gray-100 text-black p-4 rounded">
    //         {task.adminFiles && task.adminFiles.length > 0 ? (
    //           <ul className="space-y-1">
    //             {task.adminFiles.map((file, idx) => (
    //               <li key={idx} className="text-black  hover:underline">
    //                 <a href={file} target="_blank" rel="noopener noreferrer">
    //                   File {idx + 1}
    //                 </a>
    //               </li>
    //             ))}
    //           </ul>
    //         ) : (
    //           "No files from admin"
    //         )}
    //       </div>
    //     </div>

    //     {/* Your Uploaded Files */}
    //     <div className="mb-6">
    //       <h3 className="font-medium mb-2">Your Uploaded Files</h3>
    //       <div className="bg-gray-100 p-4 rounded">
    //         {task.employeeFiles && task.employeeFiles.length > 0 ? (
    //           <ul className="space-y-1">
    //             {task.employeeFiles.map((file, idx) => (
    //               <li key={idx} className="text-black hover:underline">
    //                 <a href={file} target="_blank" rel="noopener noreferrer">
    //                   File {idx + 1}
    //                 </a>
    //               </li>
    //             ))}
    //           </ul>
    //         ) : (
    //           "No files uploaded yet"
    //         )}
    //       </div>
    //     </div>

    //     <hr className="border-gray-300 mb-6" />

    //     {/* Upload Section */}
    //     <div>
    //       <label className="block font-medium mb-2">
    //         Upload Files (Max 5) - Currently selected: {selectedFiles.length}
    //       </label>
    //       <input
    //         type="file"
    //         multiple
    //         accept="*/*"
    //         className="block w-[150pxx] border border-gray-300 rounded  py-2 mb-3 file:mr-4 file:text-black file:font-medium  file:rounded file:cursor-pointer "
    //         onChange={handleFileChange}
    //         disabled={uploading}
    //       />

    //       {selectedFiles.length > 0 && (
    //         <ul className="space-y-2 mb-4 max-h-32 overflow-y-auto ">
    //           {selectedFiles.map((f, idx) => (
    //             <li
    //               key={idx}
    //               className="flex justify-between items-center bg-yellow-50 p-2 rounded"
    //             >
    //               <span className="text-gray-800 truncate">{f.name}</span>
    //               <button
    //                 onClick={() => handleRemove(idx)}
    //                 className="text-red-500 hover:underline ml-2 flex-shrink-0"
    //                 disabled={uploading}
    //               >
    //                 Remove
    //               </button>
    //             </li>
    //           ))}
    //         </ul>
    //       )}

    //       <button
    //         onClick={handleUpload}
    //         disabled={uploading || selectedFiles.length === 0}
    //         className={`w-full py-3 rounded font-medium ${
    //           uploading || selectedFiles.length === 0
    //             ? "bg-gray-400 text-gray-200 cursor-not-allowed"
    //             : "bg-indigo-700 hover:bg-blue-700 text-white"
    //         }`}
    //       >
    //         {uploading ? "Uploading..." : `Upload ${selectedFiles.length} File${selectedFiles.length !== 1 ? 's' : ''}`}
    //       </button>
    //     </div>
    //   </div>
    // </div>