from sqlalchemy.orm import Session

from . import models, schemas
    
class ApplicantRepo:
    async def create(db: Session, applicant: schemas.ApplicantCreate):
            db_applicant = models.Applicant(username=applicant.username, 
                                            email=applicant.email, 
                                            hashed_password=applicant.hashed_password, 
                                            city=applicant.city, 
                                            fullname=applicant.fullname, 
                                            state=applicant.state, 
                                            country=applicant.country, 
                                            highest_education=applicant.highest_education, 
                                            institution=applicant.institution, 
                                            latest_job_title=applicant.latest_job_title, 
                                            latest_company=applicant.latest_company, 
                                            resume_file=applicant.resume_file)
            db.add(db_applicant)
            await db.commit()
            await db.refresh(db_applicant)
            return db_applicant
        
    def fetch_by_id(db: Session, _id:int):
        return db.query(models.Applicant).filter(models.Applicant.id == _id).first()
    
    def fetch_by_username(db: Session, username:str):
        return db.query(models.Applicant).filter(models.Applicant.username == username).first()
    
    def fetch_all(db: Session, skip: int = 0, limit: int = 100):
        return db.query(models.Applicant).offset(skip).limit(limit).all()
    
    async def delete(db: Session,_id:int):
        db_user= db.query(models.Applicant).filter_by(id=_id).first()
        db.delete(db_user)
        db.commit()
        
    async def update(db: Session, user_data):
        db.merge(user_data)
        db.commit()