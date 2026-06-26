'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import CustomShaderMaterial from 'three-custom-shader-material';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

const vertexShader = `
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  
  void main() {
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    vNormal = normalize(normalMatrix * normal);
  }
`;

const fragmentShader = `
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  uniform float uTime;

  void main() {
    // Calculate distance from center (0,0,0) for the radial pulse
    float dist = length(vWorldPos);

    // Base deep biological blue color
    vec3 baseColor = vec3(0.02, 0.05, 0.25);
    
    // Fresnel effect for cell membrane glow
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    float fresnel = clamp(1.0 - dot(viewDir, vNormal), 0.0, 1.0);
    fresnel = pow(fresnel, 3.0);
    vec3 fresnelColor = vec3(0.1, 0.3, 0.9) * fresnel;

    // Electrical Pulses (Red)
    // Moves outward from center over time
    float pulseSpeed = 4.0;
    float pulseFrequency = 1.0;
    float rawPulse = sin(dist * pulseFrequency - uTime * pulseSpeed);
    
    // Sharpen the pulse to make it look like distinct electrical bands
    float pulse = smoothstep(0.9, 1.0, rawPulse);
    
    // Fade out pulses near the absolute center (Soma)
    float isBranch = smoothstep(2.0, 4.0, dist);
    
    // Bright glowing red/pink for the electricity
    vec3 pulseColor = vec3(2.0, 0.0, 0.2) * 5.0; // Multiplied for bloom effect later

    // Combine
    vec3 finalColor = baseColor + fresnelColor + (pulseColor * pulse * isBranch);

    csm_DiffuseColor = vec4(finalColor, 1.0);
  }
`;

function NeuronGeometry() {
  const materialRef = useRef<any>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Procedurally generate the neuron branches
  const branches = useMemo(() => {
    const curves = [];
    const numBranches = 50;
    
    for (let i = 0; i < numBranches; i++) {
      const points = [];
      const length = 20 + Math.random() * 20;
      
      // Random outward direction
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      
      const dirX = Math.sin(phi) * Math.cos(theta);
      const dirY = Math.sin(phi) * Math.sin(theta);
      const dirZ = Math.cos(phi);
      const direction = new THREE.Vector3(dirX, dirY, dirZ);

      // Start slightly inside the soma
      let currentPos = direction.clone().multiplyScalar(1.5);
      points.push(currentPos.clone());

      // Create winding path
      let currentDir = direction.clone();
      for (let j = 0; j < 6; j++) {
        // Add some random noise to direction
        currentDir.x += (Math.random() - 0.5) * 1.2;
        currentDir.y += (Math.random() - 0.5) * 1.2;
        currentDir.z += (Math.random() - 0.5) * 1.2;
        currentDir.normalize();
        
        currentPos.add(currentDir.clone().multiplyScalar(length / 6));
        points.push(currentPos.clone());
      }
      
      curves.push(new THREE.CatmullRomCurve3(points));
    }
    return curves;
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
    
    if (groupRef.current) {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
      
      // Cinematic Camera Push:
      // The container moves TOWARDS the camera (Z axis) as we scroll down
      groupRef.current.position.z = THREE.MathUtils.lerp(0, 20, progress);
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <CustomShaderMaterial
        ref={materialRef}
        baseMaterial={THREE.MeshPhysicalMaterial}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        roughness={0.2}
        metalness={0.9}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
      />

      {/* The Soma (Cell Body) */}
      <mesh>
        <icosahedronGeometry args={[2.5, 8]} />
      </mesh>

      {/* The Dendrites / Axons */}
      {branches.map((curve, index) => (
        <mesh key={index}>
          <tubeGeometry args={[curve, 64, 0.15 + Math.random() * 0.1, 8, false]} />
        </mesh>
      ))}
    </group>
  );
}

export default function Neuron3D() {
  return (
    <div className="w-full h-full fixed inset-0 z-0 pointer-events-none bg-[#020205]">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <color attach="background" args={['#020205']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2.0} color="#00E5FF" />
        <directionalLight position={[-10, -10, -5]} intensity={1.0} color="#EC4899" />
        
        <NeuronGeometry />
        
        {/* Post-processing Bloom for glowing electrical pulses */}
        <EffectComposer>
          <Bloom luminanceThreshold={1.5} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
