from typing import List, Optional

from pydantic import BaseModel


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
