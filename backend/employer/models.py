from sqlalchemy import Column, ForeignKey, Integer, String, Float, Boolean

from db.db import Base

class Employers(Base):
    __tablename__ = "employers"
    id = Column(Integer, primary_key=True,index=True)
    username = Column(String(80), nullable=False, unique=True)
    email = Column(String(80), nullable=False, unique=True)
    hashed_password = Column(String(80), nullable=False, unique=False)
    company_name = Column(String(80), default="")
    fullname = Column(String(80))
    

    def __repr__(self):
        return 'Employer(username=%s)' % self.username