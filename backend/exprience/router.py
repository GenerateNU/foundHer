from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from db.db import get_db
from .repositories import ExperienceRepo
from fastapi import APIRouter
from db.db import engine
from .schemas import ExperienceBase, ExperienceCreate, ExperienceUpdate, Experience
from fastapi.encoders import jsonable_encoder
from typing import List
from . import models

models.Base.metadata.create_all(bind=engine)

router = APIRouter()

@router.post('/applicant-experiences', tags=['Experiences'], response_model=Experience,status_code=201)
async def create_question(experience_request: ExperienceCreate, db: Session = Depends(get_db)):
    """
    """
    json_compatible_item_data = await ExperienceRepo.create(db=db, experience=experience_request)
    return jsonable_encoder(json_compatible_item_data)

@router.get('/applicant-experiences/{applicant_id}', tags=['EmployerQuestion'], response_model=List[Experience])
def get_experience_by_id(applicant_id: int, db: Session=Depends(get_db)):
    db_experiences: List[Experience] = ExperienceRepo.fetch_by_applicant_id(db, applicant_id)
    print()
    return jsonable_encoder(db_experiences)


@router.put('/applicant-experiences/{experience_id}', tags=['EmployerQuestion'], response_model=Experience)
async def update_experience(experience: ExperienceCreate, experience_id: int, db: Session=Depends(get_db)):
    json_compatible_item_data = await ExperienceRepo.update(db=db, experience=experience, id=experience_id)
    return jsonable_encoder(json_compatible_item_data)


