'use client';

import React, { useState, useRef, useEffect } from 'react';

const NearbyAutoShopsMap = () => {
  const [zipCode, setZipCode] = useState('');
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const [autoShops, setAutoShops] = useState([]);
  const [error, setError] = useState('');
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!googleMapsApiKey) {
      setError('Missing Google Maps API key.');
      return;
    }

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.head.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, [googleMapsApiKey]);

  useEffect(() => {
    if (scriptLoaded && mapRef.current && !map) {
      const initialLocation = { lat: 32.7157, lng: -117.1611 }; // San Diego default
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: initialLocation,
        zoom: 12,
      });
      setMap(newMap);
    }
  }, [scriptLoaded, mapRef, map]);

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
    setError('');
    setAutoShops([]);
  };

  const findAutoShops = () => {
    if (!map || !window.google) return;

    if (!zipCode) {
      setError('Please enter a zip code.');
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: zipCode }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        const location = results[0].geometry.location;
        map.setCenter(location);
        map.setZoom(14);

        const placesService = new window.google.maps.places.PlacesService(map);
        placesService.nearbySearch(
          {
            location,
            radius: 5000,
            type: 'car_repair', // 'auto_repair' is deprecated, use 'car_repair'
          },
          (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              setAutoShops(results);
              results.forEach((place) => {
                new window.google.maps.Marker({
                  map,
                  position: place.geometry.location,
                  title: place.name,
                });
              });
            } else {
              setError('No auto shops found.');
            }
          }
        );
      } else {
        setError('Invalid zip code.');
      }
    });
  };

  return (
    <div
      style={{
        background: `url('/images/bg1.png') center center / cover no-repeat`,
        minHeight: '100vh',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <h1>Find Nearby Auto Shops</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter Zip Code"
          value={zipCode}
          onChange={handleZipCodeChange}
          style={{
            padding: '8px',
            borderRadius: '4px',
            marginRight: '10px',
            color: 'white',
          }}
        />
        <button
          onClick={findAutoShops}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Find Shops
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div
        ref={mapRef}
        style={{
          height: '400px',
          width: '80%',
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        }}
      />

      {autoShops.length > 0 && (
        <div style={{ marginTop: '20px', width: '80%' }}>
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