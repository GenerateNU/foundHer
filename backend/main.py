from typing import Union, List
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from applicant_question.router import router as aq_router
from applicant_answer.router import router as aa_router
import uvicorn
from typing import Optional
from users.authentication import router
from db.db import Base, engine


Base.metadata.create_all(bind=engine)

from sqlalchemy import null

app = FastAPI()
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(aq_router)
app.include_router(aa_router)

@app.get("/")
async def read():
    return {"welcome": "you"}

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)
