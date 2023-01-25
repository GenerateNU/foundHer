from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Union
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from db.db import get_db
import users.models as models
from .repositories import UserRepo
from .schemas import UserCreate, User
from fastapi import APIRouter


router = APIRouter()
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Union[str, None] = None
    
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

current_active_user = None
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = UserRepo.fetch_by_username(db=db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    return current_user


class LoginForm(BaseModel):
    username: str
    password: str
class RegisterForm(LoginForm):
    email: str

@router.post("/register")
async def register_user(form_data: RegisterForm, db: Session = Depends(get_db)):
    username = form_data.username
    password = form_data.password
    email = form_data.email

    db_user: User = UserRepo.fetch_by_username(db=db, username=username)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="username already exists",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    password_hash = get_password_hash(password)
    new_user = await UserRepo.create(db=db, user=UserCreate(username=username, hashed_password=password_hash, email=email))
    json_compatible_item_data = jsonable_encoder(new_user)
    del json_compatible_item_data["hashed_password"]
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": username}, expires_delta=access_token_expires)
    json_compatible_item_data["access_token"] = access_token
    return json_compatible_item_data


@router.post("/login")
async def login(form_data: LoginForm, db: Session = Depends(get_db)):
    username = form_data.username
    password = form_data.password
    db_user: User = UserRepo.fetch_by_username(db=db, username=username)

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not verify_password(password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    else:
        json_compatible_item_data = jsonable_encoder(db_user)
        del json_compatible_item_data["hashed_password"]
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(data={"sub": username}, expires_delta=access_token_expires)
        json_compatible_item_data["access_token"] = access_token
        return json_compatible_item_data


@router.get("/profile", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    json_compatible_item_data = jsonable_encoder(current_user)
    return json_compatible_item_data