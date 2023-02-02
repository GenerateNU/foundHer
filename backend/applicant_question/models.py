from sqlalchemy import Column, Integer, ForeignKey, String, ARRAY

from db.db import Base

class Applicant_Question(Base):
    __tablename__ = "applicant_questions"
    id = Column(Integer, primary_key=True,index=True)
    question_content = Column(String(), nullable=False, unique=True)
    possible_answers = Column(ARRAY(String()))
    def __repr__(self):
        return 'Applicant_Question(question_content=%s, possible_answers=%s' % (self.question_content, self.possible_answers)

