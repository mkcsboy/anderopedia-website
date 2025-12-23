import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function FloatingLogo() {
  const meshRef = useRef();
  const texture = useTexture('/logo.png');

  useFrame((state, delta) => {
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    meshRef.current.rotation.y += delta * 0.2; 
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[4, 4]} />
      <meshStandardMaterial 
        map={texture} 
        transparent={true} 
        side={2} 
        toneMapped={false}
        emissive={[1, 1, 1]} 
        emissiveMap={texture}
        emissiveIntensity={2} 
      />
    </mesh>
  );
}

const Hero = () => {
  return (
    <div className="h-screen w-full relative">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 5, 2]} intensity={2} />
        <FloatingLogo />
        <OrbitControls enableZoom={false} />
        <EffectComposer>
          <Bloom luminanceThreshold={0} intensity={1.5} mipmapBlur />
        </EffectComposer>
      </Canvas>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 drop-shadow-lg">
          Andropedia
        </h1>
        <p className="text-blue-200 mt-4 text-sm md:text-base tracking-[0.5em] font-mono">
          SYSTEM ONLINE
        </p>
      </div>
    </div>
  );
};

export default Hero;