from typing import List, Literal, Dict

from pydantic import BaseModel, Field


class Applicant_Answer_Base(BaseModel):
    question_id: int
    applicant_id: int
    question_type: str
    range_answer: Dict[str, int]
    multiple_choice_answer: List[str]
    open_ended_answer: str
    ranked_answer: Dict[int, str]

class Applicant_Answer(Applicant_Answer_Base):
    id : int

    class Config:
        orm_mode = True


class Applicant_Answer_Create(Applicant_Answer_Base):
    pass


class Applicant_Answer_Update(Applicant_Answer_Base):
    id : int

