from fastapi import FastAPI

from .core.database import Base, engine

Base.metadata.create_all(bind=engine)
app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}
