from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import DashboardLocation, Location
from schemas import DashboardLocationModel, LocationId
from utils import get_weather_data, get_forecast_data

dashboard_location_router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# get all locations from the db
@dashboard_location_router.get("/locations")
def get_locations(db: Session = Depends(get_db)):
    dashboard_locations = db.query(DashboardLocation).all()
    locations = []
    for dashboard_location in dashboard_locations:
        location = db.get(Location, dashboard_location.location_id)
        weather_data = get_weather_data(location.latitude, location.longitude)
        location_data = {
            "id": dashboard_location.id,
            "location_id": location.id,
            "name": location.name,
            "country": location.country,
            "latitude": location.latitude,
            "longitude": location.longitude,
            "temperature": weather_data['current']['temperature'],
            "rainfall": weather_data['current']['rain'],
            "weather_code": weather_data['current']['weathercode'],
        }
        locations.append(location_data)
    return locations

# get a specific location
@dashboard_location_router.get("/locations/{id}")
def get_location(id: int, db: Session = Depends(get_db)):
    dashboard_location = db.get(DashboardLocation, id)
    if dashboard_location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    location = db.query(Location).get(dashboard_location.location_id)
    weather_data = get_weather_data(location.latitude, location.longitude)
    location_data = {
        "id": dashboard_location.id,
        "location_id": location.id,
        "name": location.name,
        "country": location.country,
        "latitude": location.latitude,
        "longitude": location.longitude,
        "temperature": weather_data['current']['temperature'],
        "rainfall": weather_data['current']['rain'],
        "weather_code": weather_data['current']['weathercode']
    }
    return location_data

# get forecast for a specific location
@dashboard_location_router.get("/forecast/{location_id}")
def get_forecast(location_id: int, db: Session = Depends(get_db)):
    location = db.get(Location, location_id)
    if location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    weather_data = get_forecast_data(location.latitude, location.longitude)
    location.time = weather_data['daily']['time']
    location.temperature_min = weather_data['daily']['temperature_2m_min']
    location.temperature_max = weather_data['daily']['temperature_2m_max']
    location.rain_sum = weather_data['daily']['rain_sum']
    location.weather_code = weather_data['daily']['weather_code']

    return location

# create location
@dashboard_location_router.post("/locations", response_model=DashboardLocationModel)
def create_location(location: LocationId, db: Session = Depends(get_db)):
    # Check if the location already exists in DashboardLocation
    existing_location = db.query(DashboardLocation).filter(DashboardLocation.location_id == location.id).first()
    if existing_location:
        raise HTTPException(status_code=400, detail="Location already exists in the dashboard")

    # Create and save the new location
    db_location = DashboardLocation(location_id=location.id)
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    
    return db_location

# delete location
@dashboard_location_router.delete("/locations/{id}")
def delete_location(id: int, db: Session = Depends(get_db)):
    dashboard_location = db.get(DashboardLocation, id)
    if dashboard_location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    db.delete(dashboard_location)
    db.commit()
    return {"message": "Location deleted successfully"}
