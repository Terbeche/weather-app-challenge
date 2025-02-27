from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Location

locations_router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@locations_router.get("/all_locations")
def get_all_locations(db: Session = Depends(get_db)):
    locations = db.query(Location).all()
    return locations
