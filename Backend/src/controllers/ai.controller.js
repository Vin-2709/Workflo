import taskmodel from '../models/task.js';
import generateContent from "../services/ai.service.js";
import downloadAndParseFile from "../utils/filedownloader.js";

export const askAI = async (req, res) => {
    const { prompt } = req.body;
    
    if (!prompt) {
        return res.status(400).json({ 
            success: false, 
            message: "Prompt is required" 
        });
    }

    const isTaskAssessmentPrompt = (text = "") => {
        const keywords = [
            "match", "complete", "relevant", "submission", "on track",
            "fulfill", "compare", "improvement", "files", "task"
        ];
        return keywords.some(word => text.toLowerCase().includes(word));
    };

    try {
        const task = await taskmodel.findById(req.params.id)
            .populate('assignedTo assignedBy');
            
        if (!task) {
            return res.status(404).json({ 
                success: false, 
                message: "Task not found" 
            });
        }

        const processFiles = async (fileUrls = []) => {
            const results = [];
            for (const url of fileUrls) {
                try {
                    const { content, type } = await downloadAndParseFile(url);
                    results.push({ url, content, type });
                } catch (err) {
                    results.push({ 
                        url, 
                        content: "Failed to process this file", 
                        type: "error" 
                    });
                }
            }
            return results;
        };

        const adminFiles = await processFiles(task.adminFiles);
        const employeeFiles = await processFiles(task.employeeFiles);

        const allFiles = [...adminFiles, ...employeeFiles];
        const hasImages = allFiles.some(file => file.type === "image");
        const firstImage = allFiles.find(file => file.type === "image");

        const taskInfo = `
TASK INFORMATION:
- Domain: ${task.domain}
- Description: ${task.description}
- Status: ${task.status}
- Deadline: ${task.deadline ? new Date(task.deadline).toLocaleDateString() : 'Not set'}
- Assigned by: ${task.assignedBy?.name || 'Unknown'}
- Assigned to: ${task.assignedTo?.name || 'Unknown'}
- Latest comment: ${task.comment || 'No comments'}
        `.trim();

        const summarizeFiles = (label, files) =>
            `${label} (${files.length}):\n${files.map((file, i) =>
                `File ${i + 1}: ${file.type === "image" ? "[Image file]" : file.content.slice(0, 500)}...`
            ).join('\n')}`;

        const detailedFiles = (label, files) =>
            `${label} (${files.length}):\n${files.map((file, i) =>
                `--- ${label.slice(0, -1)} File ${i + 1} ---\n${file.content.slice(0, 2000)}${file.content.length > 2000 ? '...' : ''}`
            ).join('\n')}`;

        let finalInput;

        if (!isTaskAssessmentPrompt(prompt)) {
            finalInput = prompt;
        } else if (hasImages && firstImage) {
            const textContext = [
                taskInfo,
                summarizeFiles("ADMIN FILES", adminFiles),
                summarizeFiles("EMPLOYEE SUBMITTED FILES", employeeFiles),
                `USER QUESTION: ${prompt}`
            ].join('\n\n');

            finalInput = {
                type: "image",
                base64Image: firstImage.content,
                prompt: textContext,
                description: `Analyzing task files and content for: ${task.domain}`
            };
        } else {
            const textContext = [
                taskInfo,
                detailedFiles("ADMIN FILES", adminFiles),
                detailedFiles("EMPLOYEE SUBMITTED FILES", employeeFiles),
                `USER QUESTION: ${prompt}`,
                `Please analyze the above information and provide a helpful response. Consider:
1. Whether the employee's submitted files match the task requirements
2. If the work is complete and relevant
3. Any suggestions for improvement
4. Answer any specific questions about the task`
            ].join('\n\n');

            finalInput = textContext;
        }

        const response = await generateContent(finalInput);

        res.status(200).json({
            success: true,
            response,
            context: {
                adminFilesProcessed: adminFiles.length,
                employeeFilesProcessed: employeeFiles.length,
                hasImages
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "AI processing failed: " + error.message
        });
    }
};