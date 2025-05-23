'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function TutorialsPage() {
  const youtubeLinks = [
    { title: 'How to Change a Tire', id: 'joBmbh0AGSQ' },
    { title: 'How to Change the Oil', id: 'n2KDbTx9gVo' },
    { title: 'How to Replace Brake Pads', id: 'x2rTxWx-LfQ' },
  ];

  const [selectedVideoId, setSelectedVideoId] = useState('');

  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="p-8 rounded-lg w-full max-w-3xl" style={{ backgroundColor: '#C4C4C4' }}>
          
          {/* Title with logo */}
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-3xl font-bold mr-2 text-black">My Car Care</h1>
          </div>

          {/* YouTube links section */}
          <h2 className="text-xl font-semibold mb-2 text-black">
            Select a YouTube Link for a Quick Tutorial:
          </h2>
          <ul className="mb-6">
            {youtubeLinks.map((link, index) => (
              <li key={index} className="mb-2">
                <button
                  onClick={() => setSelectedVideoId(link.id)}
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {link.title}
                </button>
              </li>
            ))}
          </ul>

          {/* Embedded YouTube video (only shown when a link is clicked) */}
          {selectedVideoId && (
            <div>
              <h2 className="text-xl font-semibold mb-2 text-black">Embedded YouTube Video:</h2>
              <div className="relative w-full overflow-hidden" style={{ paddingTop: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded"
                  src={`https://www.youtube.com/embed/${selectedVideoId}`}
                  title="Car Tutorial Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
