# src/app/services/user_service.py

# Nathan Morris
# This module provides user management services including registration, login, verification, and profile management.
# It simulates a database using an in-memory dictionary for user data storage.
# It includes functions to register a new user, login an existing user, verify a user, update user information

from fastapi import HTTPException
from datetime import datetime
from sqlalchemy.orm import Session

from app.models.users import User
from app.schemas.users import UserCreate, UserResponse


# Search if user and/or email exist in the database (References Professor's backend))
def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def register_user(db: Session, user_data: UserCreate):
    if(get_user_by_username(db, user_data.username) or get_user_by_email(db, user_data.email)):
        raise HTTPException(status_code=400, detail="Username or email already exists")
    db_user = User(
        username=user_data.username,
        email=user_data.email,
        password=user_data.password,  # Password should be hashed
        created_at=datetime.now()
    )
    user_data["password"] = hash_password(user_data["password"])
    user_data["created_at"] = datetime.now().isoformat()
    users_db[username] = user_data
    return user_data

def login_user(user_data: dict) -> dict:
    username = user_data["username"]
    password = hash_password(user_data["password"])

    user = users_db.get(username)
    if not user or user["password"] != password:
        return {
            "Token_Id": None,
            "user_Id": None,
            "Auth": False,
            "Error_Type": "401",
            "Error_message": "Invalid login",
            "created_at": datetime.now().isoformat()
        }

    return {
        "Token_Id": 1001,
        "user_Id": 1001,
        "Auth": True,
        "Error_Type": None,
        "Error_message": "",
        "created_at": datetime.now().isoformat()
    }

def verify_user(verification_code: str) -> dict:
    if verification_code == "validcode123":  # Mock validation
        return {
            "Auth": True,
            "Error_Type": None,
            "Error_message": "",
            "created_at": datetime.now().isoformat()
        }
    raise HTTPException(status_code=401, detail="Verification failed")

def update_user(user_data: dict) -> dict:
    username = user_data["username"]
    if username not in users_db:
        raise HTTPException(status_code=404, detail="User not found")

    users_db[username].update(user_data)
    return users_db[username]

def get_user_info(username: str) -> dict:
    if username not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    return users_db[username]

def delete_user(username: str) -> dict:
    if username not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    del users_db[username]
    return {"message": f"User '{username}' deleted successfully"}
