'use client';

import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  subtitle: string;
  category: string;
  number: string;
  desc: string;
  tech: string[];
  onClick: () => void;
}

export default function ProjectCard({
  title,
  subtitle,
  category,
  number,
  desc,
  tech,
  onClick
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className="project-card relative bg-[#08090F] border border-white/5 hover:border-[#00E5FF]/25 rounded-[28px] p-8 md:p-12 overflow-hidden transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[360px] group"
    >
      {/* Decorative Ghost Project Number */}
      <span className="absolute top-6 right-8 font-display font-extrabold text-[96px] leading-none text-white/[0.03] group-hover:text-white/[0.08] transition-colors duration-500 select-none">
        {number}
      </span>

      <div className="z-10 relative">
        {/* Category tag */}
        <span className="inline-block text-[10px] font-mono uppercase tracking-[0.15em] text-[#00E5FF] mb-6">
          {category}
        </span>
        
        {/* Title */}
        <h3 className="font-display font-bold text-[28px] leading-tight text-white mb-2 group-hover:text-[#00E5FF] transition-colors duration-300">
          {title}
        </h3>
        
        {/* Subtitle */}
        <p className="font-mono text-[11px] uppercase tracking-wider text-white/40 mb-4">
          {subtitle}
        </p>
        
        {/* Short Description */}
        <p className="font-body text-[14px] leading-relaxed text-white/50 max-w-md">
          {desc}
        </p>
      </div>

      <div className="z-10 relative mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5">
          {tech.map((t, idx) => (
            <span 
              key={idx} 
              className="text-[10px] font-mono text-white/40 bg-white/[0.02] border border-white/[0.04] px-2 py-0.5 rounded-[4px]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* View Link Arrow */}
        <div className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-[#00E5FF] group-hover:text-white transition-colors duration-300">
          <span>Unfold</span>
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
}
