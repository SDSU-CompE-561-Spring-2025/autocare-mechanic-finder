from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

# Import user services
import app.services.user as user_service
from app.core.auth import EXPIRE_TIME, create_access_token
from app.dependencies import get_db
from app.core.crud import get_user_by_username

# Import user schemas
from app.schemas.token import Token
from app.schemas.users import UserCreate, UserResponse

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
    access_token_expires = timedelta(minutes=EXPIRE_TIME)
    access_token = create_access_token(data={"sub": user.username},
                                       expires_delta = access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/verify/{verification_code}") # Creates /verify/{verification_code} endpoint in the API
def verify_email(verification_code: str, db: Session = Depends(get_db)):
    return {"message": "Email verified successfully"}

@router.put("/update") # Creates /update endpoint in the API
def update_user(user: UserResponse, db: Session = Depends(get_db)):
    updated_user = user_service.update_user(db=db, user=user)
    return updated_user

@router.get("/info/{username}") # Creates /info/{username} endpoint in the API
def read_users_me(username: str, db: Session = Depends(get_db)):
    user = get_user_by_username(db=db, username=username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.delete("/delete/{username}") # Creates /delete/{username} endpoint in the API
def delete_user(username: str):
    deleted_user = user_service.delete_user(Session = Depends(get_db), username=username)
    if not deleted_user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}
