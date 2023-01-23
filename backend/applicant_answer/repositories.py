
from sqlalchemy.orm import Session

from . import models, schemas


class Applicant_Answer_Repo:
    
 async def create(db: Session, answer: schemas.Applicant_Answer_Create):
        db_answer = models.Applicant_Answer(id=answer.id,question_id=answer.question_id,answers=answer.answers)
        db.add(db_answer)
        db.commit()
        db.refresh(db_answer)
        return db_answer
    
 def fetch_by_id(db: Session,_id):
     return db.query(models.Applicant_Answer).filter(models.Applicant_Answer.id == _id).first()
 
 def fetch_by_question_id(db: Session,question_id):
     return db.query(models.Applicant_Answer).filter(models.Applicant_Answer.question_id == question_id).first()
 
 def fetch_all(db: Session, skip: int = 0, limit: int = 100):
     return db.query(models.Applicant_Answer).offset(skip).limit(limit).all()
 
 async def delete(db: Session,answer_id):
     db_answer= db.query(models.Applicant_Answer).filter_by(id=answer_id).first()
     db.delete(db_answer)
     db.commit()
     
     
 async def update(db: Session,answer_data):
    updated_answer = db.merge(answer_data)
    db.commit()
    return updated_answer
