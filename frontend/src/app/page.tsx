'use client';

import React, { useState } from 'react';
import {
    GoogleMap,
    Marker,
    useJsApiLoader,
} from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '500px',

};

const center = {
    lat: 37.78,
    lng: -122.4
}

export default function AutoShopLocator() {
    const [shops, setShops] = useState<google.maps.places.PlaceResult[]>([]);
    const [mapCenter, setMapCenter] = useState(center);
    const [address, setAddress] = useState('');
  
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '', // Add key to your .env
      libraries: ['places'],
    });
  
    const findShops = () => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          setMapCenter({ lat: location.lat(), lng: location.lng() });
  
          const service = new google.maps.places.PlacesService(
            document.createElement('div')
          );
  
          const request = {
            location,
            radius: 5000,
            keyword: 'auto repair',
          };
  
          service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
              setShops(results);
            }
          });
        } else {
          alert('Could not find location');
        }
      });
    };
  
    if (!isLoaded) return <div>Loading map...</div>;
  
    return (
      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="p-2 border rounded w-full"
          />
          <button
            onClick={findShops}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Search
          </button>
        </div>
        <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={13}>
          {shops.map((shop, i) => (
            <Marker
              key={i}
              position={{
                lat: shop.geometry?.location?.lat() || 0,
                lng: shop.geometry?.location?.lng() || 0,
              }}
            />
          ))}
        </GoogleMap>
      </div>
    );
  }