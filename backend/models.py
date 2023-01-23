from sqlalchemy import Table, Column, Integer, ForeignKey
from sqlalchemy.types import ARRAY, String
class Applicant_Question:
    tablename = "applicant_questions"
    id = Column(Integer, primary_key=True,index=True)
    question_content = Column(String(200), nullable=False, unique=True)
    possible_answers = Column(ARRAY(String(40)))

class Applicant_Answer:
    tablename = "applicant_answers"
    id = Column(Integer, primary_key=True,index=True)
    question_id = Column(Integer, ForeignKey('applicant_questions.id'))
    answers = Column(ARRAY(String(40)))