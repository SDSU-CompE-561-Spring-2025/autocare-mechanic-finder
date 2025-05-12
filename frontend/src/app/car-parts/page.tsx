'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import MenuButton from '../../components/ui/MenuButton';
import Sidebar from '../../components/ui/SideBar';
import SearchForm from '../../components/ui/SearchForm';
import SearchResultCard from '../../components/ui/SearchResultCard';
import TutorialButton from '../../components/ui/TutorialButton';

export default function CarPartsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [trim, setTrim] = useState('');
  const [partNumber, setPartNumber] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const queryParams = new URLSearchParams();
      if (year) queryParams.append('year', year);
      if (make) queryParams.append('make', make);
      if (model) queryParams.append('model', model);
      if (trim) queryParams.append('trim', trim);
      if (partNumber) queryParams.append('part_number', partNumber);

      const response = await fetch(`/api/autoparts/search?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch parts');
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (err) {
      setError('Error fetching parts.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      
    >
      {/* Sidebar passes close-only function */}
      <Sidebar menuOpen={menuOpen} toggleMenu={() => setMenuOpen(false)} />

      {/* Top-left toggle button */}
      <MenuButton menuOpen={menuOpen} toggleMenu={() => setMenuOpen(!menuOpen)} />

      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="p-8 rounded-lg w-full max-w-3xl" style={{ backgroundColor: '#C4C4C4' }}>
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-3xl font-bold mr-2 text-black">My Car Care</h1>
          </div>

          <SearchForm
            year={year}
            make={make}
            model={model}
            trim={trim}
            partNumber={partNumber}
            setYear={setYear}
            setMake={setMake}
            setModel={setModel}
            setTrim={setTrim}
            setPartNumber={setPartNumber}
            handleSearch={handleSearch}
            loading={loading}
          />

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <div className="space-y-2">
            {searchResults.length > 0 ? (
              searchResults.map((item, index) => (
                <SearchResultCard key={index} item={item} />
              ))
            ) : (
              !loading && (
                <p className="text-center text-gray-700">
                  No results yet. Try searching above.
                </p>
              )
            )}
          </div>

          <div className="flex justify-center mt-6">
            <TutorialButton />
          </div>
        </div>
      </div>
    </div>
  );
}
