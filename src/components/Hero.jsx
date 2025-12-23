import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, Sparkles } from '@react-three/drei'; // <--- Added Sparkles
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { ChevronDown, Mouse } from 'lucide-react';

function FloatingLogo() {
  const meshRef = useRef();
  const texture = useTexture('/logo.png');

  useFrame((state, delta) => {
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    meshRef.current.rotation.y += delta * 0.2; 
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3, 3]} />
      <meshStandardMaterial 
        map={texture} 
        transparent={true} 
        side={2} 
        toneMapped={false}
        emissive={[1, 1, 1]} 
        emissiveMap={texture}
        emissiveIntensity={0.8} 
      />
    </mesh>
  );
}

const Hero = () => {
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="h-screen w-full relative bg-black">
      
      {/* 3D Scene */}
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1.5} />
        
        {/* === THE BUBBLES ARE HERE === */}
        <Sparkles 
           count={100} 
           scale={10} 
           size={3} 
           speed={0.4} 
           opacity={0.4} 
           color="#60a5fa" // Light Blue
        />

        <FloatingLogo />
        
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
        
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} intensity={0.5} mipmapBlur />
        </EffectComposer>
      </Canvas>

      {/* Main Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 drop-shadow-lg">
          ANDEROPEDIA
        </h1>
        <p className="text-blue-200 mt-4 text-sm md:text-base tracking-[0.5em] font-mono">
          SYSTEM ONLINE
        </p>
      </div>

      {/* Scroll Button */}
      <button 
        onClick={handleScrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 text-blue-400/80 hover:text-white transition-all duration-300 group cursor-pointer"
      >
        <span className="text-[10px] tracking-[0.3em] font-mono uppercase group-hover:tracking-[0.5em] transition-all duration-300">
          Initialize System
        </span>
        <div className="relative">
          <Mouse size={28} />
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-scroll-down"></div>
        </div>
        <ChevronDown size={20} className="animate-bounce mt-[-5px]" />
      </button>

      {/* Force Mobile Scroll CSS */}
      <style>{`
        #root canvas {
          touch-action: pan-y !important; 
        }
      `}</style>

    </div>
  );
};

export default Hero;