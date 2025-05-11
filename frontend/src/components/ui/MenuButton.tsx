'use client';
import React from 'react';

export default function MenuButton({ menuOpen, toggleMenu }) {
  return (
    <button
      className="ml-5 mb-5 p-2 flex justify-center rounded bg-[#738678] text-white hover:bg-[#5a6d5c]"
      onClick={toggleMenu}
    >
      {menuOpen ? '' : 'Menu'}
    </button>
  );
}
