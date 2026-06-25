'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Position the dot instantly
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Lerp animation loop for the lagging ring
    let animationFrameId: number;
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animateRing = () => {
      ringX = lerp(ringX, mouseX, 0.1);
      ringY = lerp(ringY, mouseY, 0.1);

      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      animationFrameId = requestAnimationFrame(animateRing);
    };

    animateRing();

    // Hover states for links, buttons, and cards
    const onMouseEnterInteractive = () => {
      document.body.classList.add('cursor-hover');
    };

    const onMouseLeaveInteractive = () => {
      document.body.classList.remove('cursor-hover');
    };

    const attachHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, .project-card, .btn-magnetic');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    // Run periodically to catch dynamically added items
    const interval = setInterval(attachHoverListeners, 1000);
    attachHoverListeners();

    // Magnetic effect on buttons
    const magneticElements = document.querySelectorAll('.btn-magnetic');
    const magneticListeners: Array<{ el: Element; onMove: (e: Event) => void; onLeave: () => void }> = [];

    magneticElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      
      const onMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = htmlEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(mouseEvent.clientX - centerX, mouseEvent.clientY - centerY);

        if (dist < 60) {
          const moveX = (mouseEvent.clientX - centerX) * 0.35;
          const moveY = (mouseEvent.clientY - centerY) * 0.35;
          gsap.to(htmlEl, {
            x: moveX,
            y: moveY,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        } else {
          // Spring back if just outside
          gsap.to(htmlEl, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
            overwrite: 'auto',
          });
        }
      };

      const onLeave = () => {
        gsap.to(htmlEl, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
          overwrite: 'auto',
        });
      };

      window.addEventListener('mousemove', onMove);
      htmlEl.addEventListener('mouseleave', onLeave);
      
      magneticListeners.push({ el, onMove, onLeave });
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);

      // Clean up interactive listeners
      const interactives = document.querySelectorAll('a, button, .project-card, .btn-magnetic');
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });

      // Clean up magnetic listeners
      magneticListeners.forEach(({ el, onMove, onLeave }) => {
        window.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      });

      document.body.classList.remove('cursor-hover');
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" id="cursor-dot" />
      <div ref={ringRef} className="cursor-ring hidden md:block" id="cursor-ring" />
    </>
  );
}
