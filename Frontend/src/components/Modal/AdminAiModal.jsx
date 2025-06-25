import React, { useState } from "react";
import axios from "axios";
import { X, Sparkles, FileText, CheckCircle, File  } from "lucide-react";

function AdminAiModal({ task, onClose }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const suggestedPrompts = [
    "Does the submission match the task description?",
    "Is the employee's work complete and accurate?",
    "How does the employee submission compare to admin files?",
    "What improvements can be suggested for the submission?"
  ];

  const handleAsk = async () => {
    if (typeof prompt !== "string" || !prompt.trim()) return;

    setLoading(true);
    setAiResponse(""); 
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/${task._id}/askai`,
        { 
          prompt: prompt.trim(),
          timestamp: Date.now() 
        },
        { withCredentials: true }
      );
      setAiResponse(res.data.response);
    } catch (err) {
      console.error("AI error:", err);
      alert("AI assistant failed to respond.");
      setAiResponse("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 ">
      <div className="bg-indigo-800 text-white text-md rounded-xl w-[700px] max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative ">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-md hover:text-red-500 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-2">
            <Sparkles className="text-indigo-200" size={24} />
            Admin AI Assistant
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-200">
            <FileText size={16} />
            <span className='text-lg'>Task: {task.domain}</span>
          </div>
        </div>

        <div className="bg-gray-300 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 gap-4 text-sm text-black">
            <div>
              <File size={18} className="inline-block mr-1 mb-1.5" />
              <span className="font-medium text-lg text-black">Employee Files:</span>
              <span className="ml-2 font-medium text-lg">{task.employeeFiles?.length || 0}</span>
            </div>
            <div>
              <File size={18} className="inline-block mr-1 mb-1.5" />
              <span className="font-medium text-lg"> Admin Files:</span>
              <span className="ml-2 font-medium text-lg">{task.adminFiles?.length || 0}</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-md font-medium text-gray-200 mb-2">💡 Suggested Prompts:</h3>
          <div className="grid grid-cols-1 gap-2 ">
            {suggestedPrompts.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setPrompt(item);
                  if (aiResponse) {
                    setAiResponse(""); 
                  }
                }}
                className="text-left text-md bg-indigo-50 hover:bg-indigo-100 text-indigo-700 p-2 rounded-md transition-colors"
                disabled={loading}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-md font-medium text-gray-200 mb-2">
            Or ask your own question:
          </label>
          <textarea
            placeholder="Or type your own question..."
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              if (aiResponse) {
                setAiResponse(""); 
              }
            }}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={3}
            disabled={loading}
          />
        </div>

        <button
          onClick={handleAsk}
          disabled={loading || !prompt.trim()}
          className={`w-full py-3 px-4 rounded-md mb-4 flex items-center justify-center gap-2 font-medium transition-all ${
            loading || !prompt.trim()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg"
          }`}
        >
          <Sparkles size={18} />
          {loading ? "AI is thinking..." : "Ask AI"}
        </button>

        {aiResponse && (
          <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-md">
            <div className="flex items-start gap-2 mb-2">
              <Sparkles className="text-indigo-600 flex-shrink-0 mt-1" size={16} />
              <h3 className="text-md text-indigo-900">AI Analysis:</h3>
            </div>
            <div className="text-md  text-black whitespace-pre-wrap max-h-60 overflow-y-auto">
              {aiResponse}
            </div>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-gray-200">AI is analyzing your task and files...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminAiModal;