### 
# class Employer_Answer:
# tablename = "employer_answers"
# id = Column(Integer, primary_key=True,index=True)
# user_id = Column(Integer, ForeignKey('user.id'))
# question_id = Column(Integer, ForeignKey('employer_questions.id'))
# answers = Column(ARRAY(String(40)))
###

from sqlalchemy import Column, Integer, ForeignKey, String, ARRAY

from db import Base

class Employer_Answer(Base):
    __tablename__ = "employer_answers"
    id = Column(Integer, primary_key=True,index=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    question_id = Column(Integer, ForeignKey('employer_question.id'))
    possible_answers = Column(ARRAY(String(40)))
    

    def __repr__(self):
        return 'Employer_Answer(id=%s)' % self.id