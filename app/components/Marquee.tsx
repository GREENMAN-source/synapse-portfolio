'use client';

import React from 'react';

export default function Marquee() {
  const words = "Inspire · Innovate · Impact · Arduino · ESP32 · Raspberry Pi · IoT · AI · Robotics · ";
  
  return (
    <div className="w-full bg-[#08090F] border-y border-white/5 py-4 overflow-hidden relative select-none">
      <style jsx>{`
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeScroll 25s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333%, 0, 0);
          }
        }
      `}</style>

      <div className="marquee-track flex whitespace-nowrap gap-8 text-[13px] font-medium tracking-[0.08em] uppercase text-white/45 font-display">
        {/* Render 3 times for seamless looping */}
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex gap-8">
            <span>Inspire <span className="text-[#00E5FF]">·</span></span>
            <span>Innovate <span className="text-[#00E5FF]">·</span></span>
            <span>Impact <span className="text-[#00E5FF]">·</span></span>
            <span>Arduino <span className="text-[#00E5FF]">·</span></span>
            <span>ESP32 <span className="text-[#00E5FF]">·</span></span>
            <span>Raspberry Pi <span className="text-[#00E5FF]">·</span></span>
            <span>IoT <span className="text-[#00E5FF]">·</span></span>
            <span>AI <span className="text-[#00E5FF]">·</span></span>
            <span>Robotics <span className="text-[#00E5FF]">·</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}
