import React, { useState, useEffect, useRef } from 'react';
import DecryptText from './DecryptText';
import { X } from 'lucide-react'; 
import { eventsData } from '../data/eventsData'; // <--- IMPORT LOCAL DATA

const Events = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);

  // === SORT EVENTS (Optional since data is static now) ===
  const sortedEvents = [...eventsData].sort((a, b) => {
     // Assuming date is "DD-MM" and year is "YYYY"
     const dateStrA = `${a.date.split("-").reverse().join("-")} ${a.year}`; 
     const dateStrB = `${b.date.split("-").reverse().join("-")} ${b.year}`;
     return new Date(dateStrA) - new Date(dateStrB);
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      let scrollValue = 1 - (top / (windowHeight * 0.8));
      if (scrollValue < 0) scrollValue = 0;
      if (scrollValue > 1) scrollValue = 1;
      setProgress(scrollValue);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openEvent = (event) => setActiveItem(event);
  const closeModal = () => setActiveItem(null);

  return (
    <section id="events" className="min-h-screen py-24 px-4 relative z-10 bg-black overflow-hidden">
      {/* ... (Background effects same as before) ... */}

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="mb-24 text-center space-y-4">
          <p className="text-blue-500 font-mono text-xs tracking-[0.3em] uppercase">
            <DecryptText text="System Logs" />
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter uppercase">
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
               <DecryptText text="TIMELINE & ARCHIVES" />
             </span>
          </h2>
        </div>

        <div ref={containerRef} className="mb-10 relative">
           <div 
             className="absolute top-32 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent z-0 origin-left"
             style={{ 
               transform: `scaleX(${progress})`,
               transition: 'transform 0.1s linear' 
             }}
           ></div>

           <div className="flex gap-12 overflow-x-auto custom-scrollbar pb-12 pt-20 px-8 justify-center w-full relative z-10">
              {sortedEvents.map((event, index) => {
                const triggerPoint = (index + 1) / (sortedEvents.length + 1);
                const isLit = progress > triggerPoint;

                return (
                  <div key={event.id} onClick={() => openEvent(event)} className="relative group flex flex-col items-center cursor-pointer flex-shrink-0 min-w-[140px]">
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-2 pointer-events-none">
                        <div className="bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[10px] px-2 py-1 rounded font-mono uppercase tracking-widest backdrop-blur-md">
                          {event.date}
                        </div>
                    </div>

                    <div className={`w-24 h-24 rounded-full border flex items-center justify-center relative z-20 transition-all duration-700 ${isLit ? 'bg-black border-blue-500/80 shadow-[0_0_30px_rgba(59,130,246,0.6)]' : 'bg-black border-white/10'}`}>
                        <div className={`w-14 h-14 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center p-3 shadow-lg relative z-30 transition-transform duration-700 ${isLit ? 'scale-110' : 'scale-100'} group-hover:scale-110`}>
                          <img src={event.logo} alt="logo" className="w-full h-full object-contain block" />
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className={`text-xs font-mono transition-colors duration-500 uppercase tracking-widest ${isLit ? 'text-blue-400' : 'text-gray-500'}`}>
                          {event.title}
                        </p>
                    </div>
                  </div>
                );
              })}
           </div>
        </div>
      </div>
      
      {/* ... (Keep Modal code same as before) ... */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeModal}></div>
          <div className="relative z-10 w-full max-w-4xl bg-black/90 border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in zoom-in fade-in duration-300">
            <button onClick={closeModal} className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
              <X size={24} />
            </button>
            <div className="flex flex-col md:flex-row h-[600px] md:h-[500px]">
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative group">
                {/* CHECKING LOGO AS FALLBACK FOR IMAGE */}
                <img src={activeItem.image || activeItem.logo} alt={activeItem.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              </div>
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white/5">
                  <h3 className="text-3xl font-bold text-white mb-2">{activeItem.title}</h3>
                  <p className="text-blue-400 font-mono text-sm mb-6">{activeItem.date} {activeItem.year}</p>
                  <p className="text-gray-300 leading-relaxed text-sm">{activeItem.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;