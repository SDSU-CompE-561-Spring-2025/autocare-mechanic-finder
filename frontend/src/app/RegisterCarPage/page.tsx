'use client';

import React, { useState } from 'react';

function RegisterNewCar() {
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [trim, setTrim] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [currentMileage, setCurrentMileage] = useState('');
  const [lastOilChange, setLastOilChange] = useState('');
  const [lastAirFilterChange, setLastAirFilterChange] = useState('');
  const [lastRegistrationRenewal, setLastRegistrationRenewal] = useState('');
  const [stateOfResidence, setStateOfResidence] = useState('');
  const [carNickname, setCarNickname] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file.name);
    }
  };

  const isMileageValid = !isNaN(parseFloat(currentMileage)) && isFinite(currentMileage);
  const isFormValid =
    year.trim() !== '' &&
    make.trim() !== '' &&
    model.trim() !== '' &&
    fuelType.trim() !== '' &&
    isMileageValid &&
    lastOilChange.trim() !== '' &&
    lastAirFilterChange.trim() !== '' &&
    lastRegistrationRenewal.trim() !== '' &&
    stateOfResidence.trim() !== '';

  const handleAddCar = () => {
    if (isFormValid) {
      // Implement your logic to add the car details
      console.log({
        year,
        make,
        model,
        trim,
        fuelType,
        currentMileage,
        lastOilChange,
        lastAirFilterChange,
        lastRegistrationRenewal,
        stateOfResidence,
        carNickname,
        uploadedImage,
      });
      // You would typically send this data to an API or update local state
    } else {
      alert('Please fill in all the required fields.');
    }
  };

  const handleCancel = () => {
    // Implement your logic to handle cancellation
    console.log('Registration cancelled');
    // You might want to navigate back or clear the form
  };

  return (
    <div
      style={{
        background: `url('/images/RoadSurface.jpg') center center / cover no-repeat`,
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <button style={{ padding: '8px 15px', borderRadius: '5px', border: 'none', backgroundColor: '#555', color: '#fff', cursor: 'pointer' }}>
            Menu
          </button>
          <h2 style={{ margin: 0, color: '#333' }}>Register New Car</h2>
          <span style={{ fontSize: '1.5em', color: '#f8a619' }}>⚙️</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gap: '10px', marginBottom: '15px' }}>
          {/* Input fields remain the same */}
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
            <label htmlFor="fuelType">Car/Fuel Type:*</label>
            <input
              type="text"
              id="fuelType"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
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
          <div>
            <label htmlFor="lastRegistrationRenewal">Date of Last Registration Renewal:*</label>
            <input
              type="text"
              id="lastRegistrationRenewal"
              value={lastRegistrationRenewal}
              onChange={(e) => setLastRegistrationRenewal(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="stateOfResidence">State of Residence:*</label>
            <input
              type="text"
              id="stateOfResidence"
              value={stateOfResidence}
              onChange={(e) => setStateOfResidence(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="carNickname">Car Nickname: (Optional)</label>
            <input
              type="text"
              id="carNickname"
              value={carNickname}
              onChange={(e) => setCarNickname(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="uploadImage">Upload Image: (Optional)</label>
            <input
              type="file"
              id="chooseImage"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <button
              type="button"
              onClick={() => document.getElementById('chooseImage').click()}
              style={{ padding: '8px 15px', borderRadius: '5px', border: 'none', backgroundColor: '#f8a619', color: '#fff', cursor: 'pointer' }}
            >
              Choose
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button
            onClick={handleAddCar}
            disabled={!isFormValid}
            style={{
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: isFormValid ? '#5cb85c' : '#8fbc8f', // Lighter shade of green
              color: isFormValid ? '#fff' : '#d3d3d3', // Lighter shade of grey
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