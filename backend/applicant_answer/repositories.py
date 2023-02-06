
from sqlalchemy.orm import Session

from . import models, schemas


class Applicant_Answer_Repo:
    async def create(db: Session, answer: schemas.Applicant_Answer_Create):
        db_answer = models.Applicant_Answer(question_id=answer.question_id, applicant_id=answer.applicant_id, answers=answer.answers)
        db.add(db_answer)
        db.commit()
        db.refresh(db_answer)
        return db_answer
    
    def fetch_by_id(db: Session, answer_id):
        return db.query(models.Applicant_Answer).filter(models.Applicant_Answer.id == answer_id).first()
        
    def fetch_by_question_id(db: Session,question_id):
        return db.query(models.Applicant_Answer).filter(models.Applicant_Answer.question_id == question_id).first()
 
    def fetch_all(db: Session, skip: int = 0, limit: int = 100):
        return db.query(models.Applicant_Answer).offset(skip).limit(limit).all()

    def fetch_by_applicant_id(db: Session, applicant_id):
        return db.query(models.Applicant_Answer).filter(models.Applicant_Answer.applicant_id == applicant_id).all()
 
    async def delete(db: Session, answer_id):
        db_answer= db.query(models.Applicant_Answer).filter_by(id=answer_id).first()
        db.delete(db_answer)
        db.commit()
        return 0
     
     
    async def update(db: Session, answer_data: schemas.Applicant_Answer_Update, id: int):
        db.query(models.Applicant_Question).filter(models.Applicant_Question.id == id).update({"question_id": answer_data.question_id, "applicant_id": answer_data.applicant_id,\
            "answers": answer_data.answers}, synchronize_session="fetch")
        db.commit()
        return answer_data
