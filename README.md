# NEXUS EVALUATOR

Nexus Evaluator is an automated assignment evaluation system designed to streamline the grading workflow for teachers and provide faster feedback for students.

The platform allows students to upload handwritten or typed assignments, extracts the text using OCR, evaluates responses using AI, and returns structured feedback and scores.

The system combines modern frontend technologies with AI-powered backend services to automate the evaluation pipeline.

---

## Tech Stack

### Frontend

* React
* TailwindCSS
* React Router

### Backend

* FastAPI (Python)

### AI & Processing

* PyTesseract – Optical Character Recognition (OCR) for extracting text from uploaded assignments
* Gemini API – AI-powered grading and evaluation

### Cloud & Storage

* Firebase

  * Authentication
  * Database
  * User management
* Supabase

  * Assignment file storage

---

## System Architecture

The evaluation pipeline works as follows:

1. Student uploads an assignment through the frontend.
2. The file is stored in Supabase storage.
3. Backend retrieves the file.
4. PyTesseract performs OCR to extract the text from the document.
5. Extracted content is processed by the Gemini API.
6. Gemini evaluates the answers and generates structured grading feedback.
7. Results are stored in Firebase.
8. Students and teachers can view evaluations through the dashboard.

---

## Project Structure

### Backend (FastAPI)

```
app/
│
├── api/
│
├── core/
│   ├── config.py
│   ├── firebase.py
│   ├── gemini_client.py
│   └── supabase_client.py
│
├── models/
│   └── schemas.py
│
├── services/
│   ├── auto_grader.py
│   ├── extraction_service.py
│   └── grading_service.py
│
└── main.py
```

**Key Components**

* `config.py`
  Manages environment configuration and API keys.

* `firebase.py`
  Handles Firebase authentication and database interactions.

* `gemini_client.py`
  Wrapper for Gemini API communication.

* `supabase_client.py`
  Handles file storage operations.

* `extraction_service.py`
  Runs OCR using PyTesseract.

* `grading_service.py`
  Sends extracted responses to Gemini for grading.

* `auto_grader.py`
  Coordinates the full grading pipeline.

---

### Frontend (React)

```
src/
│
├── app/
│   ├── App.jsx
│   └── routes.jsx
│
├── components/
│   ├── layout/
│   ├── Button.jsx
│   └── ProgressBar.jsx
│
├── pages/
│   ├── public/
│   ├── student/
│   └── teacher/
│
├── services/
│   ├── firebase.js
│   ├── supabase.js
│   ├── studentService.js
│   └── teacherService.js
│
├── context/
├── hooks/
│
└── index.js
```

<img width="2266" height="1256" alt="image" src="https://github.com/user-attachments/assets/e5275ecf-a592-4bb9-a300-9e33436817fc" />


**Main UI Modules**

Student Panel

* Assignment Upload
  <img width="2877" height="1403" alt="image" src="https://github.com/user-attachments/assets/852b88bb-724b-4160-82ff-62667338947e" />

* Evaluation Dashboard
  <img width="2371" height="1457" alt="image" src="https://github.com/user-attachments/assets/b24a72ad-b466-4d25-a2e8-970c589c0625" />

* Submission History
<img width="2378" height="926" alt="image" src="https://github.com/user-attachments/assets/8ea87117-9081-4a17-be80-7bde6ffafc21" />

* Profile
  <img width="1814" height="1432" alt="image" src="https://github.com/user-attachments/assets/dbbee5d4-53d3-4b31-9d78-91f6735a8c82" />


Teacher Panel

* Create Assignments
  <img width="1822" height="1476" alt="image" src="https://github.com/user-attachments/assets/41c08f28-d6c7-477a-ad4b-eb60616418f3" />

* View Submissions
<img width="2876" height="1462" alt="image" src="https://github.com/user-attachments/assets/de1280ef-0c1a-49d0-9375-25578756e40f" />

* Review Evaluations
  <img width="2058" height="1462" alt="image" src="https://github.com/user-attachments/assets/f332bf7d-8c90-45c9-a8ed-d71c3db52d4b" />

* Teacher Dashboard
<img width="2877" height="1476" alt="image" src="https://github.com/user-attachments/assets/6a25e202-f797-4b42-b764-58896e997820" />

---

## Features

### Student

* Upload assignments
* Track evaluation progress
* View grades and AI feedback
* Access submission history

### Teacher

* Create assignments
* View student submissions
* Review AI-generated grading
* Monitor evaluation results

### AI Pipeline

* OCR-based text extraction
* AI-driven grading
* Automated feedback generation

---

## Environment Variables

Create a `.env` file in both frontend and backend.

### Backend `.env`

```
GEMINI_API_KEY=your_gemini_key

SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
```

### Frontend `.env`

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---
## Future Improvements

* Rubric based grading
* Multi-question structured evaluation
* Model fine-tuning for domain subjects
* Analytics dashboard for teachers
* Plagiarism detection
* Batch assignment processing

