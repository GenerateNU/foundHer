from typing import List, Optional

from pydantic import BaseModel


class Applicant_Question_Base(BaseModel):
    id : int
    question_content : str
    possible_answers : List[str] = []


class Applicant_Answer_Create(Applicant_Question_Base):
    pass


class Applicant_Answer_Create(Applicant_Question_Base):
    id: int

    class Config:
        orm_mode = True
