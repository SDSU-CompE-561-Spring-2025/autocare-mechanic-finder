#models

from sqlalchemy import Column, Integer, String, DateTime, Relationship
from database import Base

#Inspired by Ugar Dogan's model.py example
class User(Base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True, AUTO_INCREMENT=True, nullable=False, index=True)
    name = Column(String, required=True, nullable=False)
    email = Column(String, required=True, unique=True, nullable=False)
    password = Column(String, required=True, nullable=False)
    State = Column(String)
    Cars = Column(String)
    created_at = Column(DateTime, default=DateTime.utcnow)

    cars = Relationship("Car", back_populates="user")
    login = Relationship("Login", back_populates="user")

class Car(Base):
    __tablename__ = 'cars'

    Car_id = Column(Integer, primary_key=True, index=True)
    Cars = Column(String, foreign_key=True, AUTO_INCREMENT=True)
    BrandName = Column(String)
    Model = Column(String)
    Year = Column(Integer)
    Mileage = Column(Integer)
    Trim = Column(String)
    LastOilChange = Column(String)
    AirFilter = Column(String)
    created_at = Column(DateTime, defualt=DateTime.utcnow)

    user = Relationship("User", back_populates="cars")

class Login(Base):

    Token_Id = Column(String, primary_key=True, AUTO_INCREMENT=True)
    user_id = Column(Integer,foreign_key=True,nullable=True)
    Auth = Column(bool, required=True)
    Error_type = Column(String)
    Error_message = Column(String)
    created_at = Column(DateTime, default=DateTime.utcnow)

    user = Relationship("User", back_populates="login")

 
