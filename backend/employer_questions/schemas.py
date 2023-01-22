###
# class Employer_Question:
# tablename = "employer_questions"
# id = Column(Integer, primary_key=True,index=True)
# question_content = Column(String(200), nullable=False, unique=True)
# possible_answers = Column(ARRAY(String(40)))
###

from typing import List, Optional

from pydantic import BaseModel


class EmployerQuestionBase(BaseModel):
    question_content: str
    possible_answers: list(str)
    
    

class EmployerQuestion(EmployerQuestionBase):
    id: int

    class Config:
        orm_mode = True

class EmployerQuestionCreate(EmployerQuestionBase):
    pass
