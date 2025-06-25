import axios from "axios";
import fs from "fs";
import path from "path";
import os from "os";
import { v4 as uuidv4 } from "uuid";
import mammoth from "mammoth";


const CODE_EXTENSIONS = [
  ".js", ".ts", ".jsx", ".tsx", ".py", ".java", ".cpp", ".c", ".cc", ".h",
  ".cs", ".rb", ".php", ".go", ".rs", ".sh", ".bat", ".json", ".xml", ".yml", ".yaml", ".html", ".css"
];

const downloadAndParseFile = async (url) => {
  const ext = path.extname(url).toLowerCase();
  const fileName = `${uuidv4()}${ext}`;
  const tempDir = os.tmpdir();
  const filePath = path.join(tempDir, fileName);

  try {
    const response = await axios.get(url, { responseType: "stream" });
    const writer = fs.createWriteStream(filePath);
    await new Promise((resolve, reject) => {
      response.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    let content = "";
    let type = "text";

    if ([".jpg", ".jpeg", ".png"].includes(ext)) {
      const buffer = fs.readFileSync(filePath);
      content = buffer.toString("base64");
      type = "image";
    } else if (ext === ".pdf") {
      try {
        const pdfParse = (await import("pdf-parse")).default;
        const data = await pdfParse(fs.readFileSync(filePath));
        content = data.text;
      } catch (pdfError) {
        console.warn("PDF parsing failed:", pdfError.message);
        content = "PDF parsing failed. Please use text or image files for full content analysis.";
      }
    } else if (ext === ".docx") {
      const result = await mammoth.extractRawText({ buffer: fs.readFileSync(filePath) });
      content = result.value;
    } else if (ext === ".txt" || CODE_EXTENSIONS.includes(ext)) {
      content = fs.readFileSync(filePath, "utf-8");
      type = "code";
    } else {
      content = "Unsupported file format.";
    }

    fs.unlinkSync(filePath);
    return { content, type };

  } catch (error) {
    console.error("Error downloading/parsing file:", error);
    try {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch {}
    throw new Error("File processing failed");
  }
};

export default downloadAndParseFile;