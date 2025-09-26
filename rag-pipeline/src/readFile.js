import fs from "fs";

export default function readFile(filePath) {
  try {
    const text = fs.readFileSync(filePath, "utf-8");
    return text;
  } catch (error) {
    console.error(`Lỗi khi đọc tệp PDF ${filePath}:`, error.message);
    throw error;
  }
}
