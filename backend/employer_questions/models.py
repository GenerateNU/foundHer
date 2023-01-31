###
# class Employer_Question:
# tablename = "employer_questions"
# id = Column(Integer, primary_key=True,index=True)
# question_content = Column(String(200), nullable=False, unique=True)
# possible_answers = Column(ARRAY(String(40)))
###

from sqlalchemy import Column, Integer, String, ARRAY

from db.db import Base

class EmployerQuestion(Base):
    __tablename__ = "employer_questions"
    id = Column(Integer, primary_key=True,index=True)
    question_content = Column(String(200), nullable=False, unique=True)
    # possible_answers = Column(ARRAY(String))
    

    def __repr__(self):
        return 'Employer_Question(id=%s, question=%s)' % (self.id, self.question_content)
