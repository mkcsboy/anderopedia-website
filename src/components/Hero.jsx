import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function FloatingLogo() {
  const meshRef = useRef();
  const texture = useTexture('/logo.png');

  useFrame((state, delta) => {
    // Keep the gentle floating animation
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    // Slow auto-rotation
    meshRef.current.rotation.y += delta * 0.2; 
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[6, 6]} />
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
      
      {/* FIX: Added style={{ touchAction: 'pan-y' }} 
         This tells the browser: "Allow vertical scrolling (pan-y), but capture horizontal swipes for the 3D model."
      */}
      <Canvas 
        camera={{ position: [0, 0, 5] }} 
        style={{ touchAction: 'pan-y' }}
        className="touch-pan-y"
      >
        <ambientLight intensity={1} />
        <directionalLight position={[2, 5, 2]} intensity={2} />
        
        <FloatingLogo />
        
        {/* FIX: Added enablePan={false} to stop users from accidentally dragging the logo off-screen.
           enableZoom={false} prevents zooming which also messes up scrolling.
        */}
        <OrbitControls enableZoom={false} enablePan={false} />
        
        <EffectComposer>
          <Bloom luminanceThreshold={0} intensity={1.5} mipmapBlur />
        </EffectComposer>
      </Canvas>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 drop-shadow-lg">
          ANDEROPEDIA
        </h1>
        <p className="text-blue-200 mt-4 text-sm md:text-base tracking-[0.5em] font-mono">
          SYSTEM ONLINE
        </p>
      </div>
    </div>
  );
};

export default Hero;