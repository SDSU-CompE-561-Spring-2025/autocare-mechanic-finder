'use client';

import React from 'react';

export default function Sidebar({ menuOpen, toggleMenu }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-60 bg-[#738678] p-6 transform transition-transform flex flex-col ${
        menuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Header */}
      <div>
        <h2 className="text-white font-bold mb-6 text-xl">Menu / Navigation</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4 text-white flex-grow">
        <a href="/dashboard" className="font-bold hover:underline">Home</a>
        <a href="/RegisterCarPage" className="font-bold hover:underline">Register New Car</a>
        <a href="/car-parts" className="font-bold hover:underline">Car Parts</a>
        <a href="/AutoshopFinderPage" className="font-bold hover:underline">AutoShop Finder</a>
        <a href="/update-account" className="font-bold hover:underline">Update Account</a>
      </nav>

      {/* Close Button (sticks at the bottom) */}
      <div className="mt-auto">
        <button
          className="w-full px-4 py-2 rounded bg-white text-[#738678] font-bold hover:bg-gray-200"
          onClick={toggleMenu}
        >
          Close Menu
        </button>
      </div>
    </div>
  );
}
