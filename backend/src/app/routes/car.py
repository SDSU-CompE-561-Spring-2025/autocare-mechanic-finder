from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import timedelta
from fastapi.security import OAuth2PasswordRequestForm


# Import from core
from app.core.auth import EXPIRE_TIME, create_access_token, verify_token, oauth2_scheme

# Import car services
import app.services.car as car_service
from app.dependencies import get_db
from app.core.crud import get_user_by_username

# Import car schemas
from app.schemas.car import CarCreate, CarResponse, Car, CarUpdate
from app.schemas.users import UserResponse

router = APIRouter()

@router.post("/add", response_model=CarResponse)  # Creates /add endpoint in the API
def add_car(car_data: CarCreate, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    decoded_token = verify_token(token)
    if decoded_token is None:
        raise HTTPException(status_code=401, detail="Invalid token",
                            headers={"WWW-Authenticate": "Bearer"})
    user = get_user_by_username(db=db, username=decoded_token.username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user_id = user.user_id
    new_car = car_service.add_car(db=db, user_id=user_id, car_data=car_data)
    return new_car

@router.put("/update")  # Creates /update endpoint in the API
def update_car(car_id: int, new_info: CarUpdate, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    decoded_token = verify_token(token)
    if decoded_token is None:
        raise HTTPException(status_code=401, detail="Invalid token",
                            headers={"WWW-Authenticate": "Bearer"})
    user = get_user_by_username(db=db, username=decoded_token.username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    updated_car = car_service.update_car(db=db, user_id=user.user_id, car_id=car_id, car_info=new_info)
    return updated_car

@router.get("/info/{car_id}", response_model = Car)  # Creates /info/{car_id} endpoint in the API
def read_car_info(car_id: int, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    decoded_token = verify_token(token)
    if decoded_token is None:
        raise HTTPException(status_code=401, detail="Invalid token",
                            headers={"WWW-Authenticate": "Bearer"})
    user = get_user_by_username(db=db, username=decoded_token.username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    car = car_service.get_car_info(db=db, user_id=user.user_id, car_id=car_id)
    return car

@router.get("/mygarage", response_model=list[Car]) # Creates /mygarage endpoint in the API
def read_user_garage(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    decoded_token = verify_token(token)
    if decoded_token is None:
        raise HTTPException(status_code=401, detail="Invalid token",
                            headers={"WWW-Authenticate": "Bearer"})
    user = get_user_by_username(db=db, username=decoded_token.username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    cars = car_service.get_user_garage(db=db, user_id=user.user_id)
    return cars

@router.delete("/delete/{car_id}")  # Creates /delete/{car_id} endpoint in the API
def delete_car(car_id: int, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    decoded_token = verify_token(token)
    if decoded_token is None:
        raise HTTPException(status_code=401, detail="Invalid token",
                            headers={"WWW-Authenticate": "Bearer"})
    user = get_user_by_username(db=db, username=decoded_token.username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    deleted_car = car_service.delete_car(db=db, car_id=car_id, user_id=user.user_id)
    return deleted_car
