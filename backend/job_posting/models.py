from sqlalchemy import Column, Integer, ForeignKey, String, DateTime

from db.db import Base

class Job_Posting(Base):
    __tablename__ = "job_postings"
    id = Column(Integer, primary_key=True,index=True)
    employer_id = Column(Integer, ForeignKey('employers.id'))
    title = Column(String)
    description = Column(String)
    created_at = Column(DateTime)
    location = Column(String)
    experience_level = Column(String)
    

    def __repr__(self):
        return 'Job_Posting(id=%s, employer_id=%s, title=%s, description=%s, created_at=%s, location=%s, experience_level=%s)' % \
               (self.id, self.employer_id, self.title, self.description, self.created_at, self.location, self.experience_level)
