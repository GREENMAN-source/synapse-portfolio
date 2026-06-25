'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function BrainParticles() {
  const ref = useRef<THREE.Points>(null);

  // Generate a procedural brain-like point cloud
  const [positions, colors] = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Create a two-hemisphere blob shape
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      
      let x = Math.sin(phi) * Math.cos(theta);
      let y = Math.sin(phi) * Math.sin(theta);
      let z = Math.cos(phi);
      
      // Deform into brain shape (elongated, split hemispheres)
      x *= 1.3; // length
      y *= 0.9; // height
      z *= 1.1; // width
      
      // Central fissure (gap between hemispheres)
      if (z > 0) z += 0.15;
      else z -= 0.15;

      // Add noise to make it look organic
      const noiseX = (Math.random() - 0.5) * 0.25;
      const noiseY = (Math.random() - 0.5) * 0.25;
      const noiseZ = (Math.random() - 0.5) * 0.25;
      x += noiseX;
      y += noiseY;
      z += noiseZ;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Colors: blend between cyan and pink
      const mix = Math.random();
      const c = new THREE.Color().lerpColors(
        new THREE.Color('#06B6D4'), // Cyan
        new THREE.Color('#EC4899'), // Pink
        mix
      );
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    
    return [positions, colors];
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Calculate global scroll progress (0.0 to 1.0)
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      // Protect against maxScroll being 0 or very small before page loads
      const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
      
      // Target rotation based on scroll (full 360 degree spin + some tilt)
      const targetRotationY = progress * Math.PI * 2.5; 
      const targetRotationX = (progress - 0.5) * Math.PI * 0.25;

      // Zoom effect: Zoom in during the transition between the 6 sections
      // 7 sections means 6 transitions. progress * Math.PI * 6 creates 5 arcs.
      const zoomPulse = Math.abs(Math.sin(progress * Math.PI * 6));
      const targetScale = 1 + zoomPulse * 0.8; // scales up to 1.8x during transition

      // Smoothly lerp towards target rotation and scale
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotationY, 0.05);
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetRotationX, 0.05);
      
      ref.current.scale.x = THREE.MathUtils.lerp(ref.current.scale.x, targetScale, 0.05);
      ref.current.scale.y = THREE.MathUtils.lerp(ref.current.scale.y, targetScale, 0.05);
      ref.current.scale.z = THREE.MathUtils.lerp(ref.current.scale.z, targetScale, 0.05);
      
      // Keep a very subtle continuous ambient float
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
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
        size={0.03}
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
      <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <BrainParticles />
      </Canvas>
    </div>
  );
}
