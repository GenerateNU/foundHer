from sqlalchemy import Column, Integer, ForeignKey, String, ARRAY
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy_json import mutable_json_type
from db.db import Base

class EmployerAnswer(Base):
    __tablename__ = "employer_answers"
    id = Column(Integer, primary_key=True,index=True)
    question_id = Column(Integer, ForeignKey('employer_questions.id'))
    user_id = Column(Integer)
    question_type = Column(String)
    range_answer = Column(mutable_json_type(dbtype=JSONB, nested=True))
    multiple_choice_answer = Column(ARRAY(String))
    open_ended_answer = Column(String)
    ranked_answer = Column(mutable_json_type(dbtype=JSONB, nested=True))
    

    def __repr__(self):
        return 'EmployerAnswer(id=%s, user_id:%s, question_id:%s)' % (self.id, self.user_id, self.question_id)