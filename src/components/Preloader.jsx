import React, { useState, useEffect } from 'react';

const Preloader = ({ onComplete }) => {
  const [text, setText] = useState("INITIALIZING SYSTEM...");

  // The Boot Sequence Text (Keeps the sci-fi feel)
  const steps = [
    { time: 0, t: "INITIALIZING SYSTEM..." },
    { time: 1000, t: "LOADING KERNEL..." },
    { time: 2000, t: "DECRYPTING ASSETS..." },
    { time: 3000, t: "GRANTING ACCESS..." },
  ];

  useEffect(() => {
    // 1. Text Animation Logic
    const timeouts = steps.map(step => 
      setTimeout(() => setText(step.t), step.time)
    );

    // 2. Finish loading after 4 seconds (matches the text sequence)
    const finishTimer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center text-white font-mono cursor-wait">
      
      {/* BACKGROUND GRID (Subtle Texture) */}
      <div className="absolute inset-0 z-[-1] opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* === THE CIRCULAR LOADER === */}
      <div className="relative flex items-center justify-center w-40 h-40 mb-8">
        
        {/* 1. The Spinning Ring */}
        <div className="absolute inset-0 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
        
        {/* 2. Counter-Rotating Inner Ring (Optional Detail) */}
        <div className="absolute inset-2 border-2 border-white/5 border-b-purple-500 rounded-full animate-spin-reverse opacity-50"></div>

        {/* 3. Your Logo in the Center */}
        <div className="relative z-10 w-24 h-24 p-2 bg-black rounded-full border border-white/5 flex items-center justify-center animate-pulse">
           {/* Ensure logo.png is in your public folder */}
           <img 
             src="/logo.png" 
             alt="Loading..." 
             className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" 
           />
        </div>

      </div>

      {/* === STATUS TEXT === */}
      <div className="text-sm tracking-[0.3em] text-blue-400 uppercase animate-pulse">
        {text}
      </div>

      {/* Decorative Loading Bar at Bottom */}
      <div className="absolute bottom-10 w-64 h-1 bg-gray-900 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 animate-loading-bar"></div>
      </div>

    </div>
  );
};

export default Preloader;