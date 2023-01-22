###
# class Employer_Question:
# tablename = "employer_questions"
# id = Column(Integer, primary_key=True,index=True)
# question_content = Column(String(200), nullable=False, unique=True)
# possible_answers = Column(ARRAY(String(40)))
###

from sqlalchemy import Column, Integer, String, ARRAY

from db import Base

class Employer_Question(Base):
    __tablename__ = "employer_questions"
    id = Column(Integer, primary_key=True,index=True)
    question_content = Column(String(200), nullable=False, unique=True)
    possible_answers = Column(ARRAY(String(40)))
    

    def __repr__(self):
        return 'Employer_Question(id=%s)' % self.id