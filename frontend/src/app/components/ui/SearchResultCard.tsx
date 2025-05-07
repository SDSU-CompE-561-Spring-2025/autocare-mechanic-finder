'use client';
import React from 'react';

export default function SearchResultCard({ item }) {
  return (
    <div className="flex flex-col bg-white p-3 rounded shadow">
      <span className="font-medium">{item.name}</span>
      <span className="text-sm text-black-700">Part #: {item.part_number}</span>
      <span className="text-sm text-black-600">{item.year} {item.make} {item.model} {item.trim}</span>
      <button className="mt-2 px-3 py-1 rounded bg-[#738678] text-white">View Image</button>
    </div>
  );
}
