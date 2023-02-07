from sqlalchemy.orm import Session

from . import models, schemas

class EmployerAnswersRepo:
    
 async def create(db: Session, employer_answer: schemas.EmployerAnswerCreate):
        db_employer_answer = models.EmployerAnswer(user_id=employer_answer.user_id,question_id=employer_answer.question_id,answers=employer_answer.answers)
        db.add(db_employer_answer)
        db.commit()
        db.refresh(db_employer_answer)
        return db_employer_answer
    
 def fetch_by_id(db: Session,_id):
     return db.query(models.EmployerAnswer).filter(models.EmployerAnswer.id == _id).first()
 
 def fetch_all(db: Session, skip: int = 0, limit: int = 100):
     return db.query(models.EmployerAnswer).offset(skip).limit(limit).all()
 
 async def delete(db: Session,employer_answer_id):
     db_employer_answer= db.query(models.EmployerAnswer).filter_by(id=employer_answer_id).first()
     db.delete(db_employer_answer)
     db.commit()
     return db_employer_answer
     
     
 async def update(db: Session,employer_answer_data):
    db.query(models.EmployerAnswer).filter(models.EmployerAnswer.id == id).update({"answers": employer_answer_data.answers}, synchronize_session="fetch")
    stuff = EmployerAnswersRepo.fetch_by_id(db, id)
    return stuff
    