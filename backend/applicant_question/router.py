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
from .repositories import Applicant_Question_Repo
from fastapi import APIRouter
import users.models as models
from .schemas import Applicant_Question_Base, Applicant_Question_Create
from . import models

models.Base.metadata.create_all(bind=engine)

router = APIRouter()

@router.post('/add_question')
async def add_question(question_content: str, possible_answers: List[str]):
    print("hello")
    return {"Adding question/"}

@router.get('/get_question')
async def get_question (question_id: int): #-> Optional[Applicant_Question]:
    return {'/get_question'}

@router.get('/get_all_questions')
async def get_all_questions(): # -> List[Applicant_Question]:
        print("Getting all questions with no data given")
        return "Getting all questions with no data given"


@router.post('/update_question')
async def update_question (question_id: int, question_content: str): #-> Optional[Applicant_Question]:
    return "updating question "

@router.delete("/delete_question")
async def delete_question(DELETE) -> int:
    return "deleting question"

