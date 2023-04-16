from sqlalchemy.orm import Session

from . import models, schemas

class EmployerAnswersRepo:
    
 async def create(db: Session, employer_answer: schemas.EmployerAnswerCreate):
        db_employer_answer = models.EmployerAnswer(question_id=employer_answer.question_id, 
                                            applicant_id=employer_answer.user_id, 
                                            range_answer=employer_answer.range_answer, 
                                            question_type=employer_answer.question_type,
                                            multiple_choice_answer=employer_answer.multiple_choice_answer, 
                                            open_ended_answer=employer_answer.open_ended_answer, 
                                            ranked_answer=employer_answer.ranked_answer)
        db.add(db_employer_answer)
        db.commit()
        db.refresh(db_employer_answer)
        return db_employer_answer
    
 def fetch_by_id(db: Session,_id):
     return db.query(models.EmployerAnswer).filter(models.EmployerAnswer.id == _id).first()
 
 def fetch_all(db: Session, skip: int = 0, limit: int = 100):
     return db.query(models.EmployerAnswer).offset(skip).limit(limit).all()
 
 async def delete(db: Session, _id: int):
     db_employer_answer= db.query(models.EmployerAnswer).filter_by(id=_id).first()
     db.delete(db_employer_answer)
     db.commit()
     return db_employer_answer
     
     
 async def update(db: Session, employer_answer_data, id: int):
    db.query(models.EmployerAnswer).filter(models.EmployerAnswer.id == id).update({"answers": employer_answer_data.answers}, synchronize_session="fetch")
    db.commit()
    db_ea = EmployerAnswersRepo.fetch_by_id(db, id)
    return db_ea
    