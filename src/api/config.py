import os
from typing import List
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

print("Loading environment variables...")
print("ALLOWED_ORIGINS:", os.getenv("ALLOWED_ORIGINS"))

class Settings(BaseSettings):
    PROJECT_NAME: str = "Weather Dashboard API"
    API_V1_STR: str = ""
    
    DB_USER: str = os.getenv("DB_USER")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD")
    DB_HOST: str = os.getenv("DB_HOST")
    DB_PORT: str = os.getenv("DB_PORT")
    DB_NAME: str = os.getenv("DB_NAME")
    
    POSTGRES_URI: str = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

    ALLOWED_ORIGINS: str = [os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")]

    PORT: int = int(os.getenv("PORT", 8000))

settings = Settings()