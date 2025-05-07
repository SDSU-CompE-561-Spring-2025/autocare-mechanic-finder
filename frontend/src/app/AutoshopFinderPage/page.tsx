'use client';

import React, { useState, useRef, useEffect } from 'react';

const NearbyAutoShopsMap = () => {
  const [zipCode, setZipCode] = useState('');
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const [autoShops, setAutoShops] = useState([]);
  const [error, setError] = useState('');

  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places&callback=initMap`;
        script.async = true;
        window.initMap = initMap; // Make initMap accessible globally
        document.head.appendChild(script);
      } else {
        initMap();
      }
    };

    const initMap = () => {
      if (!mapRef.current) return; // Ensure mapRef is available

      const sanDiego = { lat: 32.7157, lng: -117.1611 }; // Default center if no zip code
      const initialMap = new window.google.maps.Map(mapRef.current, {
        center: sanDiego,
        zoom: 12,
      });
      setMap(initialMap);
    };

    // Only load the script if the API key is available
    if (googleMapsApiKey) {
      loadGoogleMapsScript();
    } else {
      console.error("Google Maps API key not found in environment variables.");
      setError("Google Maps API key is missing.");
    }

    return () => {
      delete window.initMap;
    };
  }, [googleMapsApiKey]); // Re-run if the API key changes (though it shouldn't in a typical setup)

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
    setError('');
    setAutoShops([]);
    if (map) {
      map.setCenter({ lat: 0, lng: 0 });
      map.setZoom(12);
    }
  };

  const findAutoShops = () => {
    if (!map) return;
    if (!zipCode) {
      setError('Please enter a zip code.');
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: zipCode }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        const location = results[0].geometry.location;
        map.setCenter(location);
        map.setZoom(15);

        const placesService = new window.google.maps.places.PlacesService(map);
        placesService.nearbySearch(
          {
            location: location,
            radius: 5000,
            type: 'auto_repair',
          },
          (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
              setAutoShops(results);
              results.forEach((place) => {
                new window.google.maps.Marker({
                  position: place.geometry.location,
                  map: map,
                  title: place.name,
                });
              });
            } else {
              setError('Could not find auto shops nearby.');
              console.error('Places API error:', status);
            }
          }
        );
      } else {
        setError('Invalid zip code.');
        console.error('Geocoding error:', status);
      }
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Find Nearby Auto Shops</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Zip Code"
          value={zipCode}
          onChange={handleZipCodeChange}
        />
        <button onClick={findAutoShops} style={{ marginLeft: '10px' }}>
          Find Shops
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div ref={mapRef} style={{ height: '400px', width: '100%', marginTop: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} />

      {autoShops.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Nearby Auto Shops:</h2>
          <ul>
            {autoShops.map((shop) => (
              <li key={shop.place_id}>{shop.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NearbyAutoShopsMap;