from fastapi import APIRouter, HTTPException
from app.models.schemas import GradeRequest, GradeResponse
from app.services.grading_service import grade_submission_by_id
from app.services.auto_grader import trigger_auto_grading

router = APIRouter()

@router.post("/grade", response_model=GradeResponse)
def grade_submission(data: GradeRequest):
    try:
        grade_submission_by_id(data.submission_id)
        return {"message": "Grading completed successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/grade/pending")
def grade_pending():
    trigger_auto_grading()
    return {"message": "Pending submissions graded."}