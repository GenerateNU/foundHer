from sqlalchemy.orm import Session

from . import models, schemas

# "     id = Column(Integer, primary_key=True,index=True)
#         employer_id = Column(Integer, ForeignKey('applicant_questions.id'))
#     description = Column(String)
#     created_at = Column(Integer)
#     location = Column(String)
#     experience_level = Column(String)
#
class EmployerJobPostingRepo:
    async def create(db: Session, employer_job_posting: schemas.EmployerJobPostingCreate):
        db_employer_question = models.Employer_Job_Posting(employer_id=employer_job_posting.employer_id, description = employer_job_posting.description,
                                                           created_at=employer_job_posting.created_at, location=employer_job_posting.location,
                                                           experience_level = employer_job_posting.experience_level)
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

    async def update(db: Session, employer_job_posting: schemas.EmployerJobPosting, id: int):
        db.query(models.Employer_Job_Posting).filter(models.Employer_Job_Posting.id == id)\
            .update({"employer_id": employer_job_posting.employer_id, "description": employer_job_posting.description,
                     "created_at":employer_job_posting.created_at, "location":employer_job_posting.location,
                     "expereince_level":employer_job_posting.experience_level}, synchronize_session="fetch")
        stuff = EmployerJobPostingRepo.fetch_by_id(db, id)
        return stuff
