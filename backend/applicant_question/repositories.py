
from sqlalchemy.orm import Session

from . import models, schemas


class Applicant_Question_Repo:
    
    async def create(db: Session, question: schemas.Applicant_Question_Create):
        db_question = models.Applicant_Question(id=question.id,question_content=question.question_content,possible_answers=question.possible_answers)
        db.add(db_question)
        db.commit()
        db.refresh(db_question)
        return db_question
    
    def fetch_by_id(db: Session, question_id):
        return db.query(models.Applicant_Question).filter(models.Applicant_Question.id == question_id).first()
 
    def fetch_all(db: Session, skip: int = 0, limit: int = 100):
        return db.query(models.Applicant_Question).offset(skip).limit(limit).all()
 
    async def delete(db: Session,question_id):
        db_question = db.query(models.Applicant_Question).filter_by(id=question_id).first()
        db.delete(db_question)
        db.commit()
     
     
    async def update(db: Session,question_data):
        question_data = db.merge(question_data)
        db.commit()
        return question_data
