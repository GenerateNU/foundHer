from sqlalchemy.orm import Session

from . import models, schemas

class ExperienceRepo:
    async def create(db: Session, experience: schemas.ExperienceCreate):
            db_experience = models.Experience(applicant_id=experience.applicant_id, from_=experience.from_, to_=experience.to_,
                                              description=experience.description, company=experience.company, location=experience.location)
            db.add(db_experience)
            db.commit()
            db.refresh(db_experience)
            return db_experience
        
    def fetch_by_id(db: Session, _id:int):
        return db.query(models.Experience).filter(models.Experience.id == _id).first()
    
    
    def fetch_by_applicant_id(db: Session, applicant_id:int):
        return db.query(models.Experience).filter(models.Experience.applicant_id == applicant_id).all()
    
    async def delete(db: Session,_id:int):
        pass
        
    async def update(db: Session, experience: schemas.ExperienceCreate, id: int):
        db.query(models.Experience).filter(models.Experience.id == id).update({
            "location": experience.location, 
            "from_": experience.from_,
            "to_": experience.to_,
            "description": experience.description,
            "company": experience.company}, synchronize_session="fetch")
        db.commit()
        updated_experience = ExperienceRepo.fetch_by_id(db, id)
        return updated_experience