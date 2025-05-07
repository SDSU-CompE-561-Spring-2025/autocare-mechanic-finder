'use client';
import React from 'react';

export default function Sidebar({ menuOpen }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-60 bg-[#738678] p-6 transform transition-transform ${
        menuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <h2 className="text-white font-bold mb-4">Menu / Navigation</h2>
      <nav className="flex flex-col space-y-4 text-white">
        <a href="#" className="font-bold">Home</a>
        <a href="#" className="font-bold">Register New Car</a>
        <a href="#" className="font-bold">Car Parts</a>
        <a href="#" className="font-bold">AutoShop Parts Finder</a>
        <a href="#" className="font-bold">Update Account</a>
      </nav>
    </div>
  );
}
