from sqlalchemy import Column, Integer, ForeignKey, String, ARRAY

from ..db import Base

class Applicant_Answer(Base):
    __tablename__ = "applicant_answers"
    id = Column(Integer, primary_key=True,index=True)
    question_id = Column(Integer, ForeignKey('applicant_questions.id'))
    answers = Column(ARRAY(String(40)))
    def __repr__(self):
        return 'Applicant_Question(question_id=%s, answers=%s' % (self.question_id, self.answers)