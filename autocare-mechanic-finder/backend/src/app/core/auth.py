from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException
from app.schemas.token import TokenData
import jwt
from jwt.exceptions import InvalidTokenError
from datetime import datetime, timedelta, timezone
from typing import Optional
from app.core.config import settings

PRIVATE_KEY = settings.PRIVATE_KEY
ALGO = "HS256"
EXPIRE_TIME = 25

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")

def create_access_token(data: dict, expires: timedelta | None = None):
    # generate jwt access token
    encode = data.copy()
    if expires:
        expire = datetime.now(timezone.utc) + timedelta(minutes = EXPIRE_TIME)
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=EXPIRE_TIME)

    encode.update({"exp": expire})
    encodeToJWT = jwt.encode(encode, PRIVATE_KEY, algorithm=ALGO)
    return encodeToJWT


def verify_token(token: str):
    try:
        #print(token)
        payload = jwt.decode(token, PRIVATE_KEY, algorithms=ALGO)
        #print(payload)
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return TokenData(username = username)
    except InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")