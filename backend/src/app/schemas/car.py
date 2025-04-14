from pydantic import BaseModel
from enum import Enum

class CarType(str, Enum):
    car = "car"


class CarBase(BaseModel):
    car_name: str
    car_type: CarType


class CarCreate(CarBase):
    pass

class CarResponse():
    #needs to be in