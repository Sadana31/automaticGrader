from PIL import Image
import fitz  
import docx
import pytesseract

def extract_text(file_path, original_path):
    original_path = original_path.lower()

    if original_path.endswith(".pdf"):
        return extract_text_from_pdf(file_path)
    elif original_path.endswith(".docx"):
        return extract_text_from_docx(file_path)
    else:
        raise Exception("Unsupported file type")

def extract_text_from_pdf(file_path):
    text = ""
    doc = fitz.open(file_path)

    for page in doc:
        page_text = page.get_text()
        if page_text.strip():
            text += page_text
        else:
            pix = page.get_pixmap()
            img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            text += pytesseract.image_to_string(img)

    return text

def extract_text_from_docx(file_path):
    doc = docx.Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs])
