from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Union, List
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from db.db import get_db
from .repositories import EmployerAnswerRepo
from fastapi import APIRouter
import users.models as models
from db.db import engine
from .schemas import EmployerAnswer, EmployerAnswerCreate, EmployerAnswerUpdate
from fastapi.encoders import jsonable_encoder

models.Base.metadata.create_all(bind=engine)

router = APIRouter()

@router.post('/employer-answers', tags=['EmployerAnswer'], response_model=EmployerAnswer,status_code=201)
async def create_answer(answer_request: EmployerAnswerCreate, db: Session = Depends(get_db)):
    """
    Create an employer answer and store it in the database
    """
    
    # db_employer_answer = EmployerAnswersRepo.fetch_by_id(db, id=answer_request.id)
    # if db_employer_answer:
    #     raise HTTPException(status_code=400, detail="Employer Answer already exists!")
    json_compatible_item_data = await EmployerAnswersRepo.create(db=db, employer_answer=answer_request)
    return jsonable_encoder(json_compatible_item_data)


@router.get('/employer-answers/{employer_answer_id}', tags=['EmployerAnswer'], response_model=EmployerAnswer)
def get_employer_answer(employer_answer_id: int, db: Session=Depends(get_db)):
    db_employer_answer = EmployerAnswersRepo.fetch_by_id(db, employer_answer_id)
    if db_employer_answer is None:
        raise HTTPException(status_code=404, detail=f'Employer Answer {employer_answer_id} not found')
    return db_employer_answer

@router.get('/all-employer-answers', tags=['EmployerAnswer'], response_model=List[EmployerAnswer])
def get_employer_all_answer(db: Session=Depends(get_db)):
    all_db_employer_answer = EmployerAnswersRepo.fetch_all(db)
    # if db_employer_answer is None:
    #     raise HTTPException(status_code=404, detail=f'Employer Answer {employer_answer_id} not found')

    return jsonable_encoder(all_db_employer_answer)

@router.put('/employer-answers/{employer_answer_id}', tags=['EmployerAnswer'], response_model=EmployerAnswer)
async def get_employer_answer(answer_request: EmployerAnswerUpdate, db: Session=Depends(get_db)):
    json_compatible_item_data = await EmployerAnswersRepo.update(db=db, employer_answer=answer_request, id=answer_request.id)

    return jsonable_encoder(json_compatible_item_data)

@router.delete('/employer-answers/{employer_answer_id}', tags=['EmployerAnswer'], response_model=EmployerAnswer)
async def delete_employer_answer(employer_answer_id: int, db: Session=Depends(get_db)):
    db_employer_answer = await EmployerAnswersRepo.delete(db=db, _id = employer_answer_id)
    return jsonable_encoder(db_employer_answer)