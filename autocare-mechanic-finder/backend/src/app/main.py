from fastapi import FastAPI

from app.core.database import Base, engine
from app.routes.car import router as car_router
from app.routes.user import router as user_router

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(user_router, prefix="/users", tags=["users"])
app.include_router(car_router, prefix="/cars", tags=["cars"])

@app.get("/")
def read_root():
    return {"Welcome to MyCareCare!"}
