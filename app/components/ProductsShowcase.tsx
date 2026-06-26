'use client';
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Code, Cpu, Database, Layout } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: 'TyrePro ERP',
    type: 'Enterprise System',
    desc: 'High-scale inventory and billing logic running across distributed nodes.',
    color: '#00E5FF',
    url: 'https://tyrepro-opal.vercel.app'
  },
  {
    id: 2,
    name: 'MakeMyTrip',
    type: 'Fullstack System',
    desc: 'Complex API integrations and flight telemetry dashboards.',
    color: '#EC4899',
    url: 'https://makemytrip-frontend-ten.vercel.app'
  },
  {
    id: 3,
    name: 'Synapse Lab',
    type: 'Agency Website',
    desc: 'Bare-metal logic, WebGL rendering, and automated mechanical systems.',
    color: '#F7DF1E',
    url: 'https://synapselab.in'
  }
];

export default function ProductsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollRef.current) return;
    
    const getScrollAmount = () => {
      const scrollWidth = scrollRef.current?.scrollWidth || 0;
      return -(scrollWidth - window.innerWidth + window.innerWidth * 0.1); 
    };

    const tl = gsap.to(scrollRef.current, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        end: () => `+=${getScrollAmount() * -1}`
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  return (
    <>
      <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-transparent flex items-center z-20 snap-center border-t border-b border-white/5">
        <div className="absolute top-12 left-12 md:top-24 md:left-24 z-10 pointer-events-none">
          <h2 className="font-display text-5xl md:text-8xl font-bold text-white mb-2 drop-shadow-2xl">Systems Matrix.</h2>
          <p className="text-slate-400 font-mono text-xs md:text-sm uppercase tracking-widest bg-black/50 backdrop-blur-md px-4 py-2 inline-block rounded-full border border-white/10">Scroll horizontally to traverse</p>
        </div>
        
        <div ref={scrollRef} className="flex h-[60vh] md:h-[70vh] items-center px-[5vw] gap-[5vw] pt-20">
          {products.map((prod, idx) => (
            <a 
              key={prod.id}
              href={prod.url}
              target="_blank"
              rel="noreferrer"
              className="w-[85vw] md:w-[45vw] h-full shrink-0 group cursor-pointer relative bg-[#050505]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden hover:border-white/30 transition-all duration-700 hover:shadow-[0_0_80px_rgba(255,255,255,0.05)] flex flex-col justify-end p-8 md:p-12"
            >
              <div className="absolute top-6 right-6 font-display text-8xl md:text-9xl text-white/5 group-hover:text-white/10 transition-colors duration-700 font-bold pointer-events-none select-none">
                0{idx + 1}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative z-10 group-hover:-translate-y-4 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                <span className="font-mono text-xs uppercase tracking-widest mb-4 block animate-pulse" style={{ color: prod.color }}>{prod.type}</span>
                <h3 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-none">{prod.name}</h3>
                <p className="text-slate-400 max-w-sm">{prod.desc}</p>
                <div className="mt-8 inline-flex items-center gap-3 text-white/50 text-sm font-mono group-hover:text-white transition-colors bg-white/5 px-6 py-3 rounded-full border border-white/10 group-hover:border-white/30">
                  <Code size={16} /> LAUNCH SECURE CONNECTION
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
