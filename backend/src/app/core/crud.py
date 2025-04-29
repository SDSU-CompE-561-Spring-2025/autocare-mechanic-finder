from sqlalchemy.orm import Session
from sqlalchemy import func
from app.schemas.users import UserCreate
import app.models.models as models
from passlib.context import CryptContext

pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_pw_hash(password: str):
    return pwd.hash(password)


def verify_pw(defPwd: str, hashedPwd: str):
    return pwd.verify(defPwd, hashedPwd)


def get_user_by_username(db: Session, username: int):
    return db.query(models.User).filter(models.User.username == username).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: UserCreate):
    hashed_password = get_pw_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
