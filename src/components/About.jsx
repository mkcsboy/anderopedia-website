import React, { useRef, useState } from 'react';
import DecryptText from './DecryptText';
import { Cpu, Globe, Zap, Database } from 'lucide-react';

const About = () => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5; 
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 }); 
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20 px-4 relative z-10 perspective-container overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
           style={{ 
             backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', 
             backgroundSize: '100% 100%, 30px 30px, 30px 30px' 
           }}>
      </div>

      {/* === THE 3D CARD === */}
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="cyber-card w-full max-w-6xl relative rounded-3xl overflow-hidden transition-transform duration-100 ease-out"
        style={{ 
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` 
        }}
      >
        <div className="corner-marker top-4 left-4 border-t-2 border-l-2"></div>
        <div className="corner-marker top-4 right-4 border-t-2 border-r-2"></div>
        <div className="corner-marker bottom-4 left-4 border-b-2 border-l-2"></div>
        <div className="corner-marker bottom-4 right-4 border-b-2 border-r-2"></div>

        <div className="flex flex-col md:flex-row h-full">
          
          {/* === LEFT: IMAGE === */}
          <div className="w-full md:w-2/5 relative min-h-[400px] overflow-hidden group border-r border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" 
              alt="Cyberpunk City" 
              className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-blue-900/30 mix-blend-overlay"></div>
            <div className="scanner-line"></div>
            
            <div className="absolute bottom-6 left-6 font-mono text-xs text-blue-300">
               <p className="mb-1">TARGET: SYSTEM_CORE</p>
               <p>STATUS: <span className="animate-pulse text-green-400">ONLINE</span></p>
            </div>
          </div>

          {/* === RIGHT: CONTENT === */}
          <div className="w-full md:w-3/5 p-8 md:p-12 relative bg-black/40">
            
            <div className="flex items-center gap-4 mb-8 opacity-50">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <p className="font-mono text-xs tracking-[0.3em] uppercase">Confidential Data</p>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white tracking-tight">
               <DecryptText text="THE ARCHITECTURE" />
            </h2>

            <div className="space-y-6 text-gray-300 leading-relaxed font-light text-lg">
              <p>
                <span className="text-blue-400 font-bold">{'>'}</span> ANDROPEDIA is not just a club; it is a <span className="text-white font-medium">Gateway to technological excellence</span>. We bridge the gap between theoretical inputs and industry-grade outputs.
              </p>
              <p>
                 <span className="text-blue-400 font-bold">{'>'}</span> Operating across a multidisciplinary matrix—Technical, Design, Media, PR, and R&D—we equip members with next-gen capabilities in Cloud Computing, AI, and Machine Learning via immersive protocols like SKYLINX.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-12 pt-8 border-t border-white/10">
                {/* Icon: CPU -> Represents Technical Skills */}
                <StatItem icon={<Cpu size={20} />} label="Core Protocols" value="AI & Cloud" />
    
                {/* Icon: Globe -> Represents the Multidisciplinary nature */}
                <StatItem icon={<Globe size={20} />} label="Domain Scope" value="Multidisciplinary" />
    
                {/* Icon: Zap -> Represents the speed of learning/events */}
                <StatItem icon={<Zap size={20} />} label="Skill Velocity" value="Accelerated" />
    
                {/* Icon: Database -> Represents the concrete portfolios built */}
                <StatItem icon={<Database size={20} />} label="Portfolio Status" value="Industry-Verified" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 group cursor-default">
    <div className="p-2 bg-white/5 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-black transition-colors duration-300">
      {icon}
    </div>
    <div>
      <div className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">{label}</div>
      <div className="text-white font-bold">{value}</div>
    </div>
  </div>
);

export default About;