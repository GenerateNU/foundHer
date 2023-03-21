from typing import List, Literal, Dict, Optional

from pydantic import BaseModel, Field


class Applicant_Answer_Base(BaseModel):
    question_id: int
    applicant_id: int
    question_type: str
    range_answer: Optional[Dict[str, int]]
    multiple_choice_answer: Optional[List[str]]
    open_ended_answer: Optional[str]
    ranked_answer: Optional[Dict[str, int]]

class Applicant_Answer(Applicant_Answer_Base):
    id : int

    class Config:
        orm_mode = True


class Applicant_Answer_Create(Applicant_Answer_Base):
    pass


class Applicant_Answer_Update(Applicant_Answer_Base):
    id : int

