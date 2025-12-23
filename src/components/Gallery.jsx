import React, { useState } from 'react';
import DecryptText from './DecryptText';
import { X, Maximize2 } from 'lucide-react'; 
import { galleryData } from '../data/galleryData'; // <--- IMPORT LOCAL DATA

const Gallery = () => {
  const [activeItem, setActiveItem] = useState(null);
  
  const openModal = (img) => setActiveItem(img);
  const closeModal = () => setActiveItem(null);

  const midPoint = Math.ceil(galleryData.length / 2);
  const row1 = galleryData.slice(0, midPoint);
  const row2 = galleryData.slice(midPoint);

  return (
    <section id="gallery" className="min-h-screen py-24 relative z-10 bg-black overflow-hidden border-t border-white/10 flex flex-col justify-center">
      {/* ... (Keep background and header code same as before) ... */}

      <div className="relative z-10 w-full">
        <div className="text-center mb-16 px-4">
            <h3 className="text-4xl md:text-6xl font-bold font-mono text-white tracking-widest uppercase mb-4">
              <DecryptText text="VISUAL_DATABASE" />
            </h3>
            <p className="text-xs text-blue-500 font-mono tracking-[0.3em] uppercase">
              // ENCRYPTED STREAM DETECTED
            </p>
        </div>

        <div className="mb-8 rotate-1 hover:rotate-0 transition-transform duration-500">
           <MarqueeRow images={row1} direction="left" speed={40} onClick={openModal} />
        </div>

        <div className="-rotate-1 hover:rotate-0 transition-transform duration-500">
           <MarqueeRow images={row2} direction="right" speed={50} onClick={openModal} />
        </div>
      </div>

      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200" onClick={closeModal}>
          <div className="relative max-w-7xl max-h-screen">
            <img src={activeItem} alt="Gallery Full" className="max-w-full max-h-[90vh] object-contain shadow-[0_0_50px_rgba(59,130,246,0.2)] rounded-sm border border-white/10" />
            <button className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors">
              <X size={32} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

// ... (Keep MarqueeRow component exactly as it was)
const MarqueeRow = ({ images, direction, speed, onClick }) => {
  const displayImages = [...images, ...images, ...images]; 

  return (
    <div className="relative flex overflow-hidden group">
      <div 
        className="flex gap-6 animate-marquee hover:[animation-play-state:paused]"
        style={{ 
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
          animationDuration: `${speed}s` 
        }}
      >
        {displayImages.map((img, i) => (
          <div 
            key={i} 
            onClick={() => onClick(img)}
            className="relative w-[300px] h-[200px] flex-shrink-0 bg-black border border-white/10 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:border-blue-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] group-hover:opacity-50 hover:!opacity-100"
          >
            <img 
              src={img} 
              alt="gallery-item" 
              loading="lazy"
              className="w-full h-full object-contain p-2" 
            />
            <div className="absolute top-2 right-2 text-blue-400 opacity-0 hover:opacity-100 transition-opacity">
               <Maximize2 size={16} />
            </div>
            {/* ... (Keep decorative borders) ... */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;