from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

# Import from core
from app.core.auth import EXPIRE_TIME, create_access_token, verify_token, oauth2_scheme

# Import user services
import app.services.user as user_service
from app.dependencies import get_db
from app.core.crud import get_user_by_username

# Import user schemas
from app.schemas.token import Token
from app.schemas.users import UserCreate, UserResponse, UserUpdate

router = APIRouter()

@router.post("/register", response_model = UserResponse) # Creates /register endpoint in the API
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    new_user = user_service.register_user(db=db, user_data=user)
    return new_user

@router.post("/login", response_model = Token) # Creates /login endpoint in the API
async def login(form_data: OAuth2PasswordRequestForm = Depends(),
                db: Session = Depends(get_db)):
    user = user_service.login_user(db=db, username=form_data.username,
                                                    password=form_data.password)
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials",
                            headers={"WWW-Authenticate": "Bearer"})
    expires = timedelta(minutes=EXPIRE_TIME)
    access_token = create_access_token(data={"sub": user.username},
                                       expires = expires)
    return {"access_token": access_token, "token_type": "bearer"}

#find how to send email verification code to user
@router.post("/verify/{verification_code}") # Creates /verify/{verification_code} endpoint in the API
def verify_email(verification_code: str, db: Session = Depends(get_db)):
    raise HTTPException(status_code=400, detail="Email verification is not implemented yet.")

@router.put("/update") # Creates /update endpoint in the API
def update_user_info(new_info: UserUpdate, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    decoded_token = verify_token(token)
    if decoded_token is None:
        raise HTTPException(status_code=401, detail="Invalid token",
                            headers={"WWW-Authenticate": "Bearer"})
    current_user = get_user_by_username(db=db, username=decoded_token.username)
    updated_user = user_service.update_user(db=db, new_data=new_info, user_data=current_user)
    return updated_user

@router.get("/info/{username}") # Creates /info/{username} endpoint in the API
def read_user(username: str, db: Session = Depends(get_db)):
    user = get_user_by_username(db=db, username=username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/me", response_model=UserResponse) # Creates /me endpoint in the API
async def read_me(token: str = Depends(oauth2_scheme),
                  db: Session = Depends(get_db)):
    decoded_token = verify_token(token)
    if decoded_token is None:
        raise HTTPException(status_code = 401, detail = "Invalid token",
                            headers = {"WWW-Authenticate": "Bearer"})
    username = decoded_token.username
    user = get_user_by_username(db = db, username = username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
    
@router.delete("/delete/{username}") # Creates /delete/{username} endpoint in the API
def deletes_user(username: str, db: Session = Depends(get_db)):
    user = user_service.get_user_by_username(db=db, username=username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user_service.delete_user(db=db, user=user)
    return {"message": "User deleted successfully"}
