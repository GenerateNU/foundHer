from typing import List, Optional
import datetime

from pydantic import BaseModel


class ExperienceBase(BaseModel):
    applicant_id: int
    from_: str
    to_: str
    description: str
    company: str
    location: str    

class Experience(ExperienceBase):
    id: int

    class Config:
        orm_mode = True

class ExperienceCreate(ExperienceBase):
    pass

class ExperienceUpdate(ExperienceBase):
    id: int