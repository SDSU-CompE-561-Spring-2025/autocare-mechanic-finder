from pydantic import BaseModel
from enum import Enum

class CarType(str, Enum):
    car = "car"
    year = 2024
    mileage = 300000


class CarBase(BaseModel):
    car_name: str
    Brand_type: CarType
    mile_age: int
    year: int
    Trim: str
    Last_Oil_Change: str
    AirFilter: str



class CarCreate(CarBase):
    pass

class CarResponse(CarBase):
    id: int

    class Config:
        from_attributes = True
