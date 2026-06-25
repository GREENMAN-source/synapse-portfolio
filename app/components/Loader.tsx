'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    const duration = 900; // Total loading time in ms
    const startTime = performance.now();

    const updateProgress = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentPercent = Math.floor(progress * 100);

      setPercent(currentPercent);
      if (fillRef.current) {
        fillRef.current.style.width = `${currentPercent}%`;
      }

      if (progress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        // Trigger completion animations
        playExitAnimations();
      }
    };

    requestAnimationFrame(updateProgress);

    const playExitAnimations = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          onComplete();
        }
      });

      // Fade out logo and percentage
      tl.to(centerRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: 'power2.in'
      });

      // Slide top screen half up, bottom screen half down
      tl.to(topRef.current, {
        yPercent: -100,
        duration: 0.65,
        ease: 'power2.inOut'
      }, '-=0.1');

      tl.to(bottomRef.current, {
        yPercent: 100,
        duration: 0.65,
        ease: 'power2.inOut'
      }, '-=0.65');

      // Finally hide the entire container to let pointer events through
      tl.to(containerRef.current, {
        display: 'none',
        duration: 0
      });
    };

    return () => {
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="loader-container">
      <div ref={topRef} className="loader-top" />
      <div ref={bottomRef} className="loader-bottom" />
      
      <div ref={centerRef} className="loader-center">
        <p className="loader-logo font-bold uppercase tracking-[0.2em] text-white text-lg md:text-xl">
          Synapse <span className="text-[#00E5FF]">Lab</span>
        </p>
        
        <div className="loader-bar w-[200px] h-[2px] bg-white/5 overflow-hidden relative">
          <div ref={fillRef} className="loader-fill absolute top-0 left-0 h-full bg-[#00E5FF]" />
        </div>
        
        <p className="loader-percent font-mono text-[10px] tracking-[0.1em] text-white/40">
          {percent}%
        </p>
      </div>
    </div>
  );
}
