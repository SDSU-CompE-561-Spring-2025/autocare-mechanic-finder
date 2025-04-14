from functools import lru_cache

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    DATABASE_URL: str
    PRIVATE_KEY: str


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
