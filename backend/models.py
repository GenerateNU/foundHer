import array
from sqlalchemy import Table, Column, Integer, ForeignKey

class Applicant_Question:
    tablename = "applicant_questions"
    id = Column(Integer, primary_key=True,index=True)
    question_content = Column(str(200), nullable=False, unique=True)
    possible_answers = Column(array(str(40)))

class Applicant_Answer:
    tablename = "applicant_answers"
    id = Column(Integer, primary_key=True,index=True)
    question_id = Column(Integer, ForeignKey('applicant_questions.id'))
    answers = Column(array(str(40)))