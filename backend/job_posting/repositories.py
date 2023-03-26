from sqlalchemy.orm import Session

from . import models, schemas

# "     id = Column(Integer, primary_key=True,index=True)
#         employer_id = Column(Integer, ForeignKey('applicant_questions.id'))
#     description = Column(String)
#     created_at = Column(Integer)
#     location = Column(String)
#     experience_level = Column(String)
#
class JobPostingRepo:
    async def create(db: Session, job_posting: schemas.JobPostingCreate):
        db_posting = models.Job_Posting(employer_id=job_posting.employer_id, description = job_posting.description,
                                                           created_at=job_posting.created_at, location=job_posting.location,
                                                           experience_level = job_posting.experience_level)
        db.add(db_posting)
        db.commit()
        db.refresh(db_posting)
        return db_posting

    def fetch_by_id(db: Session, _id:int):
        return db.query(models.Job_Posting).filter(models.Job_Posting.id == _id).first()
    
    def fetch_by_employer_id(db: Session, employer_id:int):
        return db.query(models.Job_Posting).filter(models.Job_Posting.employer_id == employer_id).first()


    def fetch_all(db: Session, skip: int = 0, limit: int = 100):
        return db.query(models.Job).offset(skip).limit(limit).all()

    async def delete(db: Session,_id:int):
        db_posting= db.query(models.Job).filter(models.Job.id == _id).first()
        print(db_posting)
        db.delete(db_posting)
        db.commit()
        return db_posting

    async def update(db: Session, job_posting: schemas.JobPosting, id: int):
        db.query(models.Job_Posting).filter(models.Job_Posting.id == id)\
            .update({"employer_id": job_posting.employer_id, "description": job_posting.description,
                     "created_at":job_posting.created_at, "location":job_posting.location,
                     "expereince_level":job_posting.experience_level}, synchronize_session="fetch")
        updated_job = JobPostingRepo.fetch_by_id(db, id)
        return updated_job
