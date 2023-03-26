
from sqlalchemy.orm import Session
from datetime import datetime

from . import models, schemas


class Application_Repo:
    
    async def create(db: Session, application: schemas.Application_Create):
        db_question = models.Application(applicant_id=application.applicant_id, posting_id=application.posting_id, created_at=datetime.now())
        db.add(db_question)
        db.commit()
        db.refresh(db_question)
        return db_question
    
    def fetch_by_id(db: Session, id: int):
        return db.query(models.Application).filter(models.Application.id == id).first()
    
    def fetch_by_applicant_id(db: Session, applicant_id: int):
        return db.query(models.Application).filter(models.Application.applicant_id == applicant_id).all()
    
    def fetch_by_posting_id(db: Session, posting_id: int):
        return db.query(models.Application).filter(models.Application.posting_id == posting_id).all()
 
    def fetch_all(db: Session, skip: int = 0, limit: int = 100):
        return db.query(models.Application).offset(skip).limit(limit).all()
 