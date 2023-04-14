from typing import List, Optional

from pydantic import BaseModel


class EmployerBase(BaseModel):
    username: str
    hashed_password: str
    email: str
    company_name: str   
    fullname: str

class Employer(EmployerBase):
    id: int

    class Config:
        orm_mode = True

class EmployerCreate(EmployerBase):
    pass
