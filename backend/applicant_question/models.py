from sqlalchemy import Column, Integer, ForeignKey, String, ARRAY, Identity

from db.db import Base

class Applicant_Question(Base):
    __tablename__ = "applicant_questions"
    id = Column(Integer, Identity(start=1, cycle=True), primary_key=True, index=True)
    question_content = Column(String(200), nullable=False, unique=True)
    possible_answers = Column(ARRAY(String))
    question_type = Column(String(80))
    min_value = Column(Integer)
    max_value = Column(Integer)

    def __repr__(self):
        return 'Applicant_Question(question_content=%s, possible_answers=%s' % (self.question_content, self.possible_answers)

