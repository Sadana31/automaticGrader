import asyncio
from app.core.firebase import db
from app.services.grading_service import grade_submission_by_id

async def auto_grade_loop():
    while True:
        print("Checking for ungraded submissions...")
        submissions = db.collection("submissions") \
            .where("status", "==", "Pending") \
            .stream()
        for submission in submissions:
            submission_id = submission.id
            try:
                print(f"Auto grading {submission_id}")
                grade_submission_by_id(submission_id)
                print(f"Finished grading {submission_id}")
            except Exception as e:
                print(f"Error grading {submission_id}: {e}")
        await asyncio.sleep(30)

def trigger_auto_grading():
    submissions = db.collection("submissions") \
        .where("status", "==", "Pending") \
        .stream()
    for submission in submissions:
        submission_id = submission.id
        try:
            grade_submission_by_id(submission_id)
        except Exception as e:
            print(f"Manual trigger error for {submission_id}: {e}")