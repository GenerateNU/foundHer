from sqlalchemy import Column, Integer, ForeignKey, String, ARRAY
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy_json import mutable_json_type

from db.db import Base

class Applicant_Answer(Base):
    __tablename__ = "applicant_answers"
    id = Column(Integer, primary_key=True,index=True)
    question_id = Column(Integer, ForeignKey('applicant_questions.id'))
    applicant_id = Column(Integer)
    question_type = Column(String)
    range_answer = Column(mutable_json_type(dbtype=JSONB, nested=True))
    multiple_choice_anwer = Column(ARRAY(String))
    open_ended_answer = Column(String)
    ranked_answer = Column(mutable_json_type(dbtype=JSONB, nested=True))

    def __repr__(self):
        return 'Applicant_Question(question_id=%s, answers=%s' % (self.question_id)