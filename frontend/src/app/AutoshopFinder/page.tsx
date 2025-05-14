'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

interface AutoShop {
  place_id: string;
  name: string;
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
  vicinity?: string;
}

const NearbyAutoShopsMap = () => {
  const [zipCode, setZipCode] = useState('');
  const [center, setCenter] = useState({ lat: 32.7157, lng: -117.1611 }); // Default: San Diego
  const [zoom, setZoom] = useState(12);
  const [autoShops, setAutoShops] = useState<AutoShop[]>([]);
  const [error, setError] = useState('');
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const mapRef = useRef(null);
  const [selectedShop, setSelectedShop] = useState<AutoShop | null>(null);

  console.log('Current googleMapsApiKey:', googleMapsApiKey); // Debugging API Key

  useEffect(() => {
    console.log('window.google:', window.google);
    if (window.google && window.google.maps) {
      console.log('Google Maps API core is available (initial check).');
    } else {
      console.log('Google Maps API core is NOT yet available (initial check).');
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google && mapRef.current) {
      placesServiceRef.current = new window.google.maps.places.PlacesService(mapRef.current);
      console.log('useEffect - Initialized PlacesService with map container.');
    }
  }, [isMapLoaded]);

  const onMapLoad = useCallback((mapInstance: any) => {
    console.log('onMapLoad FUNCTION EXECUTED - Map instance:', mapInstance);
    mapRef.current = mapInstance;
    setIsMapLoaded(true);
    console.log('onMapLoad - Map loaded:', isMapLoaded);
  }, []);

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newZipCode = e.target.value;
    setZipCode(newZipCode);
    setError('');
    setAutoShops([]);
    setSelectedShop(null);
    console.log('handleZipCodeChange - Zip code entered:', newZipCode);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    setDebounceTimeout(
      setTimeout(() => {
        if (newZipCode.length === 5 && isMapLoaded) {
          console.log('setTimeout - Attempting find Location for:', newZipCode);
          findLocationFromZip(newZipCode);
        } else {
          console.log(
            'setTimeout - Condition not met. Length:',
            newZipCode.length,
            'isMapLoaded:',
            isMapLoaded
          );
        }
      }, 500)
    );
  };

  const findLocationFromZip = (zip: string) => {
    console.log('findLocationFromZip - Searching for zip:', zip);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: zip }, (results, status) => {
      console.log('findLocationFromZip - Geocoder status:', status);
      console.log('findLocationFromZip - Geocoder results:', results);
      if (status === 'OK' && results && results.length > 0) {
        const location = results[0].geometry.location;
        const latLng = { lat: location.lat(), lng: location.lng() };
        setCenter(latLng);
        setZoom(14);
        console.log('findLocationFromZip - New center:', latLng);
        findAutoShops(latLng);
      } else {
        setError('Invalid zip code.');
      }
    });
  };

  const findAutoShops = useCallback(
    (location: { lat: number; lng: number }) => {
      console.log('findAutoShops - Searching near:', location);
      if (!placesServiceRef.current) {
        setError('Google Maps service not initialized.');
        console.error('findAutoShops - PlacesService is null');
        return;
      }

      placesServiceRef.current.nearbySearch(
        {
          location,
          radius: 8047, // ~5 miles
          type: 'car_repair',
        },
        (results, status) => {
          console.log('findAutoShops - PlacesService status:', status);
          console.log('findAutoShops - PlacesService results:', results);
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            setAutoShops(results as AutoShop[]);
            setError('');
          } else {
            setError('No auto shops found.');
          }
        }
      );
    },
    []
  );

  const handleMarkerClick = useCallback((shop: AutoShop) => {
    setSelectedShop(shop);
  }, []);

  const handleMapIdle = useCallback(
    (camera: any) => {
      if (!camera?.center) return;

      const latLng = {
        lat: camera.center.latitude,
        lng: camera.center.longitude,
      };

      setCenter(latLng);
      findAutoShops(latLng);
    },
    [findAutoShops]
  );

  return (
    <div
      style={{
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
        <label htmlFor="zipCodeInput" style={{ marginRight: '10px' }}>
          Enter Zip Code:
        </label>
        <input
          type="text"
          id="zipCodeInput"
          name="zipCode"
          placeholder="Enter Zip Code"
          value={zipCode}
          onChange={handleZipCodeChange}
          style={{
            padding: '8px',
            borderRadius: '4px',
            color: 'black',
          }}
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {googleMapsApiKey ? (
        <>
          {console.log('APIProvider is being rendered.')}
          <div
            style={{
              height: '400px',
              width: '80%',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            }}
          >
            <APIProvider apiKey={googleMapsApiKey}>
              <Map
                center={center}
                zoom={zoom}
                mapId={process.env.NEXT_PUBLIC_MAP_ID}
                onLoad={onMapLoad}
                ref={mapRef}
                // Removed potentially problematic props for debugging
                // onIdle={handleMapIdle}
                // gestureHandling="greedy"
                // disableDefaultUI={false}
              >
                {autoShops.map((shop) => (
                  <AdvancedMarker
                    key={shop.place_id}
                    position={{ lat: shop.geometry.location.lat(), lng: shop.geometry.location.lng() }}
                    onClick={() => handleMarkerClick(shop)}
                  >
                    <Pin background="#1976d2" borderColor="#fff" glyphColor="#fff" />
                  </AdvancedMarker>
                ))}
              </Map>
            </APIProvider>
          </div>
        </>
      ) : (
        <p style={{ color: 'red' }}>Missing Google Maps API key.</p>
      )}

      {selectedShop && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: 'white',
            color: 'black',
            textAlign: 'left',
          }}
        >
          <h2>{selectedShop.name}</h2>
          {selectedShop.vicinity && <p>Address: {selectedShop.vicinity}</p>}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              selectedShop.name + (selectedShop.vicinity ? ' ' + selectedShop.vicinity : '')
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1976d2', textDecoration: 'none' }}
          >
            View on Google Maps
          </a>
          <button onClick={() => setSelectedShop(null)} style={{ marginTop: '10px' }}>
            Close
          </button>
        </div>
      )}

      {autoShops.length > 0 && !selectedShop && (
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