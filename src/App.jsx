import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Members from './components/Members';
import ParticleCursor from './components/ParticleCursor';
import Events from './components/Events';
import Gallery from './components/Gallery'; // <--- IMPORT THIS
import Footer from './components/Footer';
import Preloader from './components/Preloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <main className="bg-black min-h-screen text-white relative overflow-hidden">
      
      {isLoading ? (
        <Preloader onComplete={handleLoadingComplete} />
      ) : (
        <div className="relative z-10 animate-fade-in">
          <ParticleCursor />
          <Navbar />
          <Hero />
          <About />
          <Members />
          <Events />
          <Gallery />  {/* <--- ADD THIS HERE */}
          <Footer />
        </div>
      )}

    </main>
  );
}

export default App;