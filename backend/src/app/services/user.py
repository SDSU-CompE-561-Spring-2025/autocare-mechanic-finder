# This module provides user management services including registration, login, verification, and profile management.
# It simulates a database using an in-memory dictionary for user data storage.
# It includes functions to register a new user, login an existing user, verify a user, update user information

from fastapi import HTTPException
from datetime import datetime
from sqlalchemy.orm import Session

from app.models.models import User
from app.schemas.users import UserCreate, UserResponse, UserUpdate
from app.core.crud import get_pw_hash, verify_pw, get_user_by_username, get_user_by_email

def register_user(db: Session, user_data: UserCreate):
    if(get_user_by_username(db, user_data.username) or get_user_by_email(db, user_data.email)):
        raise HTTPException(status_code=400, detail="Username or email already exists")

    hash_password = get_pw_hash(user_data.password)
    db_user = User(
        username=user_data.username,
        email=user_data.email,
        password=hash_password,  # Password should be hashed
        created_at=datetime.now()
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def login_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user:
        user = get_user_by_email(db, username)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not verify_pw(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user

def update_user(db: Session, new_data: UserUpdate, user_data: User):
    if not verify_pw(new_data.current_password, user_data.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    user_data.State = new_data.state if new_data.state else user_data.State
    user_data.Cars = new_data.cars if new_data.cars else user_data.Cars
    if new_data.update_password:
        print("Change password is set to True")
        if not new_data.new_password:
            raise HTTPException(status_code=400, detail="New password is required")
        if new_data.current_password == new_data.new_password:
            raise HTTPException(status_code=400, detail="New password cannot be the same as current password")
        user_data.password = get_pw_hash(new_data.new_password)
    else:
        print("Change password is not set to True")
    db.commit()
    db.refresh(user_data)
    return user_data

def delete_user(db: Session, user: User):
    db.delete(user)
    db.commit()
    return True

def verify_user(db: Session, verification_code: str):
    raise HTTPException(status_code=501, detail="Email verification not implemented")
