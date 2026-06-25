import React, { forwardRef } from 'react';

interface FlashCardProps {
  number: string;
  category: string;
  title: string;
  content: React.ReactNode;
  className?: string;
  align?: 'left' | 'right';
}

const FlashCard = forwardRef<HTMLDivElement, FlashCardProps>(
  ({ number, category, title, content, className = '', align = 'left' }, ref) => {
    
    // Determine alignment classes
    const alignClasses = align === 'right' 
      ? 'right-6 md:right-12 lg:right-24 text-right items-end flex flex-col' 
      : 'left-6 md:left-12 lg:left-24';

    return (
      <div 
        ref={ref} 
        className={`absolute top-1/2 -translate-y-1/2 w-[90%] md:w-[45%] lg:w-[40%] max-w-[600px] p-4 opacity-0 invisible z-20 pointer-events-auto ${alignClasses} ${className}`}
      >
        <div className={`flex items-center gap-3 mb-5 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
          <span className="w-8 h-[1px] bg-[#00E5FF]"></span>
          <span className="font-mono text-[#00E5FF] text-[10px] md:text-[11px] tracking-[0.2em] uppercase">
            {number} // {category}
          </span>
        </div>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-6 leading-tight tracking-tight">
          {title}
        </h2>
        <div className="font-body text-slate-300 text-[14px] md:text-[16px] leading-relaxed space-y-5">
          {content}
        </div>
      </div>
    );
  }
);

FlashCard.displayName = 'FlashCard';
export default FlashCard;
