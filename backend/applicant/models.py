from sqlalchemy import Column, ForeignKey, Integer, LargeBinary, String, Float, Boolean

from db.db import Base

class Applicant(Base):
    __tablename__ = "applicants"
    id = Column(Integer, primary_key=True,index=True)
    username = Column(String(80), nullable=False, unique=True)
    email = Column(String(80), nullable=False, unique=True)
    hashed_password = Column(String(80), nullable=False, unique=False)
    city = Column(String(80))
    state = Column(String(80))
    country = Column(String(80))
    highest_education = Column(String(80))
    institution = Column(String(80))
    latest_job_title = Column(String(80))
    latest_company = Column(String(80))
    fullname = Column(String(80))

    def __repr__(self):
        return 'applicants(username=%s)' % self.username
    
class Resume(Base): 
    __tablename__ = "resumes"
    id = Column(Integer, primary_key=True,index=True)
    resume_file = Column(LargeBinary)
    file_name = Column(String(80))
    applicant_id = Column(Integer, ForeignKey('applicants.id'))



