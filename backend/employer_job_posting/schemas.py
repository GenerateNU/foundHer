###
# class Employer_Question:
# tablename = "employer_questions"
# id = Column(Integer, primary_key=True,index=True)
# question_content = Column(String(200), nullable=False, unique=True)
# possible_answers = Column(ARRAY(String(40)))
###

from typing import List, Optional

from pydantic import BaseModel


class EmployerJobPostingBase(BaseModel):
    employer_id = int
    description = str
    created_at = int
    location = str
    experience_level = str


class EmployerJobPosting(EmployerJobPostingBase):
    id: int

    class Config:
        orm_mode = True

class EmployerJobPostingCreate(EmployerJobPostingBase):
    pass

class EmployerJobPostingUpdate(BaseModel):
    id: int
    employer_id = int
    description = str
    created_at = int
    location = str
    experience_level = int


class EmployerJobPostingPosting(EmployerJobPostingBase):
    id: int
    employer_id = int
    description = str
    created_at = int
    location = str
    experience_level = int
