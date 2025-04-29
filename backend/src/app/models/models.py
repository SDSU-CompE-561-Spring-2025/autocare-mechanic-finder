#models
from datetime import datetime, UTC
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

#Inspired by Ugar Dogan's model.py example
class User(Base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True, autoincrement=True, nullable=False, index=True)
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

    car_id = Column(Integer, primary_key=True, autoincrement=True, nullable=False, index=True)
    cars = Column(Integer, ForeignKey(User.user_id), nullable = False) #ForeignKey=True      #Syntax: ForeignKey(user.keyitem)
    BrandName = Column(String)
    model = Column(String)
    year = Column(Integer)
    mileage = Column(Integer)
    trim = Column(String)
    LastOilChange = Column(String)
    AirFilter = Column(String)
    created_at = Column(DateTime, default=datetime.now(UTC))

    user = relationship("User", back_populates="cars")

class Login(Base):
    __tablename__ = 'Tokens'

    Token_Id = Column(String, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey(User.user_id), nullable=True) 
    Auth = Column(Integer, nullable=True)
    Error_type = Column(String)
    Error_message = Column(String)
    created_at = Column(DateTime, default=datetime.now(UTC))

    user = relationship("User", back_populates="login")


