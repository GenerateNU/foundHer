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
from .schemas import Applicant_Answer_Base, Applicant_Answer_Create
from . import models

models.Base.metadata.create_all(bind=engine)

router = APIRouter()

@router.post("/add_question_answer_for_applicant")
async def add_question_answer_for_applicant(question_id: int, answer: str, user_id: int): #-> Optional[Applicant_Answer]:
    return "add_question_answer_for_applicant"

@router.post("/update_question_answer_for_applicant")

async def update_question_answer_for_applicant(answer_id: int, question_id: int, answer: str): #-> Optional[Applicant_Answer]:
    return "update_question_answer_for_applicant"

@router.delete("/delete_question_answer_for_applicant")
async def delete_question_answer_for_applicant(answer_id: int) -> int:
    return "delete_question_answer_for_applicant"

# this return -1 if failed
@router.get('/get_question_answer_for_applicant')
async def get_question_answer_for_applicant(answer_id: int): #-> Optional[Applicant_Answer]:
    return "get_question_answer_for_applicant"

@router.get('/get_all_question_answers_for_applicant')
async def get_all_question_answers_for_applicant(applicant_id: int): #-> List[Applicant_Answer]:
    return "get_all_question_answers_for_applicant"