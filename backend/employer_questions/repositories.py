from sqlalchemy.orm import Session

from . import models, schemas

class EmployerQuestionsRepo:
    async def create(db: Session, employer_question: schemas.EmployerQuestionCreate):
            db_employer_question = models.EmployerQuestion(question_content=employer_question.question_content, 
                                                           possible_answers = employer_question.possible_answers,
                                                           min_value = employer_question.min_value,
                                                           max_value = employer_question.max_value,
                                                           question_type = employer_question.question_type)
            db.add(db_employer_question)
            db.commit()
            db.refresh(db_employer_question)
            return db_employer_question
        
    def fetch_by_id(db: Session,_id:int):
        return db.query(models.EmployerQuestion).filter(models.EmployerQuestion.id == _id).first()
    
    
    def fetch_all(db: Session, skip: int = 0, limit: int = 100):
        return db.query(models.EmployerQuestion).offset(skip).limit(limit).all()
    
    async def delete(db: Session,_id:int):
        db_employer_question= db.query(models.EmployerQuestion).filter(models.EmployerQuestion.id == _id).first()
        print(db_employer_question)
        db.delete(db_employer_question)
        db.commit()
        return db_employer_question
        
    async def update(db: Session, employer_question: schemas.EmployerQuestionUpdate, id: int):
        db.query(models.EmployerQuestion).filter(models.EmployerQuestion.id == id).update({
            "question_content": employer_question.question_content, 
            "possible_answers": employer_question.possible_answers,
            "min_value": employer_question.min_value,
            "max_value": employer_question.max_value,
            "question_type": employer_question.question_type}, synchronize_session="fetch")
        stuff = EmployerQuestionsRepo.fetch_by_id(db, id)
        return stuff