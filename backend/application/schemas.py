from datetime import datetime
from pydantic import BaseModel


class Application_Base(BaseModel):
    applicant_id : int
    posting_id : int


class Application(Application_Base):
    id : int
    created_at : datetime

    class Config:
        orm_mode = True


class Application_Create(Application_Base):
    pass

class Applicant_Update(Application_Base):
    id : int
    applicant_id : int
    posting_id : int
    created_at : datetime
