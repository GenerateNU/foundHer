from typing import Optional, List
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from db.db import get_db, engine
from .repositories import Applicant_Question_Repo
from .schemas import Applicant_Question, Applicant_Question_Create, Applicant_Question_Update
from . import models

models.Base.metadata.create_all(bind=engine)

router = APIRouter()

@router.post('/applicant-questions', tags=["Applicant_Question"], status_code=201)
async def add_question(question_request: Applicant_Question_Create, db: Session = Depends(get_db)) -> Optional[Applicant_Question]: #question_content: str, possible_answers: List[str], db: Session = Depends(get_db)):
    """
    Add an applicant question and store it in the database
    """
    json_compatible_question_data = await Applicant_Question_Repo.create(db=db, question=question_request)

    return jsonable_encoder(json_compatible_question_data)

@router.get('/applicant-questions/{question_id}', tags=["Applicant_Question"])
async def get_question (question_id: int, db: Session = Depends(get_db)) -> Optional[Applicant_Question]:
    """
    Return the question with the given question ID, or raise exception if not found
    """
    db_question: Applicant_Question = Applicant_Question_Repo.fetch_by_id(db=db, question_id=question_id)
    if db_question is None:
        raise HTTPException(status_code=404, detail= f"Question not found with the given ID: {question_id}")

    return db_question

@router.get('/all-applicant-questions', tags=["Applicant_Question"])
async def get_all_questions(db: Session = Depends(get_db)) -> List[Applicant_Question]:
    """
    Get a list of all the applicant questions in the database
    """
    all_applicant_questions = Applicant_Question_Repo.fetch_all(db)

    return jsonable_encoder(all_applicant_questions)


@router.put('/applicant-questions/{question_id}', tags=["Applicant_Question"])
async def update_question (question_request: Applicant_Question_Update, db: Session = Depends(get_db)) -> Optional[Applicant_Question]: #question_id: int, question_content: str db: Session = Depends(get_db)) -> Optional[Applicant_Question]:
    """
    Update a question that already exists in the database
    """
    db_question: Applicant_Question = Applicant_Question_Repo.fetch_by_id(db, question_request.id)
    if db_question:
        updated_question = jsonable_encoder(question_request)
        db_question.question_content = updated_question["question_content"]
        db_question.possible_answers = updated_question["possible_answers"]
        db_question.min_value = updated_question["min_value"]
        db_question.max_value = updated_question["max_value"]
        db_question.question_type = updated_question["question_type"]
        db_question.unit = updated_question["unit"]
        json_compatible_question = await Applicant_Question_Repo.update(db=db, question_data=db_question, id=question_request.id)
    else:
        raise HTTPException(status_code=400, detail=f"Question not found with the given ID: {question_request.id}")

    return jsonable_encoder(json_compatible_question)

@router.delete("/applicant-questions/{question_id}", tags=["Applicant_Question"])
async def delete_question(question_id: int, db: Session = Depends(get_db)) -> int:
    """
    Delete a question that exists in the database
    """
    db_question: Applicant_Question = Applicant_Question_Repo.fetch_by_id(db=db, question_id=question_id)
    if db_question is None:
        raise HTTPException(status_code=404, detail= f"Question not found with the given ID: {question_id}")
    
    json_compatible_delete = await Applicant_Question_Repo.delete(db=db, question_id=question_id)

    return jsonable_encoder(json_compatible_delete)

