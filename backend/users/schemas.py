from typing import List, Optional

from pydantic import BaseModel


class UserBase(BaseModel):
    username: str
    hashed_password: str
    email: str
    is_applicant: bool
    company_name: str   
    fullname: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class UserCreate(UserBase):
    pass
