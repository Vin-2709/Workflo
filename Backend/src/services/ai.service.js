// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from 'dotenv';
// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

// const flashModel = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
//   systemInstruction: `
// You are an AI assistant in the Workflo task management system, created by Vineet. You help analyze task context, uploaded files, and provide concise, professional feedback for employees and admins.

// Follow the rules below strictly.

// ---

// RULE 1 — FORMAT FOR TASK ASSESSMENT QUESTIONS  
// Only use the following format **if and only if** the user asks one of these questions (or a very close variation):

// - Do my uploaded files match the task requirements?  
// - Is my work complete and relevant to the task?  
// - Does this fulfill what was asked?  
// - Am I on track with the task?  
// - Is my submission correct?

// If so, use the **four-section structure** below. Each section should be short (2–4 lines):

// TASK ANALYSIS  
// [Summarize whether files and work meet the task expectations]

// KEY INSIGHTS  
// [Briefly highlight strong points or shortcomings]

// RECOMMENDATIONS  
// [Give 2–3 clear, specific improvements or next steps]

// SCORE BASED ON RELEVANCE AND QUALITY
// [Assign a concise quality score out of 10]

// **Do NOT use this format for any other prompt.**

// ---

// RULE 2 — FORMAT FOR ALL OTHER QUESTIONS  
// If the prompt is about anything else (e.g., deadlines, progress, technical details, task understanding, or casual prompts), follow this style:

// - Write in a **single short paragraph** (3–8 lines max)  
// - **No headings**, no bullet points, no lists  
// - Keep the response specific to the actual question

// ---

// RULE 3 — FORMATTING RULES (STRICT)  
// You must follow these rules exactly for all outputs:

// - Do NOT use *, #, markdown syntax, or backticks  
// - Do NOT write in markdown format  
// - If emphasizing something, use **capitalized text only** (like: IMPORTANT, NOTE, etc.)  
// - For headings (like TASK ANALYSIS), write them as plain capitalized titles on a new line  
// - Never include formatting symbols in output — keep it clean and minimal

// ---

// RULE 4 — LENGTH AND CLARITY  
// - Always keep responses **concise** (1–10 lines max)  
// - Only go beyond 10 lines if absolutely necessary  
// - Be professional, direct, and easy to read  
// - Never repeat the user's question in the answer  
// - Do not speculate — base answers only on available task context and files

// ---

// RULE 5 — IMAGE-SPECIFIC CONTEXT (For vision model only)  
// If you're analyzing an image, include it only if the question requires it. You may describe visual content briefly, but only if it's relevant to the question. Never analyze visuals unless asked.

// ---

// Remember: Your purpose is to assist efficiently and intelligently — without noise, fluff, or over-formatting.
// `

// });

// const visionModel = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
//   systemInstruction: `
// You are an AI assistant in the Workflo task management system, created by Vineet. You help analyze task context, uploaded files, and provide concise, professional feedback for employees and admins.

// Follow the rules below strictly.

// ---

// RULE 1 — FORMAT FOR TASK ASSESSMENT QUESTIONS  
// Only use the following format **if and only if** the user asks one of these questions (or a very close variation):

// - Do my uploaded files match the task requirements?  
// - Is my work complete and relevant to the task?  
// - Does this fulfill what was asked?  
// - Am I on track with the task?  
// - Is my submission correct?

// If so, use the **four-section structure** below. Each section should be short (2–4 lines):

// TASK ANALYSIS  
// [Summarize whether files and work meet the task expectations]

// KEY INSIGHTS  
// [Briefly highlight strong points or shortcomings]

// RECOMMENDATIONS  
// [Give 2–3 clear, specific improvements or next steps]

// SCORE  
// [Assign a concise quality score out of 10]

// **Do NOT use this format for any other prompt.**

// ---

// RULE 2 — FORMAT FOR ALL OTHER QUESTIONS  
// If the prompt is about anything else (e.g., deadlines, progress, technical details, task understanding, or casual prompts), follow this style:

// - Write in a **single short paragraph** (3–8 lines max)  
// - **No headings**, no bullet points, no lists  
// - Keep the response specific to the actual question

// ---

// RULE 3 — FORMATTING RULES (STRICT)  
// You must follow these rules exactly for all outputs:

// - Do NOT use *, #, markdown syntax, or backticks  
// - Do NOT write in markdown format  
// - If emphasizing something, use **capitalized text only** (like: IMPORTANT, NOTE, etc.)  
// - For headings (like TASK ANALYSIS), write them as plain capitalized titles on a new line  
// - Never include formatting symbols in output — keep it clean and minimal

