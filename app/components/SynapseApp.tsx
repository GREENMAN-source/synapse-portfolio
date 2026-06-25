'use client';

import React, { useState } from 'react';
import CustomCursor from './CustomCursor';
import Loader from './Loader';
import Navbar from './Navbar';
import SynapseHome from './SynapseHome';

export default function SynapseApp() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-[#030408]">
      {/* Premium Magnetic Dual Cursor */}
      <CustomCursor />

      {/* Progress Loader Screen */}
      <Loader onComplete={() => setIsLoaded(true)} />

      {/* Blurred Floating Header & Circle overlay menu */}
      <Navbar />

      {/* Redesigned content sections */}
      <SynapseHome isLoaded={isLoaded} />
    </div>
  );
}
