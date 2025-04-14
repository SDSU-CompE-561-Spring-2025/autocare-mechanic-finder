#models
from datetime import datetime, UTC
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base

#Inspired by Ugar Dogan's model.py example
class User(Base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True, AUTO_INCREMENT=True, nullable=False, index=True)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    State = Column(String)
    Cars = Column(String)
    created_at = Column(DateTime, default=datetime.now(UTC))

    cars = relationship("Car", back_populates="user")
    login = relationship("Login", back_populates="user")

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
    created_at = Column(DateTime, default=datetime.now(UTC))

    user = relationship("User", back_populates="cars")

class Login(Base):
    __tablename__ = 'Tokens'

    Token_Id = Column(String, primary_key=True, AUTO_INCREMENT=True)
    user_id = Column(Integer,foreign_key=True,nullable=True)
    Auth = Column(Integer, nullable=True)
    Error_type = Column(String)
    Error_message = Column(String)
    created_at = Column(DateTime, default=datetime.now(UTC))

    user = relationship("User", back_populates="login")


