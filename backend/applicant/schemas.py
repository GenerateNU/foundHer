from typing import ByteString, List, Optional
from fastapi import File, UploadFile

from pydantic import BaseModel


class ApplicantBase(BaseModel):
    username: str
    hashed_password: str
    email: str
    fullname: str
    city: str
    state: str
    country: str
    highest_education: str
    institution: str
    latest_job_title: str
    latest_company: str

class Applicant(ApplicantBase):
    id: int

    class Config:
        orm_mode = True

class ApplicantCreate(ApplicantBase):
    pass

class ApplicantUpdate(ApplicantBase):
    id: int


class Resume(BaseModel):
    applicant_id: int
    resume_file: bytes
    file_name: str
