from sqlalchemy.orm import Session

from . import models, schemas
    
class EmployerQuestionsRepo:
    async def create(db: Session, employee_question: schemas.EmployerQuestionCreate):
            db_employer_question = models.EmployerQuestion(question=employee_question.question_content, answers = employee_question.possible_answers)
            db.add(db_employer_question)
            db.commit()
            db.refresh(db_employer_question)
            return db_employer_question
        
    def fetch_by_id(db: Session,_id:int):
        return db.query(models.EmployerQuestion).filter(models.EmployerQuestion.id == _id).first()
    
    
    def fetch_all(db: Session, skip: int = 0, limit: int = 100):
        return db.query(models.EmployerQuestion).offset(skip).limit(limit).all()
    
    async def delete(db: Session,_id:int):
        db_employer_question= db.query(models.EmployerQuestion).filter_by(id=_id).first()
        db.delete(db_employer_question)
        db.commit()
        
    async def update(db: Session,employer_question_data):
        db.merge(employer_question_data)
        db.commit()
        