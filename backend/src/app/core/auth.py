from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta
from typing import Optional
from app.core.config import settings

PRIVATE_KEY = settings.PRIVATE_KEY
ALGO = "HS256"
EXPIRE_TIME = 25

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")

def create_access_token(data: dict, expires: Optional[timedelta] = None):
    # generate jwt access token
    if expires:
        expire = datetime.utcnow() + timedelta(EXPIRE_TIME)
    else:
        expire = datetime.utcnow() + timedelta(minutes=EXPIRE_TIME)

    encode = {"exp": expire, "sub": str(data)}
    encodeToJWT = jwt.encode(encode, PRIVATE_KEY, algorithm=ALGO)
    return encodeToJWT


def verify_token(token):
    # try with jwt.decode
    # fail if expired or
    # fail if not auth
    try:
        payload = jwt.decode(token, PRIVATE_KEY, algorithm=[ALGO])
        sub = payload.get("sub")
        return sub
    except jwt.ExpiredSignatureError:
        return None
    except jwt.JWTError:
        return None
