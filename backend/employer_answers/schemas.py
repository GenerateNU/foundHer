from typing import List, Optional, Dict

from pydantic import BaseModel


class EmployerAnswerBase(BaseModel):
    question_id: int
    user_id: int
    question_type: str
    range_answer: Optional[Dict[str, int]]
    multiple_choice_answer: Optional[List[str]]
    open_ended_answer: Optional[str]
    ranked_answer: Optional[Dict[str, int]]

class EmployerAnswer(EmployerAnswerBase):
    id: int

    class Config:
        orm_mode = True

class EmployerAnswerCreate(EmployerAnswerBase):
    pass

class EmployerAnswerUpdate(EmployerAnswer):
    id: int
