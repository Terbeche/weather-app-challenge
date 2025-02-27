from fastapi import APIRouter

api_router = APIRouter()

from .dashboard_locations_router import dashboard_location_router
from .locations_router import locations_router

api_router.include_router(dashboard_location_router)
api_router.include_router(locations_router)