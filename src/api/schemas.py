from pydantic import BaseModel
from typing import List, Optional

class LocationBase(BaseModel):
    name: str
    latitude: float
    longitude: float
    country: str

class LocationCreate(LocationBase):
    pass

class LocationModel(LocationBase):
    id: int

    class Config:
        from_attributes = True

class LocationId(BaseModel):
    id: int

# Dashboard location schemas
class DashboardLocationBase(BaseModel):
    location_id: int


class DashboardLocationCreate(DashboardLocationBase):
    pass


class DashboardLocationModel(BaseModel):
    id: int
    location_id: int

    class Config:
        from_attributes = True


# Weather schemas
class CurrentWeather(BaseModel):
    temperature: float
    rainfall: float
    weather_code: int


class LocationWeather(LocationModel):
    temperature: float
    rainfall: float
    weather_code: int


class ForecastDay(BaseModel):
    date: str
    temperature_min: float
    temperature_max: float
    rain_sum: float
    weather_code: int


class LocationForecast(LocationModel):
    forecast: List[ForecastDay]