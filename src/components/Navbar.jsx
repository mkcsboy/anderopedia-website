import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react'; 
import DecryptText from './DecryptText';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // === SMART SCROLL LOGIC ===
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        if (currentScrollY === 0) {
          // Always show at the very top (Home)
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY) {
          // Scrolling DOWN -> Hide
          setIsVisible(false);
        } else {
          // Scrolling UP -> Show
          setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-5 flex justify-between items-center border-b border-white/10 backdrop-blur-md bg-black/20 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      
      {/* Logo */}
      <div 
        className="text-2xl font-bold tracking-tighter text-white cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ANDROPEDIA
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-300 tracking-widest uppercase">
        {['About', 'Members', 'Events', 'Gallery'].map((item) => (
          <li 
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className="hover:text-blue-400 cursor-pointer transition-colors"
          >
            <DecryptText text={item} />
          </li>
        ))}
      </ul>

      {/* Get in Touch Button */}
      <div className="hidden md:block">
        <button 
          onClick={() => scrollToSection('contact')}
          className="px-6 py-2 border border-white/20 rounded-full text-xs text-white uppercase tracking-widest hover:bg-white hover:text-black transition-all"
        >
          Get in Touch
        </button>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden text-white cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black border-b border-white/10 flex flex-col items-center py-10 gap-8 md:hidden shadow-2xl">
          {['About', 'Members', 'Events', 'Gallery'].map((item) => (
             <div key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-white uppercase tracking-widest cursor-pointer hover:text-blue-400">
               {item}
             </div>
          ))}
          <button onClick={() => scrollToSection('contact')} className="text-blue-400 uppercase tracking-widest">
            Get in Touch
          </button>
        </div>
      )}

    </nav>
  );
};

export default Navbar;