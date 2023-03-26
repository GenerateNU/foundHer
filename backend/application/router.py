from typing import Optional, List
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from db.db import get_db, engine
from .repositories import Application_Repo
import users.models as models
from .schemas import Application, Application_Create
from . import models

models.Base.metadata.create_all(bind=engine)

router = APIRouter()

@router.post('/application', tags=["Application"], status_code=201)
async def add_application(application_request: Application_Create, db: Session = Depends(get_db)) -> Optional[Application]: #question_content: str, possible_answers: List[str], db: Session = Depends(get_db)):
    """
    Add an application and store it in the database
    """
    json_compatible_application_data = await Application_Create.create(db=db, application=application_request)

    return jsonable_encoder(json_compatible_application_data)

@router.get('/application:{application_id}', tags=["Application"])
async def get_application(application_id: int, db: Session = Depends(get_db)) -> Optional[Application]:
    """
    Return the application with the given application ID, or raise exception if not found
    """
    db_application = Application_Repo.fetch_by_id(db=db, application_id=application_id)
    if db_application is None:
        raise HTTPException(status_code=404, detail= f"Application not found with the given ID: {application_id}")

    return db_application

@router.get('/application/applicant:{applicant_id}', tags=["Application"])
async def get_application_applicant(applicant_id: int, db: Session = Depends(get_db)) -> Optional[Application]:
    """
    Return the application with the given applicant user ID, or raise exception if not found
    """
    db_application = Application_Repo.fetch_by_id(db=db, applicant_id=applicant_id)
    if db_application is None:
        raise HTTPException(status_code=404, detail= f"Application not found with the given applicant ID: {applicant_id}")

    return db_application

@router.get('/application/posting:{posting_id}', tags=["Application"])
async def get_application_posting(posting_id: int, db: Session = Depends(get_db)) -> Optional[Application]:
    """
    Return the application with the given application ID, or raise exception if not found
    """
    db_application = Application_Repo.fetch_by_id(db=db, posting_id=posting_id)
    if db_application is None:
        raise HTTPException(status_code=404, detail= f"Application not found with the given postion ID: {posting_id}")

    return db_application

@router.get('/all-applications', tags=["Application"])
async def get_all_applications(db: Session = Depends(get_db)) -> List[Application]:
    """
    Get a list of all the applicantions in the database
    """
    all_applicant_questions = Application_Repo.fetch_all(db)

    return jsonable_encoder(all_applicant_questions)

