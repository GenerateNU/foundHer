from typing import Union
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
import uvicorn


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

@app.get("/")
async def read():
    return {"welcome": "you"}

@app.post('/add_question')
async def add_question(question_content: str, possible_answers: str):
    print("hello")
    return question_content

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)
