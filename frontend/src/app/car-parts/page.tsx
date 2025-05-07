'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function CarPartsPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: 'url(/images/RoadSurface.jpg)' }}
    >
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-60 bg-[#738678] p-6 transform transition-transform ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <h2 className="text-white font-bold mb-4">Menu / Navigation</h2>
        <nav className="flex flex-col space-y-4 text-white">
          <a href="#" className="font-bold">
            Home
          </a>
          <a href="#" className="font-bold">
            Register New Car
          </a>
          <a href="#" className="font-bold">
            Car Parts
          </a>
          <a href="#" className="font-bold">
            AutoShop Parts Finder
          </a>
          <a href="#" className="font-bold">
            Update Account
          </a>
        </nav>
      </div>

      {/* Menu button */}
      <button
        className="fixed top-4 left-4 z-20 px-4 py-2 rounded bg-[#738678] text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? 'Close' : 'Menu'}
      </button>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div
          className="p-8 rounded-lg w-full max-w-3xl"
          style={{ backgroundColor: '#C4C4C4' }}
        >
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-3xl font-bold mr-2">My Car Care</h1>
            <Image
              src="/images/AutoCareLogo2_trimmed.png"
              alt="My Car Care Logo"
              width={50}
              height={50}
            />
          </div>

          <input
            type="text"
            placeholder="Search for a part..."
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className="flex items-center justify-between bg-white p-3 rounded shadow"
              >
                <span className="font-medium">Search Result {num}</span>
                <button className="px-3 py-1 rounded bg-[#738678] text-white">
                  View Image
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button className="px-4 py-2 rounded bg-[#738678] text-white">
              Click Here for Tutorials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
