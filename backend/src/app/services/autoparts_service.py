# services/autoparts_service.py

# Nathan Morris
# This module provides a service to search for autoparts using an external API.
# It is designed to be provider-agnostic until a final autoparts API is selected.
# It fetches autoparts using parameters: year, make, model, trim, and part number.

import os
import requests
from fastapi import HTTPException

AUTOPARTS_API_URL = os.getenv("AUTOPARTS_API_URL", "https://mock.autopartsapi.com/v1/search")
AUTOPARTS_API_KEY = os.getenv("AUTOPARTS_API_KEY")  # Optional, depending on the provider

def search_autoparts(year=None, make=None, model=None, trim=None, part_number=None) -> dict:
    if not AUTOPARTS_API_URL:
        raise HTTPException(status_code=500, detail="Missing autoparts API URL")

    headers = {}
    if AUTOPARTS_API_KEY:
        headers["Authorization"] = f"Bearer {AUTOPARTS_API_KEY}"

    params = {
        "year": year,
        "make": make,
        "model": model,
        "trim": trim,
        "part_number": part_number
    }

    # Remove empty/null values
    clean_params = {k: v for k, v in params.items() if v is not None}

    try:
        response = requests.get(AUTOPARTS_API_URL, headers=headers, params=clean_params)
        response.raise_for_status()
    except requests.RequestException as e:
        raise HTTPException(status_code=422, detail=f"Autoparts API request failed: {e}")

    return response.json()
