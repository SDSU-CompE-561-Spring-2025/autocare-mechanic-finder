from pydantic import BaseModel
from datetime import datetime
from enum import Enum

class CarType(str, Enum):
    Cars = "car"
    Year = 2024
    Mileage = 300000


class CarBase(BaseModel):
    Cars: str
    BrandName: CarType
    Mileage: int
    Year: int
    Trim: str
    LastOilChange: str
    AirFilter: str



class CarCreate(CarBase):
    Car_id: int
    created_at: datetime

class CarResponse(CarBase):
    Car_id: int

    class Config:
        from_attributes = True
