'use client';
import React from 'react';

export default function MenuButton({ menuOpen, toggleMenu }) {
  return (
    <button
      className="fixed top-4 left-4 z-20 px-4 py-2 rounded bg-[#738678] text-white hover:bg-[#5a6d5c]"
      onClick={toggleMenu}
    >
      {menuOpen ? '' : 'Menu'}
    </button>
  );
}
