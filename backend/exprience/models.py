from sqlalchemy import Column, ForeignKey, Integer, LargeBinary, String, Float, Boolean, DateTime

from db.db import Base

class Experience(Base):
    __tablename__ = "experiences"
    id = Column(Integer, primary_key=True,index=True)
    applicant_id = Column(Integer, ForeignKey('applicants.id'))
    from_ = Column(String)
    to_ = Column(String)
    description = Column(String)
    company = Column(String)
    location = Column(String)

    def __repr__(self):
        return 'experiences(id=%s)' % self.id
    
    


