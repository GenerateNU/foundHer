from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Union, List
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from ..db.db import get_db, engine
from .repositories import EmployerJobPostingRepo
from fastapi import APIRouter
import users.models as models
from .schemas import EmployerJobPostingBase, EmployerJobPostingCreate, EmployerJobPostingPosting, EmployerJobPostingUpdate, EmployerJobPosting
from fastapi.encoders import jsonable_encoder

models.Base.metadata.create_all(bind=engine)

router = APIRouter()

@router.post('/employer-job-posting', tags=['EmployerJobPosting'], response_model=EmployerJobPosting, status_code=201)
async def create_question(question_request: EmployerJobPostingCreate, db: Session = Depends(get_db)):

    json_compatible_item_data = await EmployerJobPostingRepo.create(db=db, employer_question=question_request)
    return jsonable_encoder(json_compatible_item_data)


@router.get('/employer-job-posting/{employer_job_posting_id}', tags=['EmployerJobPosting'], response_model=EmployerJobPosting)
def get_employer_question(employer_question_id: int, db: Session=Depends(get_db)):
    db_employer_job_posting = EmployerJobPostingRepo.fetch_by_id(db, employer_question_id)
    if db_employer_job_posting is None:
        raise HTTPException(status_code=404, detail=f'Employer Question {employer_question_id} not found')
    return jsonable_encoder(db_employer_job_posting)

@router.get('/all-employer-job-postings', tags=['EmployerJobPosting'], response_model=List[EmployerJobPosting])
def get_employer_all_job_postings(db: Session=Depends(get_db)):
    all_db_employer_job_posting = EmployerJobPostingRepo.fetch_all(db)
    # if db_employer_question is None:
    #     raise HTTPException(status_code=404, detail=f'Employer Question {employer_question_id} not found')

    return jsonable_encoder(all_db_employer_job_posting)

@router.put('/employer-job-posting/{employer_question_id}', tags=['EmployerJobPosting'], response_model=EmployerJobPosting)
async def get_employer_job_posting(employer_job_posting: EmployerJobPostingUpdate, db: Session=Depends(get_db)):
    json_compatible_item_data = await EmployerJobPostingRepo.update(db=db, employer_id=employer_job_posting.employer_id, description = employer_job_posting.description,
                                                           created_at=employer_job_posting.created_at, location=employer_job_posting.location,
                                                                    experience_level = employer_job_posting.experience_level))

    #     json_compatible_item_data = await EmployerQuestionsRepo.update(db=db, employer_question=question_request, id=question_request.id)

    return jsonable_encoder(json_compatible_item_data)



@router.delete('/employer-questions/{employer_question_id}', tags=['EmployerQuestion'], response_model=EmployerJobPosting)
async def delete_employer_question(employer_question_id: int, db: Session=Depends(get_db)):
    db_employer_question = await EmployerJobPostingRepo.delete(db=db, _id = employer_question_id)
    return jsonable_encoder(db_employer_question)
