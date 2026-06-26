'use client';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, ChevronRight, Zap, Shield, Cpu, Code, Server, Smartphone, Globe, Lock, Workflow } from 'lucide-react';

import { products } from '../data/products';
import { useRouter } from 'next/navigation';

export default function FampayStore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    // Fampay-style stacked card stagger animation
    gsap.fromTo(cardsRef.current, 
      { y: 150, opacity: 0, rotationX: 45, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        }
      }
    );

  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-[#030408] border-t border-white/5 z-20 flex flex-col items-center overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #00E5FF 0%, transparent 50%)' }}></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="text-center mb-24 relative z-20 px-4">
        <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">The Commerce Matrix.</h2>
        <p className="text-slate-400 font-mono uppercase tracking-widest text-sm">Secure transactions. Premium assets.</p>
      </div>

      {/* Fampay Gamified Interactive Layout */}
      <div className="w-[90%] max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 perspective-[2000px]">
        {products.map((product, idx) => (
          <div 
            key={product.id}
            ref={el => { cardsRef.current[idx] = el }}
            onClick={() => router.push(`/checkout?id=${product.id}`)}
            className="group relative bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 hover:border-white/30 transition-all duration-700 hover:-translate-y-6 flex flex-col cursor-pointer overflow-hidden transform-gpu hover:scale-[1.02]"
            style={{ 
              boxShadow: `0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)`,
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              e.currentTarget.style.setProperty('--x', `${x}px`);
              e.currentTarget.style.setProperty('--y', `${y}px`);
            }}
          >
            {/* Dynamic Spotlight Effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(800px circle at var(--x, 50%) var(--y, 50%), ${product.glow}, transparent 40%)`
              }}
            ></div>

            {/* Hardware-style top edge */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-12">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                  style={{ backgroundColor: `${product.color}10` }}
                >
                  <product.icon size={28} color={product.color} />
                </div>
                <div className="font-mono text-[10px] tracking-widest text-slate-500 bg-black/50 px-3 py-1 rounded-full border border-white/5">
                  {product.id}
                </div>
              </div>
              
              <h3 className="font-display text-3xl font-bold text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-500">
                {product.name}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                {product.desc}
              </p>
              
              <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-6">
                <div className="font-display text-4xl font-bold text-white tracking-tighter">
                  {product.price}
                </div>
                
                <button 
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-xl"
                  style={{ backgroundColor: product.color }}
                >
                  <ChevronRight size={24} color="#000" strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]"></div>
          </div>
        ))}
      </div>
      
      {/* Bottom Swipe Action Indicator */}
      <div className="mt-20 flex items-center gap-4 opacity-50 font-mono text-xs uppercase tracking-widest">
        <ShoppingBag size={16} /> Secure E-Commerce Integrated
      </div>
    </section>
  );
}
