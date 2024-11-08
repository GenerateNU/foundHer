from fastapi.testclient import TestClient
from main import app
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from db.db import Base, get_db


SQLALCHEMY_DATABASE_URL = "postgresql://user:pwd@localhost:5433/foundher"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, echo=True
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

@pytest.fixture()
def test_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine) # could be better to just delete the data instead of recreating the whole thing

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


def test_read_main(test_db):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"welcome": "you"}