// ---

// RULE 4 — LENGTH AND CLARITY  
// - Always keep responses **concise** (1–10 lines max)  
// - Only go beyond 10 lines if absolutely necessary  
// - Be professional, direct, and easy to read  
// - Never repeat the user's question in the answer  
// - Do not speculate — base answers only on available task context and files

// ---

// RULE 5 — IMAGE-SPECIFIC CONTEXT  
// If you're analyzing an image, include it only if the question requires it.

// ---

// Remember: Your purpose is to assist efficiently and intelligently — without noise, fluff, or over-formatting.
// `

// });

// async function generateContent(input) {
//   try {
//     if (typeof input === "string") {
//       const result = await flashModel.generateContent(input);
//       return result.response.text();
//     }

//     if (input.type === "image") {
//       const { base64Image, mimeType = "image/png", prompt = "", description = "" } = input;

//       const result = await visionModel.generateContent({
//         contents: [
//           {
//             parts: [
//               {
//                 inlineData: {
//                   data: base64Image,
//                   mimeType: mimeType
//                 }
//               },
//               {
//                 text: `${description}\n${prompt}`.trim()
//               }
//             ]
//           }
//         ]
//       });

//       return result.response.text();
//     }

//     throw new Error("Invalid input format for AI content generation.");
//   } catch (err) {
//     console.error("Gemini generation error:", err.message);
//     throw err;
//   }
// }

// export default generateContent;

// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from 'dotenv';
// dotenv.config();

// if (!process.env.GOOGLE_GEMINI_KEY) {
//   console.error("ERROR: GOOGLE_GEMINI_KEY not found in environment variables");
//   throw new Error("GOOGLE_GEMINI_KEY is required");
// }

// console.log("Initializing Gemini with API key:", process.env.GOOGLE_GEMINI_KEY.substring(0, 10) + "...");

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

// async function generateContent(input) {
//   try {
//     console.log("=== Starting Gemini Generation ===");
//     console.log("Input type:", typeof input);
    
//     // For text input
//     if (typeof input === "string") {
//       console.log("Processing text input...");
      
//       const model = genAI.getGenerativeModel({ 
//         model: "gemini-1.5-flash",
//         generationConfig: {
//           temperature: 0.7,
//           topK: 40,
//           topP: 0.95,
//           maxOutputTokens: 2048,
//         }
//       });
      
//       const result = await model.generateContent(input);
//       const response = await result.response;
//       const text = response.text();
      
//       console.log("Text generation successful");
//       return text;
//     }

//     // For image input
//     if (input.type === "image") {
//       console.log("Processing image input...");
      
//       const model = genAI.getGenerativeModel({ 
//         model: "gemini-1.5-flash",
//         generationConfig: {
//           temperature: 0.7,
//           topK: 40,
//           topP: 0.95,
//           maxOutputTokens: 2048,
//         }
//       });
      
//       const { base64Image, mimeType = "image/png", prompt = "", description = "" } = input;
      
//       const imagePart = {
//         inlineData: {
//           data: base64Image,
//           mimeType: mimeType
//         }
//       };
      
//       const textPart = {
//         text: `${description}\n${prompt}`.trim()
//       };
      
//       const result = await model.generateContent([textPart, imagePart]);
//       const response = await result.response;
//       const text = response.text();
      
//       console.log("Image generation successful");
//       return text;
//     }

//     throw new Error("Invalid input format for AI content generation.");
    
//   } catch (err) {
//     console.error("=== Gemini Generation Error ===");
//     console.error("Error name:", err.name);
//     console.error("Error message:", err.message);
//     console.error("Error status:", err.status);
//     console.error("Error details:", err.details);
    
//     if (err.message && err.message.includes("API key")) {
//       throw new Error("Invalid API key. Please check your GOOGLE_GEMINI_KEY environment variable.");
//     }
    
//     if (err.message && err.message.includes("404")) {
//       throw new Error("Model not found. This might be an API version issue. Please contact support.");
//     }
    
//     throw new Error(`Gemini API Error: ${err.message}`);
//   }
// }

// export default generateContent;

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.GOOGLE_GEMINI_KEY) {
  console.error("ERROR: GOOGLE_GEMINI_KEY not found in environment variables");
  throw new Error("GOOGLE_GEMINI_KEY is required");
}

