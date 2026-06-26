'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function MorphingParticles() {
  const ref = useRef<THREE.Points>(null);
  const posRef = useRef<THREE.BufferAttribute>(null);

  // Generate three states: DNA, Scattered, Brain
  const [posDNA, posScat, posBrain, colors] = useMemo(() => {
    const count = 8000;
    const pDNA = new Float32Array(count * 3);
    const pScat = new Float32Array(count * 3);
    const pBrain = new Float32Array(count * 3);
    const c = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // 1. DNA Shape
      const type = Math.random();
      let dx, dy, dz;
      if (type < 0.8) {
        const t = Math.random() * Math.PI * 40;
        const strand = Math.random() > 0.5 ? 1 : 0;
        const radius = 2.0;
        dx = Math.cos(t + strand * Math.PI) * radius + (Math.random() - 0.5) * 0.4;
        dz = Math.sin(t + strand * Math.PI) * radius + (Math.random() - 0.5) * 0.4;
        dy = (t - Math.PI * 20) * 0.3 + (Math.random() - 0.5) * 0.4;
      } else {
        const t = Math.random() * Math.PI * 40;
        const radius = 2.0 * Math.random();
        const mix = Math.random();
        dx = (Math.cos(t) * mix + Math.cos(t + Math.PI) * (1 - mix)) * radius + (Math.random() - 0.5) * 0.6;
        dz = (Math.sin(t) * mix + Math.sin(t + Math.PI) * (1 - mix)) * radius + (Math.random() - 0.5) * 0.6;
        dy = (t - Math.PI * 20) * 0.3 + (Math.random() - 0.5) * 0.6;
      }
      pDNA[i*3] = dx; pDNA[i*3+1] = dy; pDNA[i*3+2] = dz;

      // 2. Scattered Shape (Disaligned)
      pScat[i*3] = (Math.random() - 0.5) * 25;
      pScat[i*3+1] = (Math.random() - 0.5) * 25;
      pScat[i*3+2] = (Math.random() - 0.5) * 25;

      // 3. Brain Shape (Realistic Ellipsoid with Fissure)
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      
      let bx = Math.sin(phi) * Math.cos(theta) * 1.8;
      let by = Math.sin(phi) * Math.sin(theta) * 1.4;
      let bz = Math.cos(phi) * 1.5;
      
      if (bz > 0) bz += 0.2;
      else bz -= 0.2;

      bx += (Math.random() - 0.5) * 0.3;
      by += (Math.random() - 0.5) * 0.3;
      bz += (Math.random() - 0.5) * 0.3;
      
      pBrain[i*3] = bx; pBrain[i*3+1] = by; pBrain[i*3+2] = bz;

      // Color (Cyan and Pink blend)
      const mixC = Math.random();
      const col = new THREE.Color().lerpColors(
        new THREE.Color('#00E5FF'),
        new THREE.Color('#EC4899'),
        mixC
      );
      c[i*3] = col.r; c[i*3+1] = col.g; c[i*3+2] = col.b;
    }
    
    return [pDNA, pScat, pBrain, c];
  }, []);

  // Initial render uses DNA positions
  const initialPositions = new Float32Array(posDNA);

  useFrame((state, delta) => {
    if (ref.current && posRef.current) {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
      
      const positions = posRef.current.array as Float32Array;
      
      // Calculate morph factors
      // 0.0 to 0.4: DNA -> Scattered
      // 0.4 to 0.6: Stay Scattered
      // 0.6 to 1.0: Scattered -> Brain
      let factor1 = 0; // DNA -> Scattered
      let factor2 = 0; // Scattered -> Brain
      
      if (progress < 0.4) {
        factor1 = progress / 0.4;
      } else if (progress < 0.6) {
        factor1 = 1;
        factor2 = 0;
      } else {
        factor1 = 1;
        factor2 = (progress - 0.6) / 0.4;
      }

      // Smooth easing for organic feel
      factor1 = THREE.MathUtils.smoothstep(factor1, 0, 1);
      factor2 = THREE.MathUtils.smoothstep(factor2, 0, 1);

      // Morph individual particles
      for (let i = 0; i < 8000; i++) {
        let currentX, currentY, currentZ;
        
        if (factor2 > 0) {
          currentX = THREE.MathUtils.lerp(posScat[i*3], posBrain[i*3], factor2);
          currentY = THREE.MathUtils.lerp(posScat[i*3+1], posBrain[i*3+1], factor2);
          currentZ = THREE.MathUtils.lerp(posScat[i*3+2], posBrain[i*3+2], factor2);
        } else {
          currentX = THREE.MathUtils.lerp(posDNA[i*3], posScat[i*3], factor1);
          currentY = THREE.MathUtils.lerp(posDNA[i*3+1], posScat[i*3+1], factor1);
          currentZ = THREE.MathUtils.lerp(posDNA[i*3+2], posScat[i*3+2], factor1);
        }
        
        positions[i*3] = currentX;
        positions[i*3+1] = currentY;
        positions[i*3+2] = currentZ;
      }
      
      posRef.current.needsUpdate = true;

      // Spin container based on state
      ref.current.rotation.y += delta * (0.1 + factor2 * 0.2); // Spin faster when it's a brain
      
      // Camera / Object positioning
      if (progress < 0.4) {
        // DNA Zoom out effect
        ref.current.position.y = THREE.MathUtils.lerp(8, 0, factor1);
        ref.current.scale.setScalar(1);
        ref.current.rotation.x = 0;
      } else if (progress > 0.6) {
        // Brain assembly effect
        ref.current.position.y = 0;
        ref.current.scale.setScalar(THREE.MathUtils.lerp(1, 1.5, factor2));
        ref.current.rotation.x = THREE.MathUtils.lerp(0, Math.PI * 0.15, factor2); // Tilt brain slightly
      } else {
        // Scattered state floating
        ref.current.position.y = 0;
        ref.current.scale.setScalar(1);
      }
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          ref={posRef}
          attach="attributes-position"
          count={initialPositions.length / 3}
          array={initialPositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Brain3D() {
  return (
    <div className="w-full h-full fixed inset-0 z-0 pointer-events-none bg-[#030408]">
      <Canvas camera={{ position: [0, -1, 3.5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <MorphingParticles />
      </Canvas>
    </div>
  );
}
