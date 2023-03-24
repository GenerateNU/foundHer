from sqlalchemy import Column, Integer, ForeignKey, String, ARRAY

from db.db import Base

class Employer_Job_Posting(Base):
    __tablename__ = "employer_job_posting"
    id = Column(Integer, primary_key=True,index=True)
    employer_id = Column(Integer, ForeignKey('applicant_questions.id'))
    description = Column(String)
    created_at = Column(Integer)
    location = Column(String)
    experience_level = Column(String)
    

    def __repr__(self):
        return 'Employer_Job_Posting(id=%s, employer_id=%s, description=%s, created_at=%s)' % \
               (self.id, self.employer_id, self.description, self.created_at)
