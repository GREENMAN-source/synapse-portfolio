'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Play, Heart, MessageCircle, Share2, Video, Camera, Terminal, Code, Shield, Database, Cpu, Activity, Copy, CheckCircle2, QrCode } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Brain3D from './Brain3D';
import FlashCard from './FlashCard';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SynapseHomeProps {
  isLoaded: boolean;
}

export default function SynapseHome({ isLoaded }: SynapseHomeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const [copied, setCopied] = useState(false);
  const [updates, setUpdates] = useState<any[]>([]);
  const [shorts, setShorts] = useState<any[]>([]);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch('/api/public/content');
        const data = await res.json();
        if (data.success) {
          setUpdates(data.updates);
          setShorts(data.shorts);
        }
      } catch (err) {
        console.error("Failed to fetch dynamic content", err);
      } finally {
        setContentLoaded(true);
      }
    };
    fetchContent();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("synapselab@ybl");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    // Advanced Aesthetic Entry States
    gsap.set([skillsRef.current, timelineRef.current, projectsRef.current, socialRef.current], { 
      opacity: 0, 
      y: 150, 
      scale: 0.85,
      filter: 'blur(20px)',
      rotateX: 15,
      transformPerspective: 1000,
      autoAlpha: 0 
    });
    
    gsap.set(heroRef.current, { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: 'blur(0px)',
      rotateX: 0,
      transformPerspective: 1000,
      autoAlpha: 1 
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    });

    // 5 Sections, 4 Transitions with cinematic easing (5 times scroll narrative)
    tl.to(heroRef.current, { opacity: 0, y: -150, scale: 1.1, filter: 'blur(20px)', rotateX: -15, autoAlpha: 0, duration: 1, ease: 'power2.inOut' })
      .to(skillsRef.current, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', rotateX: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' }, "<0.5")
      .to({}, { duration: 0.8 })
      
      .to(skillsRef.current, { opacity: 0, y: -150, scale: 1.1, filter: 'blur(20px)', rotateX: -15, autoAlpha: 0, duration: 1, ease: 'power2.inOut' })
      .to(timelineRef.current, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', rotateX: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' }, "<0.5")
      .to({}, { duration: 0.8 })

      .to(timelineRef.current, { opacity: 0, y: -150, scale: 1.1, filter: 'blur(20px)', rotateX: -15, autoAlpha: 0, duration: 1, ease: 'power2.inOut' })
      .to(projectsRef.current, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', rotateX: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' }, "<0.5")
      .to({}, { duration: 0.8 })

      .to(projectsRef.current, { opacity: 0, y: -150, scale: 1.1, filter: 'blur(20px)', rotateX: -15, autoAlpha: 0, duration: 1, ease: 'power2.inOut' })
      .to(socialRef.current, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', rotateX: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' }, "<0.5")
      .to({}, { duration: 0.8 });

    document.documentElement.style.scrollSnapType = 'y proximity';

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      document.documentElement.style.scrollSnapType = 'none';
    };
  }, [isLoaded]);

  return (
    <div className="bg-[#030408]">
      <div ref={containerRef} className="relative w-full h-[500vh] snap-start">
        <Brain3D />
        <div className="fixed inset-0 w-full h-screen pointer-events-none z-10 flex items-center max-w-[1600px] mx-auto overflow-hidden">
          
          {/* HERO WIDGET */}
          <FlashCard 
            ref={heroRef}
            align="left"
            number="000"
            category="SYSTEM INITIALIZED"
            title="We Navigate The Terrain Of Code."
            content={
              <>
                <p>A real-world engineering studio building Robotics, AI automation, IoT systems, and custom hardware logic.</p>
                <div className="flex gap-4 mt-8 pointer-events-auto">
                  <span className="text-[#00E5FF] border border-[#00E5FF]/20 px-4 py-2 rounded uppercase text-xs tracking-widest animate-pulse font-bold">
                    Scroll to Traverse ↓
                  </span>
                </div>
              </>
            }
          />

          {/* SKILLS WIDGET */}
          <FlashCard 
            ref={skillsRef}
            align="right"
            number="001"
            category="CAPABILITIES"
            title="Skills & Arsenal."
            content={
              <>
                <p className="mb-4">From high-level logic to bare-metal hardware repairing.</p>
                <div className="mt-4 space-y-4 pointer-events-auto">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:border-[#00E5FF]/50 transition-all hover:bg-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Code className="text-[#00E5FF]" size={20} />
                      <h4 className="text-white font-bold text-lg">Coding & Architecture</h4>
                    </div>
                    <p className="text-sm text-slate-400">Fullstack Web Apps, Next.js, APIs, and scalable backend logic.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:border-[#EC4899]/50 transition-all hover:bg-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Cpu className="text-[#EC4899]" size={20} />
                      <h4 className="text-white font-bold text-lg">Robotics & IoT</h4>
                    </div>
                    <p className="text-sm text-slate-400">Arduino, ESP32, Sensor telemetry, and automated mechanical systems.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:border-[#F7DF1E]/50 transition-all hover:bg-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Terminal className="text-[#F7DF1E]" size={20} />
                      <h4 className="text-white font-bold text-lg">Hardware Repairing</h4>
                    </div>
                    <p className="text-sm text-slate-400">Circuit debugging, micro-soldering, and physical hardware logic tracing.</p>
                  </div>
                </div>
              </>
            }
          />

          {/* TIMELINE WIDGET */}
          <FlashCard 
            ref={timelineRef}
            align="left"
            number="002"
            category="JOURNEY"
            title="The Timeline."
            content={
              <div className="mt-6 flex flex-col gap-6 relative before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#00E5FF] before:to-[#EC4899]">
                {!contentLoaded ? (
                  <div className="text-slate-500 animate-pulse pl-8">Syncing timeline from core server...</div>
                ) : updates.length === 0 ? (
                  <div className="text-slate-500 pl-8">No journey records found in database.</div>
                ) : (
                  updates.map((update, idx) => (
                    <div key={update._id || idx} className="relative pl-8 group">
                      <div 
                        className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#030408] border-2 flex items-center justify-center group-hover:scale-125 transition-transform"
                        style={{ borderColor: update.color || '#00E5FF', boxShadow: `0 0 10px ${update.color || '#00E5FF'}80` }}
                      >
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                      <div className="font-mono font-bold tracking-widest text-sm mb-1" style={{ color: update.color || '#00E5FF' }}>{update.year}</div>
                      <h4 className="text-white font-bold text-lg mb-1">{update.title}</h4>
                      <p className="text-slate-400 text-sm">{update.description}</p>
                    </div>
                  ))
                )}
              </div>
            }
          />

          {/* PROJECTS WIDGET */}
          <FlashCard 
            ref={projectsRef}
            align="right"
            number="003"
            category="SAMPLES"
            title="Active Deployments."
            content={
              <>
                <p className="mb-4">Real production applications pushing the boundaries of scale.</p>
                <div className="mt-4 space-y-4 pointer-events-auto">
                  <a href="https://tyrepro-opal.vercel.app" target="_blank" rel="noreferrer" className="group cursor-pointer block bg-white/5 border border-white/10 p-4 rounded-xl hover:border-[#00E5FF]/50 hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,229,255,0.15)] transition-all">
                    <div className="flex items-center justify-between pb-2">
                      <div className="text-left">
                        <span className="text-[9px] text-[#00E5FF] font-mono uppercase tracking-widest">Enterprise System</span>
                        <h4 className="text-white font-bold text-lg group-hover:text-[#00E5FF] transition-colors">TyrePro ERP Suite</h4>
                      </div>
                      <ArrowUpRight className="text-[#00E5FF] opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                    </div>
                  </a>
                  <a href="https://makemytrip-frontend-ten.vercel.app" target="_blank" rel="noreferrer" className="group cursor-pointer block bg-white/5 border border-white/10 p-4 rounded-xl hover:border-[#00E5FF]/50 hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,229,255,0.15)] transition-all">
                    <div className="flex items-center justify-between pb-2">
                      <div className="text-left">
                        <span className="text-[9px] text-[#00E5FF] font-mono uppercase tracking-widest">Fullstack System</span>
                        <h4 className="text-white font-bold text-lg group-hover:text-[#00E5FF] transition-colors">MakeMyTrip</h4>
                      </div>
                      <ArrowUpRight className="text-[#00E5FF] opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                    </div>
                  </a>
                  <a href="https://synapselab.in" target="_blank" rel="noreferrer" className="group cursor-pointer block bg-white/5 border border-white/10 p-4 rounded-xl hover:border-[#00E5FF]/50 hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,229,255,0.15)] transition-all">
                    <div className="flex items-center justify-between pb-2">
                      <div className="text-left">
                        <span className="text-[9px] text-[#00E5FF] font-mono uppercase tracking-widest">Agency Website</span>
                        <h4 className="text-white font-bold text-lg group-hover:text-[#00E5FF] transition-colors">Synapse Lab</h4>
                      </div>
                      <ArrowUpRight className="text-[#00E5FF] opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                    </div>
                  </a>
                </div>
              </>
            }
          />

          {/* SOCIAL INTRO WIDGET */}
          <FlashCard 
            ref={socialRef}
            align="left"
            number="004"
            category="TRANSMISSION"
            title="Access the Network."
            content={
              <>
                <p className="mb-4">Dive into the active frequency of Synapse Lab.</p>
                <p className="text-2xl font-bold text-[#00E5FF] animate-pulse">
                  Keep Scrolling ↓
                </p>
              </>
            }
          />
        </div>
      </div>

      <div className="relative w-full z-20 bg-black">
        {shorts.map((short, idx) => (
          <section key={short._id || idx} className="h-screen w-full snap-center flex items-center justify-center border-b border-white/5 relative overflow-hidden bg-[#0a0a0a]">
            <div className="relative z-20 w-[90%] max-w-[400px] h-[80%] max-h-[800px] rounded-2xl border border-white/10 bg-black/80 overflow-hidden shadow-2xl pointer-events-auto flex items-center justify-center">
              <iframe 
                src={short.embedUrl}
                title={`${short.platform} Embed`}
                frameBorder="0" 
                scrolling={short.platform === 'Instagram' ? "no" : "auto"}
                allowTransparency={true}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen={short.platform === 'YouTube'}
                className="absolute inset-0 w-full h-full object-cover"
              ></iframe>
              <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start pointer-events-none bg-gradient-to-b from-black/80 to-transparent">
                <div className={`flex items-center gap-2 ${short.platform === 'YouTube' ? 'bg-red-600/90' : 'bg-pink-600/90'} text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg`}>
                  {short.platform === 'YouTube' ? <Video size={14} /> : <Camera size={14} />} {short.platform}
                </div>
                <span className="bg-black/60 backdrop-blur px-3 py-1.5 rounded-full text-white/90 font-mono text-xs shadow-lg">{short.handle}</span>
              </div>
            </div>
          </section>
        ))}

        <section className="min-h-screen w-full snap-center flex flex-col items-center justify-center relative overflow-hidden py-24 bg-[#030408]">
          <div className="text-center mb-16 relative z-20">
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-4">The Network.</h2>
            <p className="text-slate-400 font-mono uppercase tracking-widest text-sm">Join the open source grid.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20 w-[90%] max-w-4xl pointer-events-auto">
            <a href="https://x.com/5kDhanvant8844" target="_blank" rel="noreferrer" className="flex flex-col bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/50 p-8 rounded-3xl transition-all group hover:-translate-y-2">
              <svg className="text-slate-400 group-hover:text-white mb-6 transition-colors" width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              <h3 className="text-2xl font-bold text-white mb-2">X (Twitter)</h3>
              <p className="text-slate-400 text-sm">Daily logs, hardware failures, and real-time deployment status.</p>
              <div className="mt-8 text-white font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                @5kDhanvant8844 <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </a>
            <a href="https://www.instagram.com/dhanvanth_l.p" target="_blank" rel="noreferrer" className="flex flex-col bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#E1306C]/50 p-8 rounded-3xl transition-all group hover:-translate-y-2">
              <svg className="text-slate-400 group-hover:text-[#E1306C] mb-6 transition-colors" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              <h3 className="text-2xl font-bold text-white mb-2">Instagram</h3>
              <p className="text-slate-400 text-sm">Behind the scenes clips and hardware lab aesthetic.</p>
              <div className="mt-8 text-[#E1306C] font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                @dhanvanth_l.p <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </a>
            <a href="https://github.com/GREENMAN-source" target="_blank" rel="noreferrer" className="flex flex-col bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00E5FF]/50 p-8 rounded-3xl transition-all group hover:-translate-y-2">
              <svg className="text-slate-400 group-hover:text-[#00E5FF] mb-6 transition-colors" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              <h3 className="text-2xl font-bold text-white mb-2">GitHub</h3>
              <p className="text-slate-400 text-sm">Access the source code for our open hardware logic and firmware modules.</p>
              <div className="mt-8 text-[#00E5FF] font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                @GREENMAN-source <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </a>
            <a href="https://dev.to/dhanvanth_l_p_" target="_blank" rel="noreferrer" className="flex flex-col bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/50 p-8 rounded-3xl transition-all group hover:-translate-y-2">
              <svg className="text-slate-400 group-hover:text-white mb-6 transition-colors" width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-1.52.01v1.76h2.84v1.43H9.23V8.53h4.42v1.3zm8.32.91c-.05.47-.2.9-.47 1.35-.45.74-1.2 1.13-2.1 1.13-1.04 0-1.74-.35-2.13-1.05-.28-.5-.3-1-.3-2.6 0-1.46.02-1.96.14-2.31.22-.64.7-1.12 1.34-1.34.42-.14 1.36-.14 1.76 0 .53.18 1.05.61 1.33 1.08.31.54.34.82.35 2.74v1zm-2.02-1.85c-.05-.44-.22-.72-.51-.83-.2-.08-.55-.07-.72.01-.27.14-.4.4-.43 1.01-.03.56-.03 2.06 0 2.61.05.7.35 1.01.81 1.01.55 0 .86-.4.86-1.57.01-.65-.01-2.1-.01-2.24z"/></svg>
              <h3 className="text-2xl font-bold text-white mb-2">DEV Community</h3>
              <p className="text-slate-400 text-sm">In-depth technical writeups on web apps and offensive security.</p>
              <div className="mt-8 text-white font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                @dhanvanth_l_p_ <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
