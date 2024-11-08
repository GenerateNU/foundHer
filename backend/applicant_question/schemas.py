from typing import List, Optional

from pydantic import BaseModel


class Applicant_Question_Base(BaseModel):
    question_content : str
    possible_answers : List[str]
    question_type: str
    min_value: Optional[int]
    max_value: Optional[int]
    unit: Optional[str]
class Applicant_Question(Applicant_Question_Base):
    id : int

    class Config:
        orm_mode = True


class Applicant_Question_Create(Applicant_Question_Base):
    pass

class Applicant_Question_Update(Applicant_Question_Base):
    id : int
