from typing import List, Optional

from pydantic import BaseModel

###
# class Employer_Answer:
# tablename = "employer_answers"
# id = Column(Integer, primary_key=True,index=True)
# user_id = Column(Integer, ForeignKey('user.id'))
# question_id = Column(Integer, ForeignKey('employer_questions.id'))
# answers = Column(ARRAY(String(40)))
###

class EmployerAnswerBase(BaseModel):
    user_id: int
    question_id: int
    answers: List[str]
    

class EmployerAnswer(EmployerAnswerBase):
    id: int

    class Config:
        orm_mode = True

class EmployerAnswerCreate(EmployerAnswerBase):
    pass

class EmployerAnswerUpdate(BaseModel):
    id: int
    user_id: int
    question_id: int
    answers: List[str]
