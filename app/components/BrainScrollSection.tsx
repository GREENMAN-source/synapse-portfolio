'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Brain3D from './Brain3D';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BrainScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !text1Ref.current || !text2Ref.current || !text3Ref.current) return;
    
    // Set initial states
    gsap.set([text2Ref.current, text3Ref.current], { opacity: 0, y: 50 });
    gsap.set(text1Ref.current, { opacity: 1, y: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=300%', // Pin for 3 screen heights
        pin: true,
        scrub: 1, // Smooth scrubbing
      }
    });

    // Timeline sequence:
    // 1. Fade out text 1, Fade in text 2
    tl.to(text1Ref.current, { opacity: 0, y: -50, duration: 1 })
      .to(text2Ref.current, { opacity: 1, y: 0, duration: 1 }, "<")
      
      // Keep text 2 visible for a moment
      .to({}, { duration: 0.5 })

      // 2. Fade out text 2, Fade in text 3
      .to(text2Ref.current, { opacity: 0, y: -50, duration: 1 })
      .to(text3Ref.current, { opacity: 1, y: 0, duration: 1 }, "<")
      
      // Keep text 3 visible before unpinning
      .to(text3Ref.current, { opacity: 1, duration: 1 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#030408] overflow-hidden">
      
      {/* 3D Pinned Background */}
      <Brain3D />

      {/* Overlay Text Container */}
      <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-6 md:px-12 pointer-events-none">
        
        {/* Item 1 */}
        <div ref={text1Ref} className="absolute top-1/2 -translate-y-1/2 left-6 md:left-12 max-w-md">
          <span className="font-mono text-[#10B981] text-xs tracking-widest mb-3 block uppercase">01 // Neural Processing</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Deep Learning Integration</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            We build intricate neural architectures that process telemetry at the edge, making real-time decisions without latency.
          </p>
        </div>

        {/* Item 2 */}
        <div ref={text2Ref} className="absolute top-1/2 -translate-y-1/2 right-6 md:right-12 max-w-md text-left md:text-right">
          <span className="font-mono text-[#06B6D4] text-xs tracking-widest mb-3 block uppercase">02 // Edge Computing</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Autonomous Intelligence</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Our embedded systems operate independently, executing localized AI models to handle critical tasks even offline.
          </p>
        </div>

        {/* Item 3 */}
        <div ref={text3Ref} className="absolute top-1/2 -translate-y-1/2 left-6 md:left-12 max-w-md">
          <span className="font-mono text-[#EC4899] text-xs tracking-widest mb-3 block uppercase">03 // Scalable Pipelines</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Global Synapse Network</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Connecting isolated data streams into a unified, secure web interface for ultimate system control.
          </p>
        </div>

      </div>

    </section>
  );
}
