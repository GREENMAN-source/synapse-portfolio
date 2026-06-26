'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function MorphingImageParticles() {
  const ref = useRef<THREE.Points>(null);
  const posRef = useRef<THREE.BufferAttribute>(null);
  
  const [particleData, setParticleData] = useState<{ 
    posCore: Float32Array;
    posAvatar: Float32Array; 
    posBrain: Float32Array; 
    posLogo: Float32Array;
    posScat: Float32Array; 
    coreColors: Float32Array;
    avatarColors: Float32Array;
    brainColors: Float32Array;
    logoColors: Float32Array;
    count: number;
  } | null>(null);

  useEffect(() => {
    // Helper to load image as promise
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.crossOrigin = "Anonymous";
        img.onload = () => resolve(img);
      });
    };

    const initializeData = async () => {
      const brainImg = await loadImage('/brain-image.png');
      const avatarImg = await loadImage('/avatar-image.png');
      const coreImg = await loadImage('/core-image.png');
      
      // 1. Setup Brain Image Canvas (Base Particle Count)
      const brainCanvas = document.createElement('canvas');
      const brainCtx = brainCanvas.getContext('2d');
      if (!brainCtx) return;
      
      const width = 180;
      const height = Math.floor((brainImg.height / brainImg.width) * width);
      brainCanvas.width = width;
      brainCanvas.height = height;
      
      brainCtx.drawImage(brainImg, 0, 0, width, height);
      const brainData = brainCtx.getImageData(0, 0, width, height).data;

      // 2. Setup Avatar Image Canvas
      const avCanvas = document.createElement('canvas');
      const avCtx = avCanvas.getContext('2d');
      if (!avCtx) return;
      
      const avWidth = 180;
      const avHeight = Math.floor((avatarImg.height / avatarImg.width) * avWidth);
      avCanvas.width = avWidth;
      avCanvas.height = avHeight;
      
      avCtx.drawImage(avatarImg, 0, 0, avWidth, avHeight);
      const avData = avCtx.getImageData(0, 0, avWidth, avHeight).data;
      
      // 3. Setup Core Image Canvas
      const coreCanvas = document.createElement('canvas');
      const coreCtx = coreCanvas.getContext('2d');
      if (!coreCtx) return;
      
      const coreWidth = 180;
      const coreHeight = Math.floor((coreImg.height / coreImg.width) * coreWidth);
      coreCanvas.width = coreWidth;
      coreCanvas.height = coreHeight;
      
      coreCtx.drawImage(coreImg, 0, 0, coreWidth, coreHeight);
      const coreData = coreCtx.getImageData(0, 0, coreWidth, coreHeight).data;

      // 4. Setup Logo Canvas
      const logoCanvas = document.createElement('canvas');
      const logoCtx = logoCanvas.getContext('2d');
      if (!logoCtx) return;
      
      const logoW = 200;
      const logoH = 100;
      logoCanvas.width = logoW;
      logoCanvas.height = logoH;
      
      logoCtx.fillStyle = 'black';
      logoCtx.fillRect(0, 0, logoW, logoH);
      
      logoCtx.fillStyle = 'white';
      logoCtx.font = '900 32px sans-serif';
      logoCtx.textAlign = 'center';
      logoCtx.textBaseline = 'middle';
      logoCtx.letterSpacing = '5px';
      logoCtx.fillText('SYNAPSE', logoW/2, logoH/2 - 10);
      
      logoCtx.font = '700 16px monospace';
      logoCtx.fillStyle = '#00E5FF';
      logoCtx.fillText('LABORATORY', logoW/2, logoH/2 + 20);
      
      const logoData = logoCtx.getImageData(0, 0, logoW, logoH).data;

      const pCore = [];
      const pAvatar = [];
      const pBrain = [];
      const pLogo = [];
      const pScat = [];
      
      const cCore = [];
      const cAvatar = [];
      const cBrain = [];
      const cLogo = [];
      
      // Extract Core Pixels
      const corePixels = [];
      for (let y = 0; y < coreHeight; y++) {
        for (let x = 0; x < coreWidth; x++) {
          const idx = (y * coreWidth + x) * 4;
          const r = coreData[idx];
          const g = coreData[idx + 1];
          const b = coreData[idx + 2];
          const a = coreData[idx + 3];
          const brightness = (r + g + b) / 3;
          if (a > 50 && brightness > 15) {
            corePixels.push({ x, y, r, g, b, brightness });
          }
        }
      }

      // Extract Avatar Pixels
      const avatarPixels = [];
      for (let y = 0; y < avHeight; y++) {
        for (let x = 0; x < avWidth; x++) {
          const idx = (y * avWidth + x) * 4;
          const r = avData[idx];
          const g = avData[idx + 1];
          const b = avData[idx + 2];
          const a = avData[idx + 3];
          const brightness = (r + g + b) / 3;
          if (a > 50 && brightness > 15) {
            avatarPixels.push({ x, y, r, g, b, brightness });
          }
        }
      }

      // Extract Brain Pixels (This determines the main particle count)
      let validPixels = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          const r = brainData[index];
          const g = brainData[index + 1];
          const b = brainData[index + 2];
          const a = brainData[index + 3];
          
          const brightness = (r + g + b) / 3;
          
          if (a > 50 && brightness > 15) {
            const posX = (x / width - 0.5) * 8; 
            const posY = -(y / height - 0.5) * 8 * (height/width);
            const posZ = (brightness / 255) * 0.8 + (Math.random() - 0.5) * 0.1;
            
            pBrain.push(posX, posY, posZ);
            cBrain.push(r / 255, g / 255, b / 255);
            
            pScat.push((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30);
            
            validPixels++;
          }
        }
      }
      
      // Extract Logo Pixels
      const logoPixels = [];
      for (let y = 0; y < logoH; y++) {
        for (let x = 0; x < logoW; x++) {
          const idx = (y * logoW + x) * 4;
          const r = logoData[idx];
          const g = logoData[idx + 1];
          const b = logoData[idx + 2];
          if (r > 10 || g > 10 || b > 10) {
            logoPixels.push({ x, y, r, g, b });
          }
        }
      }
      
      // Align all arrays to `validPixels` (Brain count)
      for (let i = 0; i < validPixels; i++) {
        
        // Map to Core
        if (corePixels.length > 0) {
          const coreTarget = corePixels[i % corePixels.length];
          const cx = (coreTarget.x / coreWidth - 0.5) * 8 + (Math.random() - 0.5) * 0.05;
          const cy = -(coreTarget.y / coreHeight - 0.5) * 8 * (coreHeight/coreWidth) + (Math.random() - 0.5) * 0.05;
          const cz = (coreTarget.brightness / 255) * 0.8;
          pCore.push(cx, cy, cz);
          cCore.push(coreTarget.r / 255, coreTarget.g / 255, coreTarget.b / 255);
        } else {
          pCore.push(0, 0, 0); cCore.push(1, 1, 1);
        }

        // Map to Avatar
        if (avatarPixels.length > 0) {
          const avTarget = avatarPixels[i % avatarPixels.length];
          const ax = (avTarget.x / avWidth - 0.5) * 8 + (Math.random() - 0.5) * 0.05;
          const ay = -(avTarget.y / avHeight - 0.5) * 8 * (avHeight/avWidth) + (Math.random() - 0.5) * 0.05;
          const az = (avTarget.brightness / 255) * 0.8;
          pAvatar.push(ax, ay, az);
          cAvatar.push(avTarget.r / 255, avTarget.g / 255, avTarget.b / 255);
        } else {
          pAvatar.push(0, 0, 0); cAvatar.push(1, 1, 1);
        }

        // Map to Logo
        if (logoPixels.length > 0) {
          const logoTarget = logoPixels[i % logoPixels.length];
          const lx = (logoTarget.x / logoW - 0.5) * 12 + (Math.random() - 0.5) * 0.05;
          const ly = -(logoTarget.y / logoH - 0.5) * 12 * (logoH/logoW) + (Math.random() - 0.5) * 0.05;
          const lz = (Math.random() - 0.5) * 0.2;
          pLogo.push(lx, ly, lz);
          cLogo.push(logoTarget.r / 255, logoTarget.g / 255, logoTarget.b / 255);
        } else {
          pLogo.push(0,0,0); cLogo.push(1,1,1);
        }
      }
      
      setParticleData({
        posCore: new Float32Array(pCore),
        posAvatar: new Float32Array(pAvatar),
        posBrain: new Float32Array(pBrain),
        posLogo: new Float32Array(pLogo),
        posScat: new Float32Array(pScat),
        coreColors: new Float32Array(cCore),
        avatarColors: new Float32Array(cAvatar),
        brainColors: new Float32Array(cBrain),
        logoColors: new Float32Array(cLogo),
        count: validPixels
      });
    };

    initializeData();
  }, []);

  const initialPositions = particleData ? particleData.posCore : new Float32Array(0);

  useFrame((state, delta) => {
    if (!particleData || !ref.current || !posRef.current) return;
    
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
    
    const positions = posRef.current.array as Float32Array;
    const colorsAttr = ref.current.geometry.attributes.color as THREE.BufferAttribute;
    
    let fCore2Scat = 0;
    let fScat2Avatar = 0;
    let fAvatar2Scat = 0;
    let fScat2Brain = 0;
    let fBrain2Scat = 0;
    let fScat2Logo = 0;
    
    if (progress < 0.10) {
      // Core Stays
    } else if (progress < 0.20) {
      fCore2Scat = (progress - 0.10) / 0.10;
    } else if (progress < 0.30) {
      fCore2Scat = 1;
      fScat2Avatar = (progress - 0.20) / 0.10;
    } else if (progress < 0.40) {
      fCore2Scat = 1;
      fScat2Avatar = 1;
    } else if (progress < 0.50) {
      fCore2Scat = 1;
      fScat2Avatar = 1;
      fAvatar2Scat = (progress - 0.40) / 0.10;
    } else if (progress < 0.60) {
      fCore2Scat = 1;
      fScat2Avatar = 1;
      fAvatar2Scat = 1;
      fScat2Brain = (progress - 0.50) / 0.10;
    } else if (progress < 0.75) {
      fCore2Scat = 1;
      fScat2Avatar = 1;
      fAvatar2Scat = 1;
      fScat2Brain = 1;
    } else if (progress < 0.85) {
      fCore2Scat = 1;
      fScat2Avatar = 1;
      fAvatar2Scat = 1;
      fScat2Brain = 1;
      fBrain2Scat = (progress - 0.75) / 0.10;
    } else {
      fCore2Scat = 1;
      fScat2Avatar = 1;
      fAvatar2Scat = 1;
      fScat2Brain = 1;
      fBrain2Scat = 1;
      fScat2Logo = (progress - 0.85) / 0.15;
    }

    fCore2Scat = THREE.MathUtils.smoothstep(fCore2Scat, 0, 1);
    fScat2Avatar = THREE.MathUtils.smoothstep(fScat2Avatar, 0, 1);
    fAvatar2Scat = THREE.MathUtils.smoothstep(fAvatar2Scat, 0, 1);
    fScat2Brain = THREE.MathUtils.smoothstep(fScat2Brain, 0, 1);
    fBrain2Scat = THREE.MathUtils.smoothstep(fBrain2Scat, 0, 1);
    fScat2Logo = THREE.MathUtils.smoothstep(fScat2Logo, 0, 1);

    for (let i = 0; i < particleData.count; i++) {
      let cx, cy, cz, cr, cg, cb;
      
      if (fScat2Logo > 0) {
        cx = THREE.MathUtils.lerp(particleData.posScat[i*3], particleData.posLogo[i*3], fScat2Logo);
        cy = THREE.MathUtils.lerp(particleData.posScat[i*3+1], particleData.posLogo[i*3+1], fScat2Logo);
        cz = THREE.MathUtils.lerp(particleData.posScat[i*3+2], particleData.posLogo[i*3+2], fScat2Logo);
        cr = THREE.MathUtils.lerp(particleData.brainColors[i*3], particleData.logoColors[i*3], fScat2Logo);
        cg = THREE.MathUtils.lerp(particleData.brainColors[i*3+1], particleData.logoColors[i*3+1], fScat2Logo);
        cb = THREE.MathUtils.lerp(particleData.brainColors[i*3+2], particleData.logoColors[i*3+2], fScat2Logo);
      } else if (fBrain2Scat > 0) {
        cx = THREE.MathUtils.lerp(particleData.posBrain[i*3], particleData.posScat[i*3], fBrain2Scat);
        cy = THREE.MathUtils.lerp(particleData.posBrain[i*3+1], particleData.posScat[i*3+1], fBrain2Scat);
        cz = THREE.MathUtils.lerp(particleData.posBrain[i*3+2], particleData.posScat[i*3+2], fBrain2Scat);
        cr = particleData.brainColors[i*3];
        cg = particleData.brainColors[i*3+1];
        cb = particleData.brainColors[i*3+2];
      } else if (fScat2Brain > 0) {
        cx = THREE.MathUtils.lerp(particleData.posScat[i*3], particleData.posBrain[i*3], fScat2Brain);
        cy = THREE.MathUtils.lerp(particleData.posScat[i*3+1], particleData.posBrain[i*3+1], fScat2Brain);
        cz = THREE.MathUtils.lerp(particleData.posScat[i*3+2], particleData.posBrain[i*3+2], fScat2Brain);
        cr = THREE.MathUtils.lerp(particleData.avatarColors[i*3], particleData.brainColors[i*3], fScat2Brain);
        cg = THREE.MathUtils.lerp(particleData.avatarColors[i*3+1], particleData.brainColors[i*3+1], fScat2Brain);
        cb = THREE.MathUtils.lerp(particleData.avatarColors[i*3+2], particleData.brainColors[i*3+2], fScat2Brain);
      } else if (fAvatar2Scat > 0) {
        cx = THREE.MathUtils.lerp(particleData.posAvatar[i*3], particleData.posScat[i*3], fAvatar2Scat);
        cy = THREE.MathUtils.lerp(particleData.posAvatar[i*3+1], particleData.posScat[i*3+1], fAvatar2Scat);
        cz = THREE.MathUtils.lerp(particleData.posAvatar[i*3+2], particleData.posScat[i*3+2], fAvatar2Scat);
        cr = particleData.avatarColors[i*3];
        cg = particleData.avatarColors[i*3+1];
        cb = particleData.avatarColors[i*3+2];
      } else if (fScat2Avatar > 0) {
        cx = THREE.MathUtils.lerp(particleData.posScat[i*3], particleData.posAvatar[i*3], fScat2Avatar);
        cy = THREE.MathUtils.lerp(particleData.posScat[i*3+1], particleData.posAvatar[i*3+1], fScat2Avatar);
        cz = THREE.MathUtils.lerp(particleData.posScat[i*3+2], particleData.posAvatar[i*3+2], fScat2Avatar);
        cr = THREE.MathUtils.lerp(particleData.coreColors[i*3], particleData.avatarColors[i*3], fScat2Avatar);
        cg = THREE.MathUtils.lerp(particleData.coreColors[i*3+1], particleData.avatarColors[i*3+1], fScat2Avatar);
        cb = THREE.MathUtils.lerp(particleData.coreColors[i*3+2], particleData.avatarColors[i*3+2], fScat2Avatar);
      } else {
        cx = THREE.MathUtils.lerp(particleData.posCore[i*3], particleData.posScat[i*3], fCore2Scat);
        cy = THREE.MathUtils.lerp(particleData.posCore[i*3+1], particleData.posScat[i*3+1], fCore2Scat);
        cz = THREE.MathUtils.lerp(particleData.posCore[i*3+2], particleData.posScat[i*3+2], fCore2Scat);
        cr = particleData.coreColors[i*3];
        cg = particleData.coreColors[i*3+1];
        cb = particleData.coreColors[i*3+2];
      }
      
      positions[i*3] = cx;
      positions[i*3+1] = cy;
      positions[i*3+2] = cz;
      
      colorsAttr.array[i*3] = cr;
      colorsAttr.array[i*3+1] = cg;
      colorsAttr.array[i*3+2] = cb;
    }
    
    posRef.current.needsUpdate = true;
    colorsAttr.needsUpdate = true;
    
    const targetX = state.pointer.x * 0.2;
    const targetY = state.pointer.y * 0.2;

    if (fScat2Logo > 0.5) {
      ref.current.rotation.y += (targetX - ref.current.rotation.y) * 0.05;
      ref.current.rotation.x += (targetY - ref.current.rotation.x) * 0.05;
      ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, -2, 0.05);
      ref.current.position.y = 0;
    } else if (fScat2Brain > 0.5 && fBrain2Scat < 0.5) {
      // Brain
      ref.current.rotation.y += (Math.sin(state.clock.elapsedTime * 0.2) * 0.1 + targetX - ref.current.rotation.y) * 0.05;
      ref.current.rotation.x += (targetY - ref.current.rotation.x) * 0.05;
      ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, -3, 0.05);
      ref.current.position.y = 0;
    } else if (fScat2Avatar > 0.5 && fAvatar2Scat < 0.5) {
      // Avatar
      ref.current.rotation.y += (Math.sin(state.clock.elapsedTime * 0.3) * 0.1 + targetX - ref.current.rotation.y) * 0.05;
      ref.current.rotation.x += (targetY - ref.current.rotation.x) * 0.05;
      ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, -2, 0.05);
      ref.current.position.y = 0;
    } else {
      // Core / Scat
      ref.current.rotation.y += (Math.sin(state.clock.elapsedTime * 0.3) * 0.1 + targetX - ref.current.rotation.y) * 0.05;
      ref.current.rotation.x += (targetY - ref.current.rotation.x) * 0.05;
      ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, -1, 0.05);
      ref.current.position.y = 0;
    }
  });

  if (!particleData) return null;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          ref={posRef}
          attach="attributes-position"
          count={particleData.count}
          array={initialPositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleData.count}
          array={particleData.coreColors}
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
      <Canvas camera={{ position: [0, -1, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <MorphingImageParticles />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
