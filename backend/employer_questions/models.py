from sqlalchemy import Column, Integer, String, ARRAY

from db.db import Base

class EmployerQuestion(Base):
    __tablename__ = "employer_questions"
    id = Column(Integer, primary_key=True,index=True)
    question_content = Column(String(200), nullable=False, unique=True)
    possible_answers = Column(ARRAY(String))
    question_type = Column(String(80))
    min_value = Column(Integer, nullable=True)
    max_value = Column(Integer, nullable=True)
    unit = Column(String, nullable=True)

    def __repr__(self):
        return 'Employer_Question(id=%s, question=%s)' % (self.id, self.question_content)
