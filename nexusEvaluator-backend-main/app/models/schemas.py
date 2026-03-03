from pydantic import BaseModel

class GradeRequest(BaseModel):
    submission_id: str

class GradeResponse(BaseModel):
    message: str

class EvaluationResponse(BaseModel):
    submissionId: str
    score: int
    evaluation_summary: str
    strengths: list[str]
    areas_for_improvement: list[str]
    specific_revision_suggestions: list[str]