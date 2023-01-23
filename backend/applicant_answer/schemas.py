from typing import List, Optional

from pydantic import BaseModel


class Applicant_Answer_Base(BaseModel):
    id : int
    question_id : int
    answers : List[str] = []


class Applicant_Answer_Create(Applicant_Answer_Base):
    pass


class Applicant_Answer_Create(Applicant_Answer_Base):
    id: int

    class Config:
        orm_mode = True

