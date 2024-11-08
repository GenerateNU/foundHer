from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Union, Optional, List
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from db.db import get_db, engine
from .repositories import Applicant_Answer_Repo
from fastapi import APIRouter
from .schemas import Applicant_Answer, Applicant_Answer_Base, Applicant_Answer_Create, Applicant_Answer_Update
from . import models

models.Base.metadata.create_all(bind=engine)

router = APIRouter()

@router.post("/applicant-answers", tags=["Applicant_Answer"], status_code = 201)
async def add_question_answer_for_applicant(answer_request: Applicant_Answer_Create, db: Session = Depends(get_db)) -> Optional[Applicant_Answer]:
    """
        Add an answer to the Applicant_Answers database
    """
    json_compatible_answer_data = await Applicant_Answer_Repo.create(db=db, answer=answer_request)
    return jsonable_encoder(json_compatible_answer_data)

@router.put("/applicant-answers/{answer_id}", tags=["Applicant_Answer"])
async def update_question_answer_for_applicant(answer_request: Applicant_Answer_Update, db: Session = Depends(get_db)) -> Optional[Applicant_Answer]:
    """
        Update an existing Applicant_Answer
    """
    
    db_answer: Applicant_Answer = Applicant_Answer_Repo.fetch_by_id(db, answer_request.id)
    if db_answer:
        db_answer.question_id = answer_request["question_id"]
        db_answer.applicant_id = answer_request["applicant_id"]
        db_answer.multiple_choice_answer = answer_request["multiple_choice_answer"]
        db_answer.open_ended_answer = answer_request["open_ended_answer"]
        db_answer.ranked_answer = answer_request["ranked_answer"]
        db_answer.range_answer = answer_request["range_answer"]

        json_compatible_question = await Applicant_Answer_Repo.update(db=db, answer_data=answer_request, id=answer_request.id)
    else:
        raise HTTPException(status_code=400, detail=f"Question not found with the given ID: {answer_request.id}")

    return jsonable_encoder(json_compatible_question)

@router.delete("/applicant-answers/{answer_id}", tags=["Applicant_Answer"])
async def delete_question_answer_for_applicant(answer_id: int, db: Session = Depends(get_db)) -> int:
    """
    Delete an answer that exists in the database
    """
    db_question = Applicant_Answer_Repo.fetch_by_id(db=db, answer_id=answer_id)
    if db_question is None:
        raise HTTPException(status_code=404, detail= f"Answer not found with the given ID: {answer_id}")

    json_compatible_delete = await Applicant_Answer_Repo.delete(db=db, answer_id=answer_id)

    return jsonable_encoder(json_compatible_delete)


@router.get("/applicant-answers/{applicant_id}", tags=["Applicant_Answer"])
async def get_question_answer_for_applicant(applicant_id: int, db: Session = Depends(get_db)) -> Optional[Applicant_Answer]:
    """
        Get the Applicant Answer that corresponds to the given ID
    """
    db_answers = Applicant_Answer_Repo.fetch_by_applicant_id(db, applicant_id)
    print("Aaaa")
    print(db_answers)
    return jsonable_encoder(db_answers)

@router.get('/all-applicant-answers/{applicant_id}', tags=["Applicant_Answer"])
async def get_all_question_answers_for_applicant(applicant_id: int, db: Session = Depends(get_db)) -> List[Applicant_Answer]:
    """
        Get all answers for a given applicant based on that applicant's ID
    """
    all_applicant_answers = Applicant_Answer_Repo.fetch_by_applicant_id(db, applicant_id)

    return jsonable_encoder(all_applicant_answers)

