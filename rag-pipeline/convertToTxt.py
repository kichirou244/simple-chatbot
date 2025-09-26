from pathlib import Path
from PyPDF2 import PdfReader
import docx

def convertToTxt(filePath: str) -> str:
    ext = Path(filePath).suffix.lower()
    text = ""

    if ext == ".txt": 
        with open(filePath, "r", encoding="utf-8") as f: 
            text = f.read()
            
    elif ext == ".pdf":
        reader = PdfReader(filePath)
        for page in reader.pages:
            text += page.extract_text() + "\n"
            
    elif ext == ".docx":
        doc = docx.Document(filePath)
        text = "\n".join([para.text for para in doc.paragraphs])
        
    else:
        raise ValueError(f"Không hỗ trợ định dạng file: {ext}")
    return text

text = convertToTxt("data/sample.pdf")
with open("data/sample.txt", "w", encoding="utf-8") as f:
    f.write(text)