import csv
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.models import Location

def add_locations_to_db(csv_path: str = 'locations.csv'):
    """
    Load locations from CSV file into the database
    """
    db = SessionLocal()
    try:
        with open(csv_path, 'r') as file:
            reader = csv.DictReader(file, delimiter=',')
            for row in reader:
                existing = db.query(Location).filter(
                    Location.name == row['Capital City'],
                    Location.country == row['Country']
                ).first()
                
                if not existing:
                    location = Location(
                        name=row['Capital City'],
                        latitude=float(row['Latitude']),
                        longitude=float(row['Longitude']),
                        country=row['Country']
                    )
                    db.add(location)
        db.commit()
        print(f"Locations added successfully")
    except Exception as e:
        db.rollback()
        print(f"Error adding locations: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    add_locations_to_db()