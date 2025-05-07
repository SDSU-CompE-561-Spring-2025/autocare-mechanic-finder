'use client';
import React from 'react';

export default function SearchForm({
  year, make, model, trim, partNumber,
  setYear, setMake, setModel, setTrim, setPartNumber,
  handleSearch, loading
}) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 border rounded bg-white text-black placeholder-black"
        />
        <input
          type="text"
          placeholder="Make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          className="p-2 border rounded bg-white text-black placeholder-black"
        />
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="p-2 border rounded bg-white text-black placeholder-black"
        />
        <input
          type="text"
          placeholder="Trim"
          value={trim}
          onChange={(e) => setTrim(e.target.value)}
          className="p-2 border rounded bg-white text-black placeholder-black"
        />
        <input
          type="text"
          placeholder="Part Number"
          value={partNumber}
          onChange={(e) => setPartNumber(e.target.value)}
          className="col-span-2 p-2 border rounded bg-white text-black placeholder-black"
        />
      </div>
      <button
        className="px-4 py-2 mb-4 rounded bg-[#738678] text-white"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </>
  );
}
