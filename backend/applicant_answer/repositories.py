
from sqlalchemy.orm import Session

from . import models, schemas


class Applicant_Answer_Repo:
    async def create(db: Session, answer: schemas.Applicant_Answer_Create):
        db_answer = models.Applicant_Answer(question_id=answer.question_id, 
                                            applicant_id=answer.applicant_id, 
                                            range_answer=answer.range_answer, 
                                            question_type=answer.question_type,
                                            multiple_choice_answer=answer.multiple_choice_answer, 
                                            open_ended_answer=answer.open_ended_answer, 
                                            ranked_answer=answer.ranked_answer)
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
        return db_answer
     
     
    async def update(db: Session, answer_data: schemas.Applicant_Answer_Update, id: int):
        db.query(models.Applicant_Answer).filter(models.Applicant_Answer.id == id).update({"question_id": answer_data.question_id, "applicant_id": answer_data.applicant_id,\
            "range_answer": answer_data.range_answer, "question_type": answer_data.question_type, 
            "opened_ended_answer": answer_data.open_ended_answer, "ranking_answer": answer_data.range_answer,
            "multiple_choice_answer": answer_data.multiple_choice_answer}, synchronize_session="fetch")
        db.commit()
        updated_answer = Applicant_Answer_Repo.fetch_by_id(db, id)

        return updated_answer
