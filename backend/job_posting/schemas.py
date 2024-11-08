###
# class Employer_Question:
# tablename = "employer_questions"
# id = Column(Integer, primary_key=True,index=True)
# question_content = Column(String(200), nullable=False, unique=True)
# possible_answers = Column(ARRAY(String(40)))
###

from typing import List, Optional

from pydantic import BaseModel
from datetime import datetime


class JobPostingBase(BaseModel):
    employer_id: int
    title: str
    description: str
    location: str
    experience_level: str
    company: str
    tags: List[str]
    skills: List[str]
    title: str
    weighted_score: Optional[float]

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

