from sqlalchemy import Column, ForeignKey, Integer, String, Float

from db import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True,index=True)
    username = Column(String(80), nullable=False, unique=True)
    email = Column(String(80), nullable=False, unique=True)
    hased_password = Column(String(80), nullable=False, unique=True)
    

    def __repr__(self):
        return 'User(username=%s)' % self.username