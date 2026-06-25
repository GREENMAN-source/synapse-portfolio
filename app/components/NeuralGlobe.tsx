'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NeuralGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Performance settings based on screen width
    const isMobile = window.innerWidth < 768;
    const GRID_SIZE = isMobile ? 30 : 60; // Grid density
    const W = isMobile ? window.innerWidth : 600;
    const H = window.innerHeight;

    // 1. SETUP RENDERER & SCENE
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    
    // Position camera slightly elevated, looking forward down the valley
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(0, 1.8, 5);
    camera.rotation.x = -0.15; // Look slightly down

    // 2. GENERATE 3D MOUNTAIN PLANE
    // Width: 20, Height: 30, Grid segments: GRID_SIZE x GRID_SIZE
    const planeGeo = new THREE.PlaneGeometry(24, 32, GRID_SIZE, GRID_SIZE);
    
    // Rotate the plane to make it lay flat as a floor
    planeGeo.rotateX(-Math.PI / 2);
    planeGeo.translate(0, -0.5, -10); // Offset down and forward

    // Style mountains as clean slate/grey wireframe lines
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x0f172a, // Slate-900 wireframe color
      wireframe: true,
      transparent: true,
      opacity: isMobile ? 0.05 : 0.09
    });

    const terrain = new THREE.Mesh(planeGeo, planeMat);
    scene.add(terrain);

    // Save initial vertex positions to perturb them mathematically
    const initialPos = planeGeo.attributes.position.clone();

    // 3. TRACK MOUSE MOVE TILT & SCROLL VELOCITY
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRotY = nx * 0.15; // Camera pan
      targetRotX = ny * 0.08; // Camera pitch
    };

    window.addEventListener('mousemove', onMouseMove);

    // Scroll speed tracking
    let scrollSpeed = 0;
    let lastScrollY = window.scrollY;
    let scrollTimeout: any = null;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      // Temporary velocity boost when scrolling
      scrollSpeed = Math.min(delta * 0.15, 3.0);

      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollSpeed = 0;
      }, 50);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Handle Window Resize
    const onResize = () => {
      const width = isMobile ? window.innerWidth : 600;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // 4. ANIMATION LOOP
    const clock = new THREE.Clock();
    let frameId: number;
    let isTabVisible = true;
    let timeOffset = 0;

    const animate = () => {
      if (!isTabVisible) return;

      frameId = requestAnimationFrame(animate);

      // Lerp mouse pan/tilt rotation
      currentRotY += (targetRotY - currentRotY) * 0.05;
      currentRotX += (targetRotX - currentRotX) * 0.05;
      camera.rotation.y = -currentRotY;
      camera.position.x = currentRotY * 1.5; // Slide camera sideways slightly

      // Smooth decay of scroll speed
      scrollSpeed *= 0.95;

      // Accumulate travel distance based on base speed + scroll velocity
      const speed = 0.005 + scrollSpeed * 0.015;
      timeOffset += speed;

      // Perturb the heights to animate the mountains scrolling towards the camera
      const pos = planeGeo.attributes.position;
      
      for (let i = 0; i < pos.count; i++) {
        const x = initialPos.getX(i);
        const y = initialPos.getY(i);
        
        // A valley in the center (Z=0), mountains rise on left/right edges (X)
        const valleyFactor = Math.min(1.2, (x * x) * 0.06); 

        // Generative height function combining multiple sine frequencies
        const zValue = (
          Math.sin(x * 0.25) * Math.cos((y - timeOffset * 22) * 0.22) * 2.2 +
          Math.sin(x * 0.6) * Math.sin((y - timeOffset * 22) * 0.5) * 0.6
        ) * valleyFactor - 0.4;

        // Apply perturbed Y height (which is the vertical direction in Flat layout)
        pos.setY(i, zValue);
      }
      
      pos.needsUpdate = true;
      planeGeo.computeVertexNormals();

      renderer.render(scene, camera);
    };

    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === 'visible';
      if (isTabVisible) {
        clock.getDelta();
        animate();
      } else {
        cancelAnimationFrame(frameId);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    animate();

    // 5. CLEANUP
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(frameId);
      if (scrollTimeout) clearTimeout(scrollTimeout);

      planeGeo.dispose();
      planeMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      className="absolute inset-y-0 right-0 z-0 select-none pointer-events-none w-full md:w-[600px] overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0))',
        WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0))'
      }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full opacity-[0.22] md:opacity-[0.7] transition-opacity duration-1000"
      />
    </div>
  );
}
