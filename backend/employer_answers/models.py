### 
# class Employer_Answer:
# tablename = "employer_answers"
# id = Column(Integer, primary_key=True,index=True)
# user_id = Column(Integer, ForeignKey('user.id'))
# question_id = Column(Integer, ForeignKey('employer_questions.id'))
# answers = Column(ARRAY(String(40)))
###

from sqlalchemy import Column, Integer, ForeignKey, String, ARRAY

from db.db import Base

class EmployerAnswer(Base):
    __tablename__ = "employer_answers"
    id = Column(Integer, primary_key=True,index=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    question_id = Column(Integer, ForeignKey('employer_question.id'))
    answers = Column(ARRAY(String(40)))
    

    def __repr__(self):
        return 'EmployerAnswer(id=%s, user_id:%s, question_id:%s)' % (self.id, self.user_id, self.question_id)
        