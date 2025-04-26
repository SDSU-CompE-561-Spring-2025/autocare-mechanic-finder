# src/app/services/user_service.py

# Nathan Morris
# This module provides user management services including registration, login, verification, and profile management.
# It simulates a database using an in-memory dictionary for user data storage.
# It includes functions to register a new user, login an existing user, verify a user, update user information

from fastapi import HTTPException
from datetime import datetime
from sqlalchemy.orm import Session

from app.models.models import User
from app.schemas.users import UserCreate, UserResponse
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

def verify_user(db: Session, verification_code: str):
    if verification_code == "validcode123":  # Mock validation
        return {"message": "User verified successfully"}
    raise HTTPException(status_code=401, detail="Verification failed")

def update_user(db: Session, user_data: UserCreate):
    if user_data.username not in db:
        raise HTTPException(status_code=404, detail="User not found")

    user_record = db.query(users).filter_by(username=user_data.username).first()
    user_record.password = get_pw_hash(user_data.password)
    user_record.state = user_data.state
    db.commit()
    return db[user_data.username]

def get_user_info(db: Session, username: str):
    if username not in db:
        raise HTTPException(status_code=404, detail="User not found")
    return db[username]

def delete_user(db: Session, username: str):
    if username not in db:
        raise HTTPException(status_code=404, detail="User not found")
    del db[username]
    return {"message": f"User '{username}' deleted successfully"}
