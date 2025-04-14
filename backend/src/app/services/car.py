# src/app/services/car_service.py

# Nathan Morris
# This module provides car management services including adding, updating, retrieving, and deleting car information.
# It simulates a database using an in-memory dictionary for car data storage.
# It includes functions to add a new car, update car information, retrieve car details, get user garage, and delete a car

from fastapi import HTTPException
from datetime import datetime

# In-memory car storage
cars_db = {}
user_cars = {}

def add_car(car_data: dict) -> dict:
    car_id = car_data.get("car_id")
    username = car_data.get("username")

    if car_id in cars_db:
        raise HTTPException(status_code=422, detail="Car already exists")

    car_data["created_at"] = datetime.now().isoformat()
    cars_db[car_id] = car_data
    user_cars.setdefault(username, []).append(car_id)
    return car_data

def update_car(car_data: dict) -> dict:
    car_id = car_data.get("car_id")
    if car_id not in cars_db:
        raise HTTPException(status_code=404, detail="Car not found")

    cars_db[car_id].update(car_data)
    return cars_db[car_id]

def get_car_info(car_id: int) -> dict:
    if car_id not in cars_db:
        raise HTTPException(status_code=404, detail="Car not found")
    return cars_db[car_id]

def get_user_garage(username: str) -> list:
    car_ids = user_cars.get(username, [])
    return [cars_db[cid] for cid in car_ids]

def delete_car(car_id: int) -> dict:
    if car_id not in cars_db:
        raise HTTPException(status_code=404, detail="Car not found")

    for user, car_list in user_cars.items():
        if car_id in car_list:
            car_list.remove(car_id)
            break
    del cars_db[car_id]
    return {"message": f"Car {car_id} deleted successfully"}
