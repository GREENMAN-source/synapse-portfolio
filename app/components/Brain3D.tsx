'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function DNAParticles() {
  const ref = useRef<THREE.Points>(null);

  // Generate a procedural DNA-like point cloud
  const [positions, colors] = useMemo(() => {
    const count = 8000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const type = Math.random();
      let x, y, z;

      // 80% points for the two main strands
      if (type < 0.8) {
        const t = Math.random() * Math.PI * 40; // Length
        const strand = Math.random() > 0.5 ? 1 : 0;
        const radius = 2.0;
        
        x = Math.cos(t + strand * Math.PI) * radius;
        z = Math.sin(t + strand * Math.PI) * radius;
        y = (t - Math.PI * 20) * 0.3; // Spread along Y axis
        
        // Add organic noise to strands
        x += (Math.random() - 0.5) * 0.4;
        y += (Math.random() - 0.5) * 0.4;
        z += (Math.random() - 0.5) * 0.4;
      } else {
        // 20% points for connecting bridges (synapses)
        const t = Math.random() * Math.PI * 40;
        const radius = 2.0 * Math.random(); // Random point between the two strands
        const strandAngle = Math.random() > 0.5 ? 0 : Math.PI;
        
        // Sometimes interpolate between strands
        const mix = Math.random();
        const angle1 = t;
        const angle2 = t + Math.PI;
        
        x = (Math.cos(angle1) * mix + Math.cos(angle2) * (1 - mix)) * radius;
        z = (Math.sin(angle1) * mix + Math.sin(angle2) * (1 - mix)) * radius;
        y = (t - Math.PI * 20) * 0.3;
        
        // Add more noise to bridges
        x += (Math.random() - 0.5) * 0.6;
        y += (Math.random() - 0.5) * 0.6;
        z += (Math.random() - 0.5) * 0.6;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Colors: Cyan and Pink DNA aesthetic
      const mix = Math.random();
      const c = new THREE.Color().lerpColors(
        new THREE.Color('#00E5FF'), // Cyan
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
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
      
      // Cinematic Zoom: Move the DNA down so camera flies *up* through it
      // progress 0 -> y = 10 (top of DNA)
      // progress 1 -> y = -10 (bottom of DNA)
      const targetPositionY = THREE.MathUtils.lerp(8, -8, progress);
      
      // Rotate as we fly through
      const targetRotationY = progress * Math.PI * 4; 
      
      // 5-step scroll narrative: Zoom in deeply at the transition points
      const zoomPulse = Math.abs(Math.sin(progress * Math.PI * 4)); // 4 transitions for 5 steps
      const targetScale = 1 + zoomPulse * 0.8; 

      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetPositionY, 0.05);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotationY, 0.05);
      
      ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, targetScale, 0.05));
      
      // Continuous idle spin
      ref.current.rotation.y += delta * 0.1;
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
        size={0.035}
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
      {/* We position the camera slightly looking down inside the helix */}
      <Canvas camera={{ position: [0, -1, 3], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <DNAParticles />
      </Canvas>
    </div>
  );
}
