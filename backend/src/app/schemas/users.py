from datetime import datetime
from pydantic import BaseModel, constr, EmailStr, Field

#referencing professors backend for user


class UserBase(BaseModel):
    username: constr(min_length= 3, max_length= 32, pattern=r"^[a-zA-Z0-9_]+$")
    email: EmailStr

class UserCreate(UserBase):
    password: constr(min_length= 3, max_length= 32, pattern=r"^[a-zA-Z0-9_]+$")

class User(UserBase):
    id: int = Field(..., gt=0)
    username: constr(min_length= 3, max_length= 32, pattern=r"^[a-zA-Z0-9_]+$")
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    created_at: datetime


    class Config:
        from_attributes = True