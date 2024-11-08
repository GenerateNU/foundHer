
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

#SQLALCHEMY_DATABASE_URL = "sqlite:///./data.db"
SQLALCHEMY_DATABASE_URL = "postgresql://user:pwd@localhost:5433/foundher"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,echo=True
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()