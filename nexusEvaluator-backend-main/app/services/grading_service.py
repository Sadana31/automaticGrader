import json
import tempfile
import requests
from google.genai import types
from app.core.gemini_client import gemini_client
from app.core.firebase import db
from app.core.supabase_client import supabase
from app.services.extraction_service import extract_text
from firebase_admin import firestore


def grade_with_gemini(instructions, rubric, essay_text, max_score):

    prompt = f"""
    You are a university professor grading a student submission.

    STRICT RULES:
    - Be unbiased.
    - Follow the rubric strictly.
    - Final score must be between 0 and {max_score}.
    - Return ONLY valid JSON.
    - Do NOT wrap JSON in markdown.
    - No explanations outside JSON.

    ASSIGNMENT INSTRUCTIONS:
    {instructions}

    GRADING RUBRIC:
    {rubric}

    STUDENT SUBMISSION:
    {essay_text}

    Return JSON:
    {{
      "score": number,
      "evaluation_summary": "text",
      "strengths": ["..."],
      "areas_for_improvement": ["..."],
      "specific_revision_suggestions": ["..."]
    }}
    """

    response = gemini_client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=0.2
        )
    )

    raw_text = response.text.strip()

    if raw_text.startswith("```"):
        raw_text = raw_text.split("```")[1]
        raw_text = raw_text.replace("json", "", 1).strip()

    parsed = json.loads(raw_text)
    return parsed


def grade_submission_by_id(submission_id: str):

    submission_ref = db.collection("submissions").document(submission_id)
    submission = submission_ref.get()

    if not submission.exists:
        raise Exception("Submission not found")

    submission_data = submission.to_dict()

    if submission_data.get("status") == "evaluated":
        print("Already evaluated.")
        return

    assignment_ref = db.collection("assignments") \
        .document(submission_data["assignmentId"])
    assignment_data = assignment_ref.get().to_dict()

    signed = supabase.storage.from_("submissions") \
        .create_signed_url(submission_data["filePath"], 60)

    file_url = signed.get("signedURL") or signed.get("signedUrl")

    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        response = requests.get(file_url)
        tmp.write(response.content)
        tmp_path = tmp.name

    text = extract_text(tmp_path, submission_data["filePath"])

    ai_result = grade_with_gemini(
        assignment_data["instructions"],
        assignment_data["rubric"],
        text,
        assignment_data["maxScore"]
    )

    db.collection("evaluations").add({
        "submissionId": submission_id,
        "score": ai_result["score"],
        "evaluation_summary": ai_result["evaluation_summary"],
        "strengths": ai_result["strengths"],
        "areas_for_improvement": ai_result["areas_for_improvement"],
        "specific_revision_suggestions":
            ai_result["specific_revision_suggestions"],
        "createdAt": firestore.SERVER_TIMESTAMP
    })

    submission_ref.update({
        "status": "evaluated",
        "evaluatedAt": firestore.SERVER_TIMESTAMP
    })