'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);

  // Monitor scroll to apply background blur
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Overlay Open/Close animation
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';

      // Open transition: Circle clip-path expands
      gsap.fromTo(overlay, 
        { clipPath: 'circle(0% at calc(100% - 80px) 36px)' },
        { 
          clipPath: 'circle(150% at calc(100% - 80px) 36px)',
          duration: 0.65, 
          ease: 'power3.inOut' 
        }
      );

      // Stagger nav links slide up
      if (linksRef.current) {
        const items = linksRef.current.querySelectorAll('.overlay-nav-item');
        gsap.fromTo(items,
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.5, 
            stagger: 0.08, 
            ease: 'power3.out',
            delay: 0.3 
          }
        );
      }
    } else {
      document.body.style.overflow = '';

      // Close transition: Circle clip-path contracts
      gsap.to(overlay, {
        clipPath: 'circle(0% at calc(100% - 80px) 36px)',
        duration: 0.6,
        ease: 'power3.inOut'
      });
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Links hover effect: reduce opacity of non-hovered siblings
  const handleLinkMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!linksRef.current) return;
    const links = linksRef.current.querySelectorAll('.overlay-link');
    links.forEach((link) => {
      if (link !== e.currentTarget) {
        gsap.to(link, { opacity: 0.3, x: 0, duration: 0.25 });
      } else {
        gsap.to(link, { opacity: 1, x: 12, color: '#10B981', duration: 0.25 });
      }
    });
  };

  const handleLinkMouseLeave = () => {
    if (!linksRef.current) return;
    const links = linksRef.current.querySelectorAll('.overlay-link');
    links.forEach((link) => {
      gsap.to(link, { opacity: 1, x: 0, color: '#0F172A', duration: 0.25 });
    });
  };

  return (
    <>
      {/* HEADER NAVBAR */}
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 h-[72px] px-6 md:px-12 flex justify-between items-center z-[1000] transition-all duration-400 ${
          scrolled 
            ? 'bg-[#030408]/90 backdrop-blur-[20px] border-b border-white/10' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        {/* Left side: Logo + Pulsing dot */}
        <a href="#hero" className="flex items-center gap-2 font-bold text-white text-lg tracking-tight select-none">
          <span className="pulsing-dot" />
          <span className="font-display">Synapse Lab</span>
        </a>

        {/* Right side: CTAs & Menu trigger */}
        <div className="flex items-center gap-8 font-medium text-[13px]">
          <a 
            href="#contact" 
            className="hidden md:inline-block text-slate-300 hover:text-white transition-colors duration-200 relative group py-2"
          >
            let's talk
            <span className="absolute bottom-1.5 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-200" />
          </a>

          <button 
            onClick={toggleMenu}
            className="flex items-center gap-3 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer select-none group"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-[4px] justify-center items-end">
              <span className={`h-[1px] bg-white transition-all duration-200 ${isOpen ? 'w-[16px] translate-y-[5px] rotate-45' : 'w-[16px]'}`} />
              <span className={`h-[1px] bg-white transition-all duration-200 ${isOpen ? 'w-[16px] -translate-y-[0px] -rotate-45' : 'w-[10px] group-hover:w-[16px]'}`} />
            </div>
            <span className="font-body uppercase tracking-[0.1em] text-[11px] font-semibold">
              {isOpen ? 'Close' : 'Menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* OVERLAY NAVIGATION MENU */}
      <div 
        ref={overlayRef}
        className="menu-overlay fixed inset-0 bg-[#030408] z-[999] flex flex-col justify-between pt-[100px] pb-12 px-8 md:px-[10vw]"
        style={{ clipPath: 'circle(0% at calc(100% - 80px) 36px)' }}
      >
        {/* Navigation List - DNA Synapse Structure */}
        <div className="my-auto flex flex-col items-center justify-center w-full relative">
          {/* The Neural Spine */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#00E5FF] via-[#EC4899] to-transparent opacity-50 z-0"></div>
          
          <ul ref={linksRef} className="w-full max-w-4xl space-y-6 md:space-y-8 relative z-10">
            {[
              { label: 'Journey', href: '#journey' },
              { label: 'Work', href: '#projects' },
              { label: 'Stack', href: '#tech' },
              { label: 'Community', href: '#community' },
              { label: 'Contact', href: '#contact' }
            ].map((link, idx) => {
              const isLeft = idx % 2 === 0;
              return (
              <li key={idx} className={`overlay-nav-item overflow-hidden w-full flex flex-col md:flex-row relative items-start md:items-center ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
                
                {/* Mobile node dot */}
                <div className="md:hidden absolute left-[31px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]"></div>
                
                <a 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={handleLinkMouseEnter}
                  onMouseLeave={handleLinkMouseLeave}
                  className={`overlay-link inline-block font-display font-extrabold text-[36px] md:text-[64px] leading-[1.0] text-white tracking-tighter transition-transform select-none pl-16 md:pl-0 ${isLeft ? 'md:pr-[10%]' : 'md:pl-[10%]'}`}
                >
                  {link.label}
                </a>

                {/* Desktop DNA Synapse Connection */}
                <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-[15%] h-[2px] bg-white/20 ${isLeft ? 'right-[50%]' : 'left-[50%]'}`}>
                  <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.8)] ${isLeft ? 'right-0 bg-[#EC4899]' : 'left-0 bg-[#00E5FF]'}`}></div>
                </div>

              </li>
            )})}
          </ul>
        </div>

        {/* Overlay Bottom Contacts info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/10 pt-8 text-[13px] text-slate-400 font-body">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 block mb-1">EMAIL INQUIRIES</span>
            <a href="mailto:hello@synapselab.in" className="text-white hover:text-[#10B981] transition-colors">
              hello@synapselab.in
            </a>
          </div>
          <div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 block mb-1">HEADQUARTERS</span>
            <span className="text-white">Chennai, Tamil Nadu, India</span>
          </div>
        </div>
      </div>
    </>
  );
}
