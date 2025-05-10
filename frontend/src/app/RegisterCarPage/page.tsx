'use client';

import React, { useState } from 'react';
import { API_HOST_URL } from '@/lib/constants';

function RegisterNewCar() {
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [trim, setTrim] = useState('');
  const [currentMileage, setCurrentMileage] = useState('');
  const [lastOilChange, setLastOilChange] = useState('');
  const [lastAirFilterChange, setLastAirFilterChange] = useState('');

  const [error, setError] = useState('');

  const isMileageValid = !isNaN(parseFloat(currentMileage)) && isFinite(currentMileage);
  const isFormValid =
    year.trim() !== '' &&
    make.trim() !== '' &&
    model.trim() !== '' &&
    isMileageValid &&
    lastOilChange.trim() !== '' &&
    lastAirFilterChange.trim() !== '';

  const handleAddCar = async () => {
    if (!isFormValid) {
      setError('Please fill in all the required fields.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token is missing. Please log in.');
        return;
      }

      const carData = {
        year: parseInt(year),
        BrandName: make,
        model,
        trim,
        mileage: parseInt(currentMileage) || 0,
        LastOilChange: lastOilChange,
        AirFilter: lastAirFilterChange,
      };

      const response = await fetch(`${API_HOST_URL}/cars/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(carData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      console.log('Car added:', data);
      setYear('');
      setMake('');
      setModel('');
      setTrim('');
      setCurrentMileage('');
      setLastOilChange('');
      setLastAirFilterChange('');
    } catch (error: any) {
      setError(error.message);
      console.error('Error adding car:', error);
    }
  };

  const handleCancel = () => {
    console.log('Registration cancelled');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#ddd',
          borderRadius: '10px',
          padding: '30px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          width: '80%',
          maxWidth: '600px',
        }}
      >
        <div // Added this div for the tab
          style={{
            backgroundColor: '#ddd', // Gray color for the tab
            borderRadius: '10px 10px 0 0', // Rounded top corners
            padding: '10px', // Padding inside the tab
            marginBottom: '20px', // Space between tab and form content
            display: 'flex',          // For centering the text
            justifyContent: 'center',
          }}
        >
          <h2 style={{ margin: 0, color: '#333', fontWeight: 'bold' }}>Register New Car</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gap: '10px', marginBottom: '15px' }}>
          <div>
            <label htmlFor="year">Year:*</label>
            <input
              type="text"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="make">Make:*</label>
            <input
              type="text"
              id="make"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="model">Model:*</label>
            <input
              type="text"
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="trim">Trim: (Optional)</label>
            <input
              type="text"
              id="trim"
              value={trim}
              onChange={(e) => setTrim(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="currentMileage">Current Mileage:</label>
            <input
              type="text"
              id="currentMileage"
              value={currentMileage}
              onChange={(e) => setCurrentMileage(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="lastOilChange">Date of Last Oil Change:*</label>
            <input
              type="text"
              id="lastOilChange"
              value={lastOilChange}
              onChange={(e) => setLastOilChange(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="lastAirFilterChange">Date of Last Air Filter Change:*</label>
            <input
              type="text"
              id="lastAirFilterChange"
              value={lastAirFilterChange}
              onChange={(e) => setLastAirFilterChange(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button
            onClick={handleAddCar}
            disabled={!isFormValid}
            style={{
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: isFormValid ? '#5cb85c' : '#8fbc8f',
              color: isFormValid ? '#fff' : '#d3d3d3',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
            }}
          >
            Add Car
          </button>
          <button
            onClick={handleCancel}
            style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#d9534f', color: '#fff', cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
};

export default RegisterNewCar;

