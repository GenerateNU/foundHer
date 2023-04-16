from sqlalchemy import Column, Integer, ForeignKey, DateTime

from db.db import Base

class Application(Base):
    __tablename__ = "applications"
    #  id, applicant_id, posting_id, createdAt
    id = Column(Integer, primary_key=True,index=True)
    applicant_id = Column(Integer, ForeignKey('applicants.id'))
    posting_id = Column(Integer, ForeignKey('job_postings.id'))
    created_at = Column(DateTime)
    

    def __repr__(self):
        return 'Application(id=%s, applicant_id=%s, posting_id=%s created_at=%s)' % \
               (self.id, self.applicant_id, self.posting_id, self.created_at)

