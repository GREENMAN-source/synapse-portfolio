'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, Code, Cpu, Activity, Terminal, BookOpen, Layers, Award,
  Mail, MapPin, Globe, X, ArrowUpRight
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NeuralGlobe from './NeuralGlobe';
import Marquee from './Marquee';
import BrainScrollSection from './BrainScrollSection';
import ProjectCard from './ProjectCard';

// Register GSAP Plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  desc: string;
  problem: string;
  process: string;
  tech: string[];
  outcome: string;
  number: string;
}

interface SynapseHomeProps {
  isLoaded: boolean;
}

export default function SynapseHome({ isLoaded }: SynapseHomeProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'transmitting' | 'success' | 'error'>('idle');
  const mainRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);

  const projects: Project[] = [
    {
      id: 'p1',
      title: 'LifeFlow IV Drip Monitor',
      category: 'IoT · Healthcare',
      number: '001',
      subtitle: 'IoT Medical Fluid Tracker',
      desc: 'An automated load-cell clamp setup calibrated to monitor IV fluid bags and alert nursing staff via WebSockets before depletion.',
      problem: 'Hospital wards face constant nursing shortages, causing delayed responses to empty IV lines, risking patient backflow.',
      process: 'Wrote ESP32 firmwares, connected load cells to HX711 ADCs, calibrated fluid weights, and set up real-time telemetry over WebSockets.',
      tech: ['ESP32', 'C++', 'Arduino', 'WebSockets', 'Node.js', 'React'],
      outcome: 'Assembled a physical prototype that sounds a nurse hub alarm 5 minutes before the bag reaches 5% fluid levels.'
    },
    {
      id: 'p2',
      title: 'TyrePro ERP Suite',
      category: 'Web · Enterprise',
      number: '002',
      subtitle: 'Enterprise Retail Management Portal',
      desc: 'A full-stack shop administration platform with real-time inventory levels, GST-compliant invoicing, and automated booking queues.',
      problem: 'Small and medium tyre retail setups struggled with slow checkouts, stock discrepancy, and complex tax compliance structures.',
      process: 'Architected a normalized PostgreSQL schema via Prisma. Built the frontend with Next.js using dynamic layouts for billing grids, and set up a custom PDF billing microservice.',
      tech: ['Next.js', 'Express', 'Prisma', 'PostgreSQL', 'TypeScript', 'TailwindCSS'],
      outcome: 'Deployed in production, shortening billing workflows from 8 minutes down to 90 seconds and reducing manual inventory entry error rates.'
    },
    {
      id: 'p3',
      title: 'Project Titan Platform',
      category: 'AI · Ideathon',
      number: '003',
      subtitle: 'High-Scalability Hackathon Concept',
      desc: 'An enterprise concept application demonstrating highly distributed service layers and local agent logic built for national hackathons.',
      problem: 'Hackathon designs often focus purely on slides; we needed a robust, working system design with simulated high concurrency.',
      process: 'Coded real-time mock telemetry dashboards using React and Express, demonstrating sub-second load configurations.',
      tech: ['Next.js', 'Express', 'Node.js', 'Framer Motion', 'TailwindCSS'],
      outcome: 'Presented at national level ideathon, earning praise for technical depth and production-ready system architecture.'
    },
    {
      id: 'p4',
      title: 'School Voting System',
      category: 'Web · Civic Tech',
      number: '004',
      subtitle: 'Custom Digital Election System',
      desc: 'A secure custom digital voting system engineered and deployed to run school elections with zero errors and real-time tallies.',
      problem: 'Paper ballots are slow to tally, prone to human validation errors, and offer poor voter transparency.',
      process: 'Engineered a clean React fronted with encrypted session logs and a local SQLite server configuration. Ensured complete audit trails.',
      tech: ['React', 'Node.js', 'SQLite', 'TailwindCSS', 'TypeScript'],
      outcome: 'Successfully logged 800+ student votes in under 6 hours with instant tally results and zero network failures.'
    },
    {
      id: 'p5',
      title: 'Smart Face ID Lock',
      category: 'IoT · Hardware',
      number: '005',
      subtitle: 'Edge AI Biometric Solenoid Trigger',
      desc: 'A biometric facial recognition lock using OpenCV Haar Cascades on Raspberry Pi to trigger high-current physical door solenoids.',
      problem: 'Physical locks and access keys are easily lost; local edge recognition is required for internet-free operations.',
      process: 'Configured local OpenCV scripts in Python, bypass cloud APIs to avoid latency, and wired GPIO pins to a relay/solenoid circuit.',
      tech: ['Python', 'OpenCV', 'Raspberry Pi', 'GPIO', 'Linux'],
      outcome: 'Engineered a secure lock assembly triggering keyless entry in 0.8 seconds, logging unrecognized visitors automatically.'
    },
    {
      id: 'p6',
      title: 'Edge Intrusion Shield',
      category: 'Cyber · Security',
      number: '006',
      subtitle: 'Localized Network Intrusion Shield',
      desc: 'Network parsing scripts configured on router gateways to identify anomalies and block spoofed MAC addresses.',
      problem: 'Connected IoT hardware systems are targets for network spoofing and middleman traffic analysis.',
      process: 'Developed packet sniffers analyzing MAC/IP frame structures. Built automated rulesets to terminate connections when anomaly thresholds are breached.',
      tech: ['Python', 'Wireshark APIs', 'Scapy', 'Bash Scripts', 'Linux Firewall'],
      outcome: 'Created a defensive gateway shield identifying and blacklisting spoofed IP MAC frames in under 15ms.'
    }
  ];

  const techStack = [
    { name: 'Arduino', type: 'Microcontroller', icon: <Cpu size={24} /> },
    { name: 'ESP32', type: 'IoT Telemetry Core', icon: <Cpu size={24} /> },
    { name: 'Raspberry Pi', type: 'Edge Processing', icon: <Terminal size={24} /> },
    { name: 'Teensy 4.1', type: 'High-Speed Logic', icon: <Cpu size={24} /> },
    { name: 'Load Cells', type: 'Analog Sensors', icon: <Activity size={24} /> },
    { name: 'Servo Motors', type: 'Actuators', icon: <Cpu size={24} /> },
    { name: 'RF Modules', type: 'Wireless Telemetry', icon: <Layers size={24} /> },
    { name: 'Cloudflare', type: 'Security Edge', icon: <Shield size={24} /> }
  ];

  // Start entrance animations once the loading screen disappears
  useEffect(() => {
    if (!isLoaded) return;

    // Split text reveal on hero title lines
    const titleLines = heroTitleRef.current?.querySelectorAll('.line-reveal-inner');
    if (titleLines && titleLines.length > 0) {
      gsap.to(titleLines, {
        yPercent: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
      });
    }

    // Slide up subtext and CTAs
    gsap.fromTo('.hero-fade-up', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.8, stagger: 0.15 }
    );

    // Initialise ScrollTrigger reveals
    gsap.utils.toArray('.reveal').forEach((el: any) => {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.85, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Pinned scroll background shift (shift void to surface)
    ScrollTrigger.create({
      trigger: '#tech',
      start: 'top center',
      end: 'bottom center',
      onEnter: () => gsap.to('body', { backgroundColor: '#FFFFFF', duration: 0.5 }),
      onLeave: () => gsap.to('body', { backgroundColor: '#F8F9FA', duration: 0.5 }),
      onEnterBack: () => gsap.to('body', { backgroundColor: '#FFFFFF', duration: 0.5 }),
      onLeaveBack: () => gsap.to('body', { backgroundColor: '#F8F9FA', duration: 0.5 }),
    });

    // Stats Counters Animation using IntersectionObserver
    const counters = document.querySelectorAll('.stat-number-anim');
    const animateCounter = (el: HTMLElement) => {
      const target = parseInt(el.getAttribute('data-target') || '0');
      const suffix = el.getAttribute('data-suffix') || '';
      const digits = parseInt(el.getAttribute('data-digits') || '3');

      let current = 0;
      const duration = 1800; // ms
      const startTime = performance.now();

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        current = Math.floor(progress * target);

        const padded = String(current).padStart(digits, '0');
        el.textContent = padded + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };
      requestAnimationFrame(update);
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animateCounter(e.target as HTMLElement);
          counterObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach((el) => counterObserver.observe(el));

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      counterObserver.disconnect();
    };
  }, [isLoaded]);

  // Form Submission via Web3Forms API using Fetch (keeps user on site with smooth alerts)
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('transmitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      setFormStatus('error');
    }
  };

  return (
    <div ref={mainRef} className="relative w-full z-10 select-none bg-transparent">
      {/* ==================== HERO SECTION ==================== */}
      <section id="hero" className="min-h-screen w-full flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 relative overflow-hidden bg-[#F8F9FA] grid-bg">
        {/* WebGL Mountain Terrain Background */}
        <NeuralGlobe />

        <div className="max-w-[1400px] w-full mx-auto flex-1 flex flex-col justify-center items-start relative z-10">
          {/* Eyebrow label */}
          <div className="flex items-center gap-3 mb-6 hero-fade-up opacity-0">
            <span className="h-[1px] w-12 bg-[#10B981] inline-block" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#10B981]">
              EST. 2024 · Chennai, India
            </span>
          </div>

          {/* Headline Reveal */}
          <h1 ref={heroTitleRef} className="font-display font-extrabold text-[52px] md:text-[96px] leading-[0.92] tracking-tighter text-slate-900 mb-8">
            <span className="line-reveal">
              <span className="line-reveal-inner">We Navigate</span>
            </span>
            <span className="line-reveal">
              <span className="line-reveal-inner gradient-brand-text">The Terrain</span>
            </span>
            <span className="line-reveal">
              <span className="line-reveal-inner">Of Code.</span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="font-body text-[16px] md:text-[18px] leading-relaxed text-slate-600 max-w-lg mb-10 hero-fade-up opacity-0">
            A real-world engineering studio building Robotics, AI automation, IoT systems,
            and custom hardware logic. Scaling tech mountains to deliver results.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 hero-fade-up opacity-0">
            <a href="#projects" className="btn-primary btn-magnetic">
              Explore Projects
            </a>
            <a href="#community" className="btn-ghost">
              Join Community <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="max-w-[1400px] w-full mx-auto flex justify-between items-center relative z-10 text-slate-400 font-mono text-[10px] tracking-widest mt-auto">
          <div className="flex items-center gap-3">
            <div className="h-[40px] w-[1px] bg-slate-200 relative overflow-hidden">
              <span className="absolute top-0 left-0 w-full h-1/2 bg-[#10B981] animate-[marqueeScroll_2s_linear_infinite]" />
            </div>
            <span>SCROLL DOWN</span>
          </div>
          <span>Ascending through real-world tech.</span>
        </div>
      </section>

      {/* ==================== INFINITE MARQUEE ==================== */}
      <Marquee />

      {/* ==================== 3D BRAIN SCROLL EFFECT ==================== */}
      <BrainScrollSection />

      {/* ==================== ABOUT & MISSION ==================== */}
      <section id="journey" className="py-[128px] px-6 md:px-12 bg-[#F8F9FA]">
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-[80px]">
          
          {/* Left Column: Story */}
          <div className="flex flex-col justify-between reveal">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[1px] w-8 bg-[#10B981]" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#10B981]">
                  Our Ascent
                </span>
              </div>
              
              <h2 className="font-display font-bold text-[36px] md:text-[52px] leading-[1.0] tracking-tighter text-slate-900 mb-8">
                We scale mountains<br />of technology to build solutions.
              </h2>
              
              <p className="font-body text-[16px] leading-relaxed text-slate-600 mb-6">
                Synapse Lab is an independent R&D studio and innovation hub. We build physical robotics networks, telemetry monitoring sensors, and Edge AI modules, then deploy them directly in real-world pipelines.
              </p>
              
              <p className="font-body text-[16px] leading-relaxed text-slate-600 mb-10">
                From hackathon labs to production deployments — we build fast, ship sharp, and secure deep. We cross-reference software and hardware logic to solve problems at the root.
              </p>

              <div className="border-t border-slate-200 pt-6 font-mono text-[12px] text-slate-400">
                Founded by <span className="text-slate-900">Dhanvanth L.P.</span> · Chennai, Tamil Nadu
              </div>
            </div>
          </div>

          {/* Right Column: Bento Fact Strips */}
          <div className="space-y-6 flex flex-col justify-center reveal">
            {/* Top Mission Card */}
            <div className="bg-[#FFFFFF] border border-slate-200/50 rounded-[20px] p-8 relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
              <span className="font-mono text-[10px] uppercase text-[#10B981] tracking-wider block mb-4">STUDIO ETHOS</span>
              <p className="font-display font-medium text-[22px] md:text-[28px] text-slate-900 leading-snug">
                Focused vision. / Measured execution. / Real impact.
              </p>
            </div>

            {/* Facts tags strips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#FFFFFF] border border-slate-200/50 rounded-[12px] p-5 font-mono text-xs text-slate-700 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
                <span className="text-[#10B981] mr-2">●</span> R&D Unit · Portfolio · Community
              </div>
              <div className="bg-[#FFFFFF] border border-slate-200/50 rounded-[12px] p-5 font-mono text-xs text-slate-700 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
                <span className="text-sky-600 mr-2">●</span> Robotics · AI · IoT · Hacking
              </div>
            </div>

            {/* Interactive Timeline node */}
            <div className="bg-[#FFFFFF] border border-slate-200/50 rounded-[20px] p-8 space-y-4 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
              <span className="font-mono text-[10px] uppercase text-slate-400 tracking-wider block">TIMELINE ASCENT</span>
              <div className="flex gap-4 items-start">
                <span className="text-xs font-mono bg-sky-500/10 text-sky-600 border border-sky-500/20 px-2 py-0.5 rounded">2022</span>
                <p className="text-[13px] text-slate-600 font-light">Hardware Awakening (Arduino, circuit prototyping)</p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-xs font-mono bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 px-2 py-0.5 rounded">2023</span>
                <p className="text-[13px] text-slate-600 font-light">Software Paradigms (Python automation, algorithms)</p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-xs font-mono bg-orange-500/10 text-orange-600 border border-orange-500/20 px-2 py-0.5 rounded">2025</span>
                <p className="text-[13px] text-slate-600 font-light">Web Architectures (Next.js portals, relational DBs)</p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-xs font-mono bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 px-2 py-0.5 rounded">2026</span>
                <p className="text-[13px] text-slate-600 font-light">Offensive Security & Studio Founding</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== FACTS & COUNTER STATS ==================== */}
      <section className="py-[96px] px-6 md:px-12 bg-[#FFFFFF] border-y border-slate-200">
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 reveal">
          
          {/* Stat Item 1 */}
          <div className="flex flex-col justify-start">
            <span 
              className="stat-number-anim font-display font-extrabold text-[56px] md:text-[96px] leading-none tracking-tighter text-slate-900 mb-2"
              data-counter
              data-target="6"
              data-digits="3"
              data-suffix="+"
            >
              000+
            </span>
            <span className="font-body text-xs md:text-sm uppercase tracking-wider text-slate-400">
              Major Projects
            </span>
          </div>

          {/* Stat Item 2 */}
          <div className="flex flex-col justify-start">
            <span 
              className="stat-number-anim font-display font-extrabold text-[56px] md:text-[96px] leading-none tracking-tighter text-slate-900 mb-2"
              data-counter
              data-target="3"
              data-digits="3"
              data-suffix="×"
            >
              000×
            </span>
            <span className="font-body text-xs md:text-sm uppercase tracking-wider text-slate-400">
              Hackathon Entries
            </span>
          </div>

          {/* Stat Item 3 */}
          <div className="flex flex-col justify-start">
            <span 
              className="stat-number-anim font-display font-extrabold text-[56px] md:text-[96px] leading-none tracking-tighter text-slate-900 mb-2"
              data-counter
              data-target="12"
              data-digits="3"
              data-suffix="+"
            >
              000+
            </span>
            <span className="font-body text-xs md:text-sm uppercase tracking-wider text-slate-400">
              Hardware Systems
            </span>
          </div>

          {/* Stat Item 4 */}
          <div className="flex flex-col justify-start">
            <span 
              className="stat-number-anim font-display font-extrabold text-[56px] md:text-[96px] leading-none tracking-tighter text-slate-900 mb-2"
              data-counter
              data-target="100"
              data-digits="3"
              data-suffix="%"
            >
              000%
            </span>
            <span className="font-body text-xs md:text-sm uppercase tracking-wider text-slate-400">
              Built from Scratch
            </span>
          </div>

        </div>
      </section>

      {/* ==================== PROJECTS / FEATURED WORK ==================== */}
      <section id="projects" className="py-[128px] px-6 md:px-12 bg-[#F8F9FA]">
        <div className="max-w-[1400px] w-full mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 reveal">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[1px] w-8 bg-[#10B981]" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#10B981]">
                  Featured Work
                </span>
              </div>
              <h2 className="font-display font-bold text-[36px] md:text-[64px] leading-none tracking-tighter text-slate-900">
                Projects that push limits
              </h2>
            </div>
            
            <div className="font-mono text-[13px] text-slate-400 mt-4 md:mt-0 uppercase tracking-widest">
              ( 006 ) Projects Listed
            </div>
          </div>

          {/* Staggered Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 reveal">
            {projects.map((proj) => (
              <ProjectCard 
                key={proj.id}
                title={proj.title}
                subtitle={proj.subtitle}
                category={proj.category}
                number={proj.number}
                desc={proj.desc}
                tech={proj.tech}
                onClick={() => setSelectedProject(proj)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ==================== TECH STACK ==================== */}
      <section id="tech" className="py-[128px] px-6 md:px-12 bg-[#FFFFFF] border-y border-slate-200">
        <div className="max-w-[1400px] w-full mx-auto">
          
          <div className="mb-16 reveal">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-8 bg-[#10B981]" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#10B981]">
                Our Arsenal
              </span>
            </div>
            <h2 className="font-display font-bold text-[36px] md:text-[64px] leading-none tracking-tighter text-slate-900">
              Hardware & Software Stack
            </h2>
          </div>

          {/* Staggered Tech Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 reveal">
            {techStack.map((tech, idx) => (
              <div 
                key={idx}
                className="bg-[#F8F9FA] border border-slate-200/50 hover:border-[#10B981]/20 rounded-[20px] p-8 text-center flex flex-col justify-center items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(16,185,129,0.04)] group"
              >
                <div className="text-[#10B981]/80 group-hover:scale-110 group-hover:text-[#10B981] transition-all duration-300">
                  {tech.icon}
                </div>
                <div>
                  <h4 className="font-display font-semibold text-[16px] text-slate-900">
                    {tech.name}
                  </h4>
                  <p className="font-mono text-[10px] text-slate-450 mt-1 uppercase tracking-wider">
                    {tech.type}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bento Sub-telemetry details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 reveal font-mono">
            
            {/* Active Telemetries */}
            <div className="bg-[#FFFFFF] border border-slate-200/55 rounded-[20px] p-6 min-h-[200px] flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
              <div>
                <h3 className="text-slate-950 text-xs font-bold uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Terminal size={14} className="text-[#10B981]" /> Active Telemetries
                </h3>
                <ul className="space-y-3 text-[11px] text-slate-500">
                  <li className="flex justify-between">
                    <span>ESP32 Core Drone System</span>
                    <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-500/10">TEST FLIGHT</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Quant-Safe VPN Tunnel</span>
                    <span className="text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-500/10">CALIBRATING</span>
                  </li>
                </ul>
              </div>
              <span className="text-[9px] text-[#10B981]/60 uppercase tracking-widest">STATE: STABLE</span>
            </div>

            {/* Research Tracks */}
            <div className="bg-[#FFFFFF] border border-slate-200/55 rounded-[20px] p-6 min-h-[200px] flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
              <div>
                <h3 className="text-slate-950 text-xs font-bold uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <BookOpen size={14} className="text-[#10B981]" /> Research Tracks
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-slate-500">OFFENSIVE SEC / OSCP</span>
                      <span className="text-[#10B981] font-bold">68%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div className="bg-[#10B981] h-full" style={{ width: '68%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-slate-500">RUST EMBEDDED</span>
                      <span className="text-[#10B981] font-bold">85%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div className="bg-[#10B981] h-full" style={{ width: '85%' }} />
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-[9px] text-slate-400 uppercase tracking-widest">DAILY SYNC</span>
            </div>

            {/* Studio Abilities */}
            <div className="bg-[#FFFFFF] border border-slate-200/55 rounded-[20px] p-6 min-h-[200px] flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
              <div>
                <h3 className="text-slate-950 text-xs font-bold uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Award size={14} className="text-[#10B981]" /> Studio Archetypes
                </h3>
                <div className="space-y-2 text-[11px] text-slate-600">
                  <p><strong>Eagle (Vision)</strong> — Sharp architectural oversight</p>
                  <p><strong>Fox (Creativity)</strong> — Premium WebGL aesthetic designs</p>
                </div>
              </div>
              <span className="text-[9px] text-[#10B981]/60 uppercase tracking-widest">SYNAPSE CORE</span>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== COMMUNITY SECTION ==================== */}
      <section id="community" className="py-[128px] px-6 md:px-12 bg-[#F8F9FA] relative overflow-hidden">
        <div className="max-w-[900px] w-full mx-auto bg-[#FFFFFF] border border-slate-200/50 rounded-[32px] p-8 md:p-16 text-center reveal relative z-10 shadow-[0_10px_40px_rgb(0,0,0,0.015)]">
          
          {/* Pulsing Dot Cluster */}
          <div className="flex justify-center gap-1.5 mb-6">
            <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
            <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse delay-150" />
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse delay-300" />
          </div>

          <h2 className="font-display font-bold text-[36px] md:text-[60px] leading-tight text-slate-900 mb-6">
            Join the <span className="gradient-brand-text">Synapse Community</span>
          </h2>

          <p className="font-body text-[15px] md:text-[17px] leading-relaxed text-slate-600 max-w-xl mx-auto mb-10">
            Get exclusive project firmware files, custom build schematics, behind-the-scenes engineering tutorials, and early access to hardware experiments.
          </p>

          {/* Social Channels buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            
            {/* YouTube */}
            <a 
              href="https://www.youtube.com/@SYNAPSE_LAB_IN" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:-translate-y-0.5 text-[14px] font-semibold text-slate-900 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="red" viewBox="0 0 24 24"><path d="M23.498 6.163c-.272-1.016-1.074-1.819-2.09-2.09C19.56 3.653 12 3.653 12 3.653s-7.56 0-9.408.42c-1.016.27-1.819 1.073-2.09 2.09C0 8.01 0 12 0 12s0 3.99.42 5.837c.27 1.017 1.074 1.82 2.09 2.09 1.848.42 9.408.42 9.408.42s7.56 0 9.408-.42c1.016-.27 1.818-1.073 2.09-2.09C24 15.99 24 12 24 12s0-3.99-.42-5.837zm-14.73 9.46V8.38l6.3 3.62-6.3 3.62z"/></svg>
              <span>YouTube</span>
            </a>

            {/* WhatsApp */}
            <a 
              href="https://chat.whatsapp.com/G5T2vWw1eH7K4J5eK5"
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:-translate-y-0.5 text-[14px] font-semibold text-slate-900 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#25D366" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.718-1.455L0 24zm6.208-3.791c1.666.988 3.326 1.488 5.748 1.49 5.485 0 9.948-4.461 9.951-9.947.002-2.659-1.026-5.158-2.894-7.03C17.202 2.85 14.707 1.82 12.007 1.82c-5.492 0-9.96 4.469-9.964 9.96-.001 2.224.576 4.398 1.671 6.297l-.993 3.626 3.738-.98a9.839 9.839 0 0 0 5.267-1.398zm11.233-7.514c-.307-.154-1.821-.899-2.102-1.002-.281-.102-.486-.154-.69.154-.204.307-.792.999-.971 1.203-.18.204-.359.227-.666.074-2.008-.949-3.326-2.457-4.238-4.029-.244-.418-.089-.661.085-.898.156-.213.307-.359.461-.539.154-.18.205-.307.307-.513.102-.205.051-.385-.026-.539-.077-.154-.69-1.663-.947-2.28-.251-.603-.506-.522-.69-.531l-.589-.009c-.205 0-.539.077-.821.385-.282.308-1.077 1.051-1.077 2.564 0 1.513 1.102 2.974 1.256 3.179.154.205 2.169 3.313 5.253 4.643.733.317 1.307.506 1.753.648.737.234 1.408.201 1.94.122.592-.088 1.821-.744 2.077-1.46.256-.718.256-1.333.18-1.46-.077-.128-.282-.205-.589-.359z"/></svg>
              <span>WhatsApp Community</span>
            </a>

            {/* Google Business */}
            <a 
              href="https://g.co/kgs/SynapseLab"
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-[#4285F4]/20 bg-[#4285F4]/5 hover:bg-[#4285F4]/10 hover:-translate-y-0.5 text-[14px] font-semibold text-slate-900 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#4285F4" viewBox="0 0 24 24"><path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.555 0-6.438-2.883-6.438-6.438s2.883-6.438 6.438-6.438c1.554 0 2.98.552 4.095 1.464l3.078-3.078C18.894 1.776 15.69 0 12 0 5.373 0 0 5.373 0 12s5.373 12 12 12c6.262 0 11.455-4.476 11.96-10.285H12.24z"/></svg>
              <span>Google Business</span>
            </a>

          </div>

        </div>
      </section>

      {/* ==================== CONTACT SECTION ==================== */}
      <section id="contact" className="py-[128px] px-6 md:px-12 bg-[#FFFFFF] border-t border-slate-200">
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-[80px]">
          
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 reveal flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[1px] w-8 bg-[#10B981]" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#10B981]">
                  Get in Touch
                </span>
              </div>

              <h2 className="font-display font-bold text-[36px] md:text-[52px] leading-[1.0] tracking-tighter text-slate-900 mb-6">
                Let's build<br />something<br /><span className="gradient-brand-text">remarkable.</span>
              </h2>

              <p className="font-body text-[15px] leading-relaxed text-slate-600 mb-10 max-w-sm">
                Have a hardware hacking project, custom automated web workflow, or IoT deployment idea? Synapse Lab is always open to collaborative prototyping.
              </p>

              {/* Rows */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F8F9FA] border border-slate-200 rounded-lg flex items-center justify-center text-[#10B981]">
                    <Globe size={18} />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-slate-400 block mb-1">WEBSITE</span>
                    <a href="https://synapselab.in" className="text-slate-900 hover:text-[#10B981] transition-colors text-[14px]">
                      synapselab.in
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F8F9FA] border border-slate-200 rounded-lg flex items-center justify-center text-[#10B981]">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-slate-400 block mb-1">LOCATION</span>
                    <span className="text-slate-900 text-[14px]">Chennai, Tamil Nadu, India</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F8F9FA] border border-slate-200 rounded-lg flex items-center justify-center text-[#10B981]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-slate-400 block mb-1">EMAIL</span>
                    <a href="mailto:hello@synapselab.in" className="text-slate-900 hover:text-[#10B981] transition-colors text-[14px]">
                      hello@synapselab.in
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social icons links */}
            <div className="mt-12 pt-8 border-t border-slate-200 flex gap-4 text-slate-400">
              <a href="https://github.com/GREENMAN-source" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">
                GitHub
              </a>
              <span className="text-slate-350">/</span>
              <a href="https://www.instagram.com/dhanvanth_l.p" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">
                Instagram
              </a>
              <span className="text-slate-355">/</span>
              <a href="https://www.youtube.com/@SYNAPSE_LAB_IN" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">
                YouTube
              </a>
              <span className="text-slate-355">/</span>
              <a href="https://x.com/5kDhanvant8844" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">
                X.com
              </a>
            </div>
          </div>

          {/* Right Column: Web3Forms submission form */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-slate-200 rounded-[28px] p-8 md:p-12 reveal shadow-[0_10px_40px_rgb(0,0,0,0.015)]">
            <form 
              action="https://api.web3forms.com/submit" 
              method="POST" 
              onSubmit={handleContactSubmit}
              className="flex flex-col gap-6"
            >
              {/* Replace with your Access Key */}
              <input type="hidden" name="access_key" value="ea1e186e-b3d9-4d6d-9721-6b45d2e09ff7" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-[#10B981]">YOUR NAME</label>
                  <input type="text" name="name" className="cyber-input" placeholder="Dhanvanth L.P" required />
                </div>
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-[#10B981]">EMAIL ADDRESS</label>
                  <input type="email" name="email" className="cyber-input" placeholder="hello@synapselab.in" required />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[9px] uppercase tracking-wider text-[#10B981]">SUBJECT</label>
                <input type="text" name="subject" className="cyber-input" placeholder="IoT hardware project collaboration" required />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[9px] uppercase tracking-wider text-[#10B981]">MESSAGE</label>
                <textarea name="message" rows={5} className="cyber-input resize-none" placeholder="Describe your ambitious idea..." required />
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <button 
                  type="submit" 
                  disabled={formStatus === 'transmitting'}
                  className="w-full btn-primary btn-magnetic h-14 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  {formStatus === 'transmitting' && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  <span>
                    {formStatus === 'transmitting' ? 'TRANSMITTING SIGNAL...' : 'Send Message →'}
                  </span>
                </button>
              </div>

              {/* Form Success/Error alert */}
              {formStatus === 'success' && (
                <div className="bg-[#10B981]/5 border border-[#10B981]/20 text-[#10B981] p-4 rounded-lg font-mono text-[12px] text-center">
                  SIGNAL TRANSMITTED SECURELY. Dhanvanth will sync up shortly.
                </div>
              )}
              {formStatus === 'error' && (
                <div className="bg-red-500/5 border border-red-500/20 text-red-600 p-4 rounded-lg font-mono text-[12px] text-center">
                  TRANSMISSION ENCOUNTERED A FAILURE. Please mail directly to hello@synapselab.in
                </div>
              )}

            </form>
          </div>

        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-10 px-6 md:px-12 bg-[#F8F9FA] border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] text-slate-500 font-body">
          <a href="#hero" className="font-display font-bold text-slate-900 text-[16px]">
            Synapse Lab
          </a>
          <p className="text-center font-light">
            © 2026 Synapse Lab. Built with precision and telemetry.
          </p>
          <div className="flex gap-6">
            <a href="#projects" className="hover:text-slate-900 transition-colors">Projects</a>
            <a href="#tech" className="hover:text-slate-900 transition-colors">Stack</a>
            <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* ==================== CASE STUDY DETAILS MODAL ==================== */}
      {selectedProject && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-[#F8F9FA]/90 backdrop-blur-md">
          <div className="bg-[#FFFFFF] border border-slate-200 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[24px] p-8 md:p-12 relative shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
            
            {/* Close */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-slate-600 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 p-2 rounded-full cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <span className="text-[10px] font-mono text-[#10B981] border border-[#10B981]/20 px-2 py-0.5 rounded-[4px] bg-[#10B981]/5 inline-block mb-3">
              {selectedProject.category}
            </span>

            <h2 className="font-display font-extrabold text-[32px] text-slate-900 tracking-tight mb-1 mt-2">
              {selectedProject.title}
            </h2>
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-8">
              {selectedProject.subtitle}
            </p>

            <div className="space-y-6 text-[14px] leading-relaxed">
              <div>
                <h4 className="text-slate-950 font-mono font-bold uppercase text-[10px] tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full" />
                  The Problem
                </h4>
                <p className="text-slate-600 font-light pl-4">
                  {selectedProject.problem}
                </p>
              </div>

              <div>
                <h4 className="text-slate-950 font-mono font-bold uppercase text-[10px] tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full" />
                  The Process
                </h4>
                <p className="text-slate-600 font-light pl-4">
                  {selectedProject.process}
                </p>
              </div>

              <div>
                <h4 className="text-slate-950 font-mono font-bold uppercase text-[10px] tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full" />
                  Technologies Integrated
                </h4>
                <div className="flex flex-wrap gap-1.5 pl-4 mt-2">
                  {selectedProject.tech.map((t, idx) => (
                    <span 
                      key={idx} 
                      className="text-[10px] font-mono text-slate-700 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-[4px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-slate-950 font-mono font-bold uppercase text-[10px] tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full" />
                  Outcome & Telemetry Metrics
                </h4>
                <p className="text-[#10B981] bg-[#10B981]/5 p-4 rounded-lg border border-[#10B981]/10 font-medium">
                  {selectedProject.outcome}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
