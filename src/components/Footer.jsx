import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Linkedin, Instagram, ArrowUp, Send, Check, AlertCircle } from 'lucide-react';
import DecryptText from './DecryptText';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('IDLE'); 

  // === EMAILJS CONFIGURATION ===
  const SERVICE_ID = "service_y9erk8r";   // e.g. "service_x90..."
  const TEMPLATE_ID = "template_cuxltln"; // e.g. "template_8s..."
  const PUBLIC_KEY = "FGG86M8R5es16R9CX";   // e.g. "user_Kj..."

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('SENDING');

    const templateParams = {
      user_email: email,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus('SUCCESS');
        setEmail('');
        setTimeout(() => setStatus('IDLE'), 5000);
      }, (err) => {
        console.log('FAILED...', err);
        setStatus('ERROR');
        setTimeout(() => setStatus('IDLE'), 5000);
      });
  };

  return (
    <footer id="contact" className="relative bg-black/20 backdrop-blur-xl text-white pt-32 pb-0 overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between gap-20 mb-24">
        <div className="w-full md:w-1/2 space-y-8">
          <div>
            <h3 className="text-blue-500 font-mono text-xs tracking-[0.3em] uppercase mb-4"><DecryptText text="Initiate Communication" /></h3>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">READY TO <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">JOIN THE SYSTEM?</span></h2>
          </div>

          <form onSubmit={handleSubscribe} className="relative group max-w-md">
            <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className={`relative flex items-center bg-white/5 border rounded-lg overflow-hidden backdrop-blur-sm p-1 cyber-input transition-all duration-300 focus-within:border-blue-500 ${status === 'SUCCESS' ? 'border-green-500' : status === 'ERROR' ? 'border-red-500' : 'border-white/10'}`}>
              <span className={`pl-4 font-mono text-sm ${status === 'SUCCESS' ? 'text-green-400' : status === 'ERROR' ? 'text-red-400' : 'text-blue-400'}`}>{'>'}</span>
              <input 
                type="email" 
                name="user_email" 
                placeholder="enter_email_address..." 
                className="w-full bg-transparent border-none outline-none text-white px-4 py-3 font-mono text-sm placeholder-gray-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'SUCCESS' || status === 'SENDING'}
              />
              <button 
                type="submit"
                disabled={status === 'SENDING'}
                className={`p-3 rounded transition-colors text-white ${status === 'SUCCESS' ? 'bg-green-600' : status === 'ERROR' ? 'bg-red-600' : 'bg-blue-600 hover:bg-blue-500'}`}
              >
                {status === 'SUCCESS' ? <Check size={16} /> : status === 'ERROR' ? <AlertCircle size={16} /> : <Send size={16} />}
              </button>
            </div>

            {status === 'SUCCESS' && <p className="text-green-400 text-xs font-mono mt-2 tracking-widest">TRANSMISSION RECEIVED.</p>}
            {status === 'ERROR' && <p className="text-red-400 text-xs font-mono mt-2 tracking-widest">TRANSMISSION FAILED. CHECK NETWORK.</p>}
          </form>
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-start md:items-end justify-between space-y-10">
          <div className="flex flex-col items-start md:items-end gap-2">
            {['About', 'Events', 'Members'].map((item) => (
              <button 
                key={item} 
                onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                className="text-3xl font-bold text-transparent text-stroke-white hover:text-white hover:text-stroke-0 transition-all duration-300 tracking-wider uppercase opacity-50 hover:opacity-100 hover:translate-x-2"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-4">
               {/* LinkedIn */}
               <SocialIcon 
                 href="https://www.linkedin.com/company/andropedia-club/" 
                 icon={<Linkedin size={20} />} 
               />
               {/* Instagram */}
               <SocialIcon 
                 href="https://www.instagram.com/andropedia_srm.rmp?igsh=MTIyaTA3dW9rb2UxYg==" 
                 icon={<Instagram size={20} />} 
               />
            </div>
            <button onClick={scrollToTop} className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300">
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/10 relative group cursor-default">
         <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
         <h1 className="text-[12vw] leading-none font-bold text-center tracking-tighter text-white/5 group-hover:text-white/10 transition-colors duration-500 select-none">ANDEROPEDIA</h1>
      </div>

      <div className="bg-blue-600 text-black py-2 overflow-hidden border-t border-blue-400">
        <div className="animate-scroll-text flex gap-8 font-mono text-sm font-bold tracking-widest uppercase">
           {[...Array(10)].map((_, i) => (
             <span key={i} className="flex items-center gap-8">
               <span>System Online</span><span className="w-2 h-2 bg-black rounded-full"></span>
               <span>Est. 2025</span><span className="w-2 h-2 bg-black rounded-full"></span>
               <span>Join the Revolution</span><span className="w-2 h-2 bg-black rounded-full"></span>
             </span>
           ))}
        </div>
      </div>
    </footer>
  );
};

// Updated SocialIcon to handle links
const SocialIcon = ({ icon, href }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    className="text-gray-400 hover:text-blue-400 transition-colors hover:scale-125 transform duration-200"
  >
    {icon}
  </a>
);

export default Footer;