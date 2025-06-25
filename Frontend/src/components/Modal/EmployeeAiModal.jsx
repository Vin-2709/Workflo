import React, { useState } from "react";
import axios from "axios";
import { X, Sparkles, FileText, CheckCircle } from "lucide-react";

const AskAiModal = ({ task, onClose }) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState(null);

  const suggestedPrompts = [
    "Do my uploaded files match the task requirements?",
    "Summarize what this task is asking me to do",
    "Is my work complete and relevant to the task?",
    "What improvements can I make to my submission?",
    "Compare my files with the admin's provided files",
    "Help me understand the task deadline and priority"
  ];

  const handleAsk = async () => {
    if (typeof prompt !== "string" || !prompt.trim()) return;

    setLoading(true);
    setResponse("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/${task._id}/askai`,
        { prompt },
        { withCredentials: true }
      );
      setResponse(res.data.response);
      setContext(res.data.context || null);
    } catch (err) {
      console.error("AI error:", err);
      alert("AI assistant failed to respond.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed  inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-indigo-800 rounded-xl w-[700px] max-h-[80vh] overflow-y-auto p-6 shadow-2xl relative text-gray-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-100 hover:text-red-500 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl text-white font-bold flex items-center gap-3 mb-2">
            <Sparkles className="text-white" size={24} />
            Ask AI About This Task
          </h2>
          <div className="flex items-center gap-2 text-md text-gray-100">
            <FileText size={16} />
            <span>Task: {task.domain}</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Status:</span>
              <span
                className={`ml-2 px-2 py-1 rounded text-xs ${
                  task.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : task.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {task.status}
              </span>
            </div>
            <div>
              <span className="font-medium">Files:</span>
              <span className="ml-2">
                Admin: {task.adminFiles?.length || 0}, Yours: {task.employeeFiles?.length || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-200 mb-2">Quick Questions:</h3>
          <div className="grid grid-cols-1 gap-2">
            {suggestedPrompts.map((item, index) => (
              <button
                key={index}
                onClick={() => setPrompt(item)}
                className="text-left text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 p-2 rounded-md transition-colors"
                disabled={loading}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Or ask your own question:
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Is my work relevant? or Summarize the task."
            className="w-full p-3 border border-gray-300 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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

        {context && (
          <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-200">
            <div className="flex items-center gap-2 text-sm text-blue-800">
              <CheckCircle size={16} />
              <span>
                Analyzed {context.adminFilesProcessed} admin files and{" "}
                {context.employeeFilesProcessed} your files
                {context.hasImages && " (including images)"}
              </span>
            </div>
          </div>
        )}

        {response && (
          <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-md">
            <div className="flex items-start gap-2 mb-2">
              <Sparkles className="text-indigo-600 flex-shrink-0 mt-1" size={16} />
              <h3 className="font-medium text-indigo-900">AI Analysis:</h3>
            </div>
            <div className="text-sm text-gray-800 whitespace-pre-wrap max-h-60 overflow-y-auto">
              {response}
            </div>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-gray-600">AI is analyzing your task and files...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AskAiModal;


