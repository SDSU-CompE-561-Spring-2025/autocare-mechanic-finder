# This module provides car management services including adding, updating, retrieving, and deleting car information.
# It simulates a database using an in-memory dictionary for car data storage.
# It includes functions to add a new car, update car information, retrieve car details, get user garage, and delete a car

from fastapi import HTTPException
from datetime import datetime
from sqlalchemy.orm import Session
from datetime import timezone

from app.models.models import Car
from app.schemas.car import CarCreate, CarResponse, CarType, CarBase, CarUpdate
from app.schemas.users import User

def add_car(db: Session, user_id: int, car_data: CarCreate):
    new_car = Car(
        year=car_data.year,
        BrandName=car_data.BrandName,
        model=car_data.model,
        trim=car_data.trim if car_data.trim else None,
        cars=user_id,      
        mileage=car_data.mileage if car_data.mileage else None,
        LastOilChange=car_data.LastOilChange if car_data.LastOilChange else None,
        AirFilter=car_data.AirFilter if car_data.AirFilter else None,
        created_at=datetime.now(timezone.utc),
    )
    db.add(new_car)
    db.commit()
    db.refresh(new_car)
    return new_car

def update_car(db: Session, user_id: int, car_id: int, car_info: CarUpdate):
    car = get_car_by_id(db=db, car_id=car_id)
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    if int(car.cars) != int(user_id):
        raise HTTPException(status_code=401, detail="You do not have authorization to update this car")
    car.trim = car_info.trim if car_info.trim else car.trim
    car.mileage = car_info.mileage if car_info.mileage else car.mileage
    car.LastOilChange = car_info.LastOilChange if car_info.LastOilChange else car.LastOilChange
    car.AirFilter = car_info.AirFilter if car_info.AirFilter else car.AirFilter
    db.commit()
    db.refresh(car)
    return car

def get_car_info(db: Session, user_id: int, car_id: int):
    car = get_car_by_id(db=db, car_id=car_id)
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    if int(car.cars) != int(user_id):
        raise HTTPException(status_code=401, detail="You are not authorized to view this information")
    return car

def get_user_garage(db: Session, user_id: int):
    cars = db.query(Car).filter(Car.cars == int(user_id)).all()
    if not cars:
        raise HTTPException(status_code=404, detail="No cars found for this user")
    return cars

def delete_car(db: Session, user_id: int, car_id: int):
    car = get_car_by_id(db=db, car_id=car_id)
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    if int(car.cars) != int(user_id):
        raise HTTPException(status_code=401, detail="You do not have authorization to delete this car")
    db.delete(car)
    db.commit()
    return {"message": "Car deleted successfully"}

def get_car_by_id(db: Session, car_id: int):
    car = db.query(Car).filter(Car.car_id == car_id).first()
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    return car