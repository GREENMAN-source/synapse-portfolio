'use client';
import React, { useRef } from 'react';
import { User, Shield, Video, Share2 } from 'lucide-react';
import Image from 'next/image';

const team = [
  {
    id: 1,
    name: 'Dhanvanth L.P',
    role: 'Founder & Lead Engineer',
    theme: '#00E5FF',
    image: '/avatar-image.png',
    icon: Shield,
    desc: 'Architecting the core logic, web systems, and hardware integrations for Synapse Lab.'
  },
  {
    id: 2,
    name: 'Surya B',
    role: 'Lead Editor',
    theme: '#EF4444', // Red
    image: null,
    icon: Video,
    desc: 'Directing the cinematic vision, visual effects, and high-end aesthetic cuts.'
  },
  {
    id: 3,
    name: 'Hemanath',
    role: 'Social Manager',
    theme: '#10B981', // Green
    image: null,
    icon: Share2,
    desc: 'Controlling the transmission frequency and managing the global grid presence.'
  }
];

export default function TeamShowcase() {
  return (
    <section className="relative w-full py-32 bg-[#030408] border-t border-white/5 z-20 flex flex-col items-center">
      <div className="text-center mb-20 relative z-20 px-4">
        <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">The Core Team.</h2>
        <p className="text-slate-400 font-mono uppercase tracking-widest text-sm">Operatives powering the lab.</p>
      </div>

      <div className="w-[90%] max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {team.map((member) => (
          <div 
            key={member.id}
            className="group relative bg-[#050505]/90 backdrop-blur-xl border border-white/10 hover:border-white/30 rounded-[2rem] p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2"
            style={{ boxShadow: `0 0 0px ${member.theme}00` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 20px 80px ${member.theme}20`;
              e.currentTarget.style.borderColor = `${member.theme}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 0 0px ${member.theme}00`;
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            }}
          >
            {/* Background Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${member.theme} 0%, transparent 70%)` }}></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              
              {/* Image / Avatar Box */}
              <div 
                className="w-32 h-32 rounded-full mb-6 border-2 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-110"
                style={{ borderColor: `${member.theme}40`, backgroundColor: `${member.theme}05` }}
              >
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" />
                ) : (
                  <User size={48} color={member.theme} className="opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                )}
              </div>

              {/* Role Badge */}
              <div 
                className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4 border transition-colors duration-500"
                style={{ color: member.theme, borderColor: `${member.theme}30`, backgroundColor: `${member.theme}10` }}
              >
                {member.role}
              </div>

              {/* Name & Desc */}
              <h3 className="font-display text-3xl font-bold text-white mb-3">{member.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{member.desc}</p>
              
              {/* Icon Decoration */}
              <div className="mt-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-125 transform">
                <member.icon size={24} color={member.theme} />
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