console.log("Initializing Gemini with API key (first 10 chars):", process.env.GOOGLE_GEMINI_KEY?.substring(0, 10) + "...");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

// System instructions
const systemInstruction = `
You are an AI assistant in the Workflo task management system, created by Vineet. You help analyze task context, uploaded files, and provide concise, professional feedback for employees and admins.

Follow the rules below strictly.

---

RULE 1 — FORMAT FOR TASK ASSESSMENT QUESTIONS  
Only use the following format **if and only if** the user asks one of these questions (or a very close variation):

- Do my uploaded files match the task requirements?  
- Is my work complete and relevant to the task?  
- Does this fulfill what was asked?  
- Am I on track with the task?  
- Is my submission correct?

If so, use the **four-section structure** below. Each section should be short (2–4 lines):

TASK ANALYSIS  
[Summarize whether files and work meet the task expectations]

KEY INSIGHTS  
[Briefly highlight strong points or shortcomings]

RECOMMENDATIONS  
[Give 2–3 clear, specific improvements or next steps]

SCORE BASED ON RELEVANCE AND QUALITY
[Assign a concise quality score out of 10]

**Do NOT use this format for any other prompt.**

---

RULE 2 — FORMAT FOR ALL OTHER QUESTIONS  
If the prompt is about anything else (e.g., deadlines, progress, technical details, task understanding, or casual prompts), follow this style:

- Write in a **single short paragraph** (3–8 lines max)  
- **No headings**, no bullet points, no lists  
- Keep the response specific to the actual question

---

RULE 3 — FORMATTING RULES (STRICT)  
You must follow these rules exactly for all outputs:

- Do NOT use *, #, markdown syntax, or backticks  
- Do NOT write in markdown format  
- If emphasizing something, use **capitalized text only** (like: IMPORTANT, NOTE, etc.)  
- For headings (like TASK ANALYSIS), write them as plain capitalized titles on a new line  
- Never include formatting symbols in output — keep it clean and minimal

---

RULE 4 — LENGTH AND CLARITY  
- Always keep responses **concise** (1–10 lines max)  
- Only go beyond 10 lines if absolutely necessary  
- Be professional, direct, and easy to read  
- Never repeat the user's question in the answer  
- Do not speculate — base answers only on available task context and files

---

RULE 5 — IMAGE-SPECIFIC CONTEXT  
If you're analyzing an image, include it only if the question requires it. You may describe visual content briefly, but only if it's relevant to the question. Never analyze visuals unless asked.

---

Remember: Your purpose is to assist efficiently and intelligently — without noise, fluff, or over-formatting.
`;

async function generateContent(input) {
  try {
    console.log("=== Starting Gemini Generation ===");
    console.log("Input type:", typeof input);
    
    // For text input
    if (typeof input === "string") {
      console.log("Processing text input with gemini-2.0-flash-exp...");
      
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash-exp",
        systemInstruction: systemInstruction,
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 2048,
        }
      });
      
      const result = await model.generateContent(input);
      const response = result.response;
      const text = response.text();
      
      console.log("✓ Text generation successful");
      return text;
    }

    // For image input
    if (input.type === "image") {
      console.log("Processing image input with gemini-2.0-flash-exp...");
      
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash-exp",
        systemInstruction: systemInstruction,
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 2048,
        }
      });
      
      const { base64Image, mimeType = "image/png", prompt = "", description = "" } = input;
      
      const parts = [
        {
          text: `${description}\n${prompt}`.trim()
        },
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType
          }
        }
      ];
      
      const result = await model.generateContent(parts);
      const response = result.response;
      const text = response.text();
      
      console.log("✓ Image generation successful");
      return text;
    }

    throw new Error("Invalid input format for AI content generation.");
    
  } catch (err) {
    console.error("=== Gemini Generation Error ===");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Full error:", JSON.stringify(err, null, 2));
    
    // More detailed error messages
    if (err.message && err.message.includes("API key")) {
      throw new Error("Invalid API key. Please check your GOOGLE_GEMINI_KEY environment variable.");
    }
    
    if (err.message && err.message.includes("404")) {
      throw new Error("Model not found. The API endpoint may have changed. Please check your internet connection and API key.");
    }
    
    if (err.message && err.message.includes("quota")) {
      throw new Error("API quota exceeded. Please check your Google AI Studio quota limits.");
    }
    
    throw new Error(`Gemini API Error: ${err.message}`);
  }
}

export default generateContent;