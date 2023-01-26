from typing import Union, List
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
import uvicorn
from typing import Optional

from sqlalchemy import null

from .applicant_answer.models import Applicant_Answer
from .applicant_question.models import Applicant_Question

app = FastAPI()
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read():
    return {"welcome": "you"}

@app.post('/add_question')
async def add_question(question_content: str):#, possible_answers: List[str]):
    print("hello")
    return {"Adding question/"}

@app.get('/get_question')
async def get_question (question_id: int) : #-> Optional[Applicant_Question]:
    return {'/get_question'}

@app.get('/get_all_questions')
async def get_all_questions(): # -> List[Applicant_Question]:
        print("Getting all questions with no data given")
        return "Getting all questions with no data given"


@app.post('/update_question')
async def update_question (question_id: int, question_content: str)-> Optional[Applicant_Question]:
    return "updating question "

@app.delete("/delete_question")
async def delete_question(DELETE) -> int:
    return "deleting question"

@app.post("/add_question_answer_for_applicant")
async def add_question_answer_for_applicant(question_id: int, answer: str, user_id: int) -> Optional[Applicant_Answer]:
    return "add_question_answer_for_applicant"

@app.post("/update_question_answer_for_applicant")

async def update_question_answer_for_applicant(answer_id: int, question_id: int, answer: str) -> Optional[Applicant_Answer]:
    return "update_question_answer_for_applicant"

@app.delete("/delete_question_answer_for_applicant")
async def delete_question_answer_for_applicant(answer_id: int) -> int:
    return "delete_question_answer_for_applicant"

# this return -1 if failed
@app.get('/get_question_answer_for_applicant')
async def get_question_answer_for_applicant(answer_id: int) -> Optional[Applicant_Answer]:
    return "get_question_answer_for_applicant"

@app.get('/get_all_question_answers_for_applicant')
async def get_all_question_answers_for_applicant(applicant_id: int) -> List[Applicant_Answer]:
    return "get_all_question_answers_for_applicant"

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)
