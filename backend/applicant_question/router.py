from typing import Optional, List
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from db.db import get_db, engine
from .repositories import Applicant_Question_Repo
import users.models as models
from .schemas import Applicant_Question, Applicant_Question_Create
from . import models

models.Base.metadata.create_all(bind=engine)

router = APIRouter()

@router.post('/add_question', tags=["Applicant_Question"], status_code=201)
async def add_question(question_content: str, possible_answers: List[str], db: Session = Depends(get_db)):
    """
    Add an applicant question and store it in the database
    """

    question = Applicant_Question_Create(id=2, question_content=question_content, possible_answers=possible_answers)
    return await Applicant_Question_Repo.create(db=db, question=question)

@router.get('/get_question', tags=["Applicant_Question"])
async def get_question (question_id: int, db: Session = Depends(get_db))-> Optional[Applicant_Question]:
    """
    Return the question with the given question ID, or raise exception if not found
    """
    db_question = Applicant_Question_Repo.fetch_by_id(db=db, question_id=question_id)
    if db_question is None:
        raise HTTPException(status_code=404, detail="Question not found with the given ID")

    return db_question

@router.get('/get_all_questions', tags=["Applicant_Question"])
async def get_all_questions(db: Session = Depends(get_db)) -> List[Applicant_Question]:
    """
    Get a list of all the applicant questions in the database
    """
    return Applicant_Question_Repo.fetch_all(db)


@router.post('/update_question', tags=["Applicant_Question"])
async def update_question (question_id: int, question_content: str, db: Session = Depends(get_db)) -> Optional[Applicant_Question]:
    """
    Update a question that already exists in the database
    """
    db_question = Applicant_Question_Repo.fetch_by_id(db=db, question_id=question_id)
    if db_question is None:
        raise HTTPException(status_code=404, detail="Question not found with the given ID")

    updated_question = Applicant_Question(id=question_id, question_content=question_content, possible_answers=db_question.possible_answers)

    Applicant_Question_Repo.update(db=db, question_data=updated_question)

    return updated_question

@router.delete("/delete_question", tags=["Applicant_Question"])
async def delete_question(question_id: int, db: Session = Depends(get_db)) -> int:
    """
    Delete a question that exists in the database
    """
    db_question = Applicant_Question_Repo.fetch_by_id(db=db, question_id=question_id)
    if db_question is None:
        raise HTTPException(status_code=404, detail="Question not found with the given ID")

    await Applicant_Question_Repo.delete(db=db, question_id=question_id)
    return 0


