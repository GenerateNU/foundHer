from typing import List, Optional

from pydantic import BaseModel


class EmployerQuestionBase(BaseModel):
    question_content : str
    possible_answers : List[str]
    question_type: str
    min_value: Optional[int]
    max_value: Optional[int]
    
    

class EmployerQuestion(EmployerQuestionBase):
    id: int

    class Config:
        orm_mode = True

class EmployerQuestionCreate(EmployerQuestionBase):
    pass

class EmployerQuestionUpdate(EmployerQuestionBase):
    id: int