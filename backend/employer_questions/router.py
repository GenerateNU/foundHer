from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Union
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from db.db import get_db
from .repositories import EmployerQuestionsRepo
from fastapi import APIRouter
import users.models as models
from db.db import engine
from .schemas import EmployerQuestion, EmployerQuestionCreate
from fastapi.encoders import jsonable_encoder

models.Base.metadata.create_all(bind=engine)

router = APIRouter()

@router.post('/employer-questions', tags=['EmployerQuestion'], response_model=EmployerQuestion,status_code=201)
async def create_question(question_request: EmployerQuestionCreate, db: Session = Depends(get_db)):
    """
    Create an employer question and store it in the database
    """
    
    # db_employer_question = EmployerQuestionsRepo.fetch_by_id(db, id=question_request.id)
    # if db_employer_question:
    #     raise HTTPException(status_code=400, detail="Employer Question already exists!")
    json_compatible_item_data = await EmployerQuestionsRepo.create(db=db, employee_question=question_request)
    return jsonable_encoder(json_compatible_item_data)


@router.get('/employer-questions/{employer_question_id}', tags=['EmployerQuestion'], response_model=EmployerQuestion)
def get_employer_question(employer_question_id: int, db: Session=Depends(get_db)):
    db_employer_question = EmployerQuestionsRepo.fetch_by_id(db, employer_question_id)
    if db_employer_question is None:
        raise HTTPException(status_code=404, detail=f'Employer Question {employer_question_id} not found')
    return db_employer_question

# @router.get('/employer-questions')
# async def get_employer_question(employer_question_id: int, db: Session=Depends(get_db)):
#     return {"welcome": "you"}



