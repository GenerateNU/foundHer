###
# class Employer_Question:
# tablename = "employer_questions"
# id = Column(Integer, primary_key=True,index=True)
# question_content = Column(String(200), nullable=False, unique=True)
# possible_answers = Column(ARRAY(String(40)))
###

from typing import List

from pydantic import BaseModel
from datetime import datetime


class JobPostingBase(BaseModel):
    employer_id: int
    description: str
    location: str
    experience_level: str


class JobPosting(JobPostingBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode: True

class JobPostingCreate(JobPostingBase):
    pass

class JobPostingUpdate(BaseModel):
    id: int
    created_at: datetime

