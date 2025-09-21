from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from config import settings
from database import engine, SessionLocal
from models import Base, Location
from routers.api_router import api_router
from scripts.load_locations import add_locations_to_db


Base.metadata.create_all(bind=engine)

def check_and_load_locations():
    """
    Check if locations exist in the database, and load them from CSV if they don't
    """
    db = SessionLocal()
    try:
        # Check if any locations exist
        location_count = db.query(Location).count()
        
        if location_count == 0:
            print("No locations found in database. Loading locations from CSV...")
            add_locations_to_db()
            print("Locations loaded successfully.")
        else:
            print(f"Found {location_count} locations in database.")
    except Exception as e:
        print(f"Error checking/loading locations: {e}")
    finally:
        db.close()

app = FastAPI(title="Weather Dashboard API")

# Startup event to check and load locations
@app.on_event("startup")
async def startup_event():
    check_and_load_locations()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.PORT, reload=True)
