from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Union, List
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from db.db import get_db, engine
from .repositories import JobPostingRepo
from fastapi import APIRouter
from .schemas import JobPostingBase, JobPostingCreate, JobPostingUpdate, JobPosting
from fastapi.encoders import jsonable_encoder
from . import models

models.Base.metadata.create_all(bind=engine)

router = APIRouter()

@router.post('/job-posting', tags=['JobPosting'], response_model=JobPosting, status_code=201)
async def create_job_posting(posting_request: JobPostingCreate, db: Session = Depends(get_db)):

    json_compatible_item_data = await JobPostingRepo.create(db=db, job_posting=posting_request)
    return jsonable_encoder(json_compatible_item_data)


@router.get('/job-posting:{job_posting_id}', tags=['JobPosting'], response_model=JobPosting)
def get_job_posting(job_posting_id: int, db: Session=Depends(get_db)):
    db_job_posting = JobPostingRepo.fetch_by_id(db, job_posting_id)
    if db_job_posting is None:
        raise HTTPException(status_code=404, detail=f'Employer Question {job_posting_id} not found')
    return jsonable_encoder(db_job_posting)

@router.get('/job-posting/employer:{employer_id}', tags=['JobPosting'], response_model=List[JobPosting])
def get_job_posting_employer(employer_id: int, db: Session=Depends(get_db)):
    db_job_posting = JobPostingRepo.fetch_by_employer_id(db, employer_id)
    if db_job_posting is None:
        raise HTTPException(status_code=404, detail=f'Employer Question {employer_id} not found')
    return jsonable_encoder(db_job_posting)

@router.get('/all-job-postings', tags=['JobPosting'], response_model=List[JobPosting])
def get_employer_all_job_postings(db: Session=Depends(get_db)):
    all_db_job_posting = JobPostingRepo.fetch_all(db)
    # if db_employer_question is None:
    #     raise HTTPException(status_code=404, detail=f'Employer Question {employer_question_id} not found')

    return jsonable_encoder(all_db_job_posting)

@router.put('/job-posting:{employer_question_id}', tags=['JobPosting'], response_model=JobPosting)
async def get_job_posting(job_posting: JobPostingUpdate, db: Session=Depends(get_db)):
    json_compatible_item_data = await JobPostingRepo.update(db=db, employer_id=job_posting.employer_id, description = job_posting.description,
                                                           created_at=job_posting.created_at, location=job_posting.location,
                                                                    experience_level = job_posting.experience_level)

    #     json_compatible_item_data = await EmployerQuestionsRepo.update(db=db, employer_question=question_request, id=question_request.id)

    return jsonable_encoder(json_compatible_item_data)



@router.delete('/job_posting:{job_posting_id}', tags=['JobPosting'], response_model=JobPosting)
async def delete_employer_question(job_posting_id: int, db: Session=Depends(get_db)):
    db_job_posting = await JobPostingRepo.delete(db=db, _id = job_posting_id)
    return jsonable_encoder(db_job_posting)
