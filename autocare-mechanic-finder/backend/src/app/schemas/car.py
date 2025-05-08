from pydantic import BaseModel
from datetime import datetime
from enum import Enum
from pydantic import Field

class CarBase(BaseModel):
    year: int
    BrandName: str
    model: str
    trim: str | None = None

class CarType(str, Enum):
    cars = "car"
    year = 2024
    mileage = 300000

class Car(CarBase):
    car_id: int = Field(..., gt=0)
    cars: int
    mileage: int | None = None
    LastOilChange: str | None = None
    AirFilter: str | None = None
    created_at: datetime

class CarCreate(CarBase):
    mileage: int | None = None
    LastOilChange: str | None = None
    AirFilter: str | None = None

class CarUpdate(BaseModel):
    trim: str | None = None
    mileage: int | None = None
    LastOilChange: str | None = None
    AirFilter: str | None = None

class CarResponse(CarBase):
    car_id: int
    cars: int

    class Config:
        from_attributes = True
