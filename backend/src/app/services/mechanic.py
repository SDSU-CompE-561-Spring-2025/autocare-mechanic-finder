# src/app/services/mechanic_service.py
# Nathan Morris
# This module provides a service to searcj fpr nearby mechanics using the Google Maps API.
# It requires the Google Maps API key to be set in the environment variables.
# The service fetches nearby mechanics based on the provided latitude and longitude.
# It returns a list of mechanics with their name, address, and rating.

import os
import requests
from fastapi import HTTPException

GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

def get_nearby_mechanics(latitude: float, longitude: float):
    if not GOOGLE_MAPS_API_KEY:
        raise HTTPException(status_code=500, detail="Missing Google Maps API key")

    url = (
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
        f"?location={latitude},{longitude}"
        f"&radius=5000"
        f"&type=car_repair"
        f"&key={GOOGLE_MAPS_API_KEY}"
    )

    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to fetch from Google Maps API")

    data = response.json()
    return [
        {
            "name": place.get("name"),
            "address": place.get("vicinity", "No address"),
            "rating": place.get("rating", "N/A"),
        }
        for place in data.get("results", [])
    ]
