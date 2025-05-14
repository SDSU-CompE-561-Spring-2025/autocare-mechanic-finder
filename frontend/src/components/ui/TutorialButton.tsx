'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function TutorialButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/tutorials');
  };

  return (
    <button
      className="px-4 py-2 rounded bg-[#738678] text-white"
      onClick={handleClick}
    >
      Click Here for Tutorials
    </button>
  );
}
