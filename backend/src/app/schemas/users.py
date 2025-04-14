from datetime import datetime
from pydantic import BaseModel, constr, EmailStr, Field

#referencing professors backend for user


class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    user_id: int = Field(..., gt=0)
    username: str
    State: str
    Cars: str
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True


class UserResponse(BaseModel):
    user_id: int
    username: str
    email: EmailStr
    created_at: datetime


    class Config:
        from_attributes = True
