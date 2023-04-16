
from sqlalchemy.orm import Session

from . import models, schemas

class Applicant_Question_Repo:
    
    async def create(db: Session, question: schemas.Applicant_Question_Create):
        db_question = models.Applicant_Question(question_content=question.question_content,
                                                possible_answers=question.possible_answers,
                                                min_value=question.min_value,
                                                max_value=question.max_value,
                                                question_type=question.question_type,
                                                unit=question.unit
                                                )
        db.add(db_question)
        db.commit()
        db.refresh(db_question)
        return db_question
    
    def fetch_by_id(db: Session, question_id: int):
        return db.query(models.Applicant_Question).filter(models.Applicant_Question.id == question_id).first()
 
    def fetch_all(db: Session, skip: int = 0, limit: int = 100):
        return db.query(models.Applicant_Question).offset(skip).limit(limit).all()
 
    async def delete(db: Session,question_id: int):
        db_question= db.query(models.Applicant_Question).filter(models.Applicant_Question.id == question_id).first()
        db.delete(db_question)
        db.commit()
        return db_question
     
     
    async def update(db: Session, question_data: schemas.Applicant_Question_Update, id: int):
        db.query(models.Applicant_Question).filter(models.Applicant_Question.id == id).update({
            "question_content": question_data.question_content, 
            "possible_answers": question_data.possible_answers,
            "min_value": question_data.min_value,
            "max_value": question_data.max_value,
            "question_type": question_data.question_type,
            "unit": question_data.unit}, synchronize_session="fetch")
        db.commit()
        return question_data
