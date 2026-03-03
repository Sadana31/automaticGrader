from fastapi import FastAPI
import asyncio
from app.services.auto_grader import auto_grade_loop
from app.api.routes import router

app = FastAPI()

app.include_router(router)

@app.on_event("startup")
async def start_auto_grader():
    asyncio.create_task(auto_grade_loop())