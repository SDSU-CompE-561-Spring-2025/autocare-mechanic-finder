from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db
# Import car schemas
from app.schemas.car import CarType, CarCreate, CarResponse
# Import car services

router = APIRouter()

@router.post("/add")  # Creates /add endpoint in the API
def add_car(car: CarCreate, db: Session = Depends(get_db)):
    new_car = car_service.create_car(db=db, car=car)
    return new_car

@router.put("/update")  # Creates /update endpoint in the API
def update_car(car_id: int, car: CarResponse, db: Session = Depends(get_db)):
    updated_car = car_service.update_car(db=db, car_id=car_id, car=car)
    return updated_car

@router.get("/info/{car_id}", response_model = CarType)  # Creates /info/{car_id} endpoint in the API
def read_car_info(car_id: int, db: Session = Depends(get_db)):
    car = car_service.get_car(db=db, car_id=car_id)
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    return car

@router.get("/garage/{username}") # Creates /garage/{username} endpoint in the API
def read_user_garage(username: str, db: Session = Depends(get_db)):
    cars = car_service.get_user_cars(db=db, username=username)
    return cars

@router.delete("/delete/{car_id}")  # Creates /delete/{car_id} endpoint in the API
def delete_car(car_id: int, db: Session = Depends(get_db)):
    deleted_car = car_service.delete_car(db=db, car_id=car_id)
    if not deleted_car:
        raise HTTPException(status_code=404, detail="Car not found")
    return {"message": "Car deleted successfully"}
