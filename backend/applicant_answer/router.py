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
import users.models as models
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
    
    db_answer = Applicant_Answer_Repo.fetch_by_id(db, answer_request.id)
    if db_answer:
        updated_question = jsonable_encoder(answer_request)
        db_answer.question_content = updated_question["question_content"]
        db_answer.possible_answers = updated_question["possible_answers"]
        json_compatible_question = await Applicant_Answer_Repo.update(db=db, question_data=answer_request, id=answer_request.id)
    else:
        raise HTTPException(status_code=400, detail=f"Question not found with the given ID: {answer_request.id}")

    return jsonable_encoder(json_compatible_question)

@router.delete("/applicant-answers/{answer_id}", tags=["Applicant_Answer"])
async def delete_question_answer_for_applicant(answer_id: int, db: Session = Depends(get_db)) -> int:
    """
    Delete an answer that exists in the database
    """
    db_question = Applicant_Answer_Repo.fetch_by_id(db=db, id=answer_id)
    if db_question is None:
        raise HTTPException(status_code=404, detail= f"Answer not found with the given ID: {answer_id}")

    json_compatible_delete = await Applicant_Answer_Repo.delete(db=db, answer_id=answer_id)

    return jsonable_encoder(json_compatible_delete)

@router.get("/applicant-answers/{answer_id}", tags=["Applicant_Answer"])
async def get_question_answer_for_applicant(answer_id: int, db: Session = Depends(get_db)) -> Optional[Applicant_Answer]:
    """
        Get the Applicant Answer that corresponds to the given ID
    """
    db_answer = Applicant_Answer_Repo.fetch_by_id(db, answer_id)
    if db_answer is None:
        raise HTTPException(status_code=404, detail= f"Answer not found with the given ID: {answer_id}")
    
    return jsonable_encoder(db_answer)

@router.get('/all-applicant-answers/{applicant_id}', tags=["Applicant_Answer"])
async def get_all_question_answers_for_applicant(applicant_id: int, db: Session = Depends(get_db)) -> List[Applicant_Answer]:
    """
        Get all answers for a given applicant based on that applicant's ID
    """
    all_applicant_answers = Applicant_Answer_Repo.fetch_by_applicant_id(db, applicant_id)

    return jsonable_encoder(all_applicant_answers)

