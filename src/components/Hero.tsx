import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isWiping, setIsWiping] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Activate wiping effect when scrolling starts
      if (window.scrollY > 50 && window.scrollY < 400) {
        setIsWiping(true);
      } else if (window.scrollY > 400) {
        setIsWiping(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate water height based on scroll position (0-400px)
  const waterHeight = Math.min(100, Math.max(0, (scrollY / 4)));
  // Calculate water opacity
  const waterOpacity = Math.min(0.3, Math.max(0, scrollY / 300));
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pitstop-black to-pitstop-darkBlue opacity-90 z-5"></div>
      
      {/* Car background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 opacity-50 transition-opacity duration-300"
        style={{ backgroundImage: `url("/img/COMBOPREMIUM-HILUX-1.JPG")` }}
      ></div>
      
      {/* Water effect that rises based on scroll */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-300 to-blue-100 z-2 transition-all duration-300"
        style={{ 
          height: `${waterHeight}%`, 
          opacity: waterOpacity,
          backdropFilter: 'blur(1px)',
        }}
      >
        
        {/* Water ripples */}
        <div className="absolute inset-0 z-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full border-2 border-white border-opacity-30"
              style={{ 
                width: `${Math.random() * 100 + 50}px`, 
                height: `${Math.random() * 100 + 50}px`, 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
                opacity: 0.3,
                animation: `ripple ${Math.random() * 6 + 4}s linear infinite`,
                animationDelay: `${Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4 z-5 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Estética Automotiva de Excelência
          </h1>
            <p className="text-lg md:text-xl text-pitstop-silver mb-8 opacity-0 animate-fade-in px-4 py-2 rounded-lg bg-black/5 inline-block" style={{ animationDelay: '0.4s' }}>
            Pitstop Estética Automotiva estética automotiva oferece uma variedade de serviços para cuidar da beleza e conservação do seu veículo, tanto no exterior quanto no interior, seja carro ou seja moto. Alguns dos nossos serviços incluem lavagem detalhada, lavagem de motor, lavagem de chassis, polimento, cristalização ou vitrificação da pintura, higienização interna, impermeabilização de estofados, restauração de faróis.

            </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button asChild className="btn-gradient">
              <a href="#booking">Agendar Serviço</a>
            </Button>
            <Button variant="outline" asChild className="bg-transparent text-white border-white hover:bg-white/10">
              <a href="/servicos">Nossos Serviços</a>
            </Button>
          </div>
        </div>
      </div>
      
      <a 
        href="#services" 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-5"
      >
        <ChevronDown size={40} />
      </a>
    </section>
  );
};

export default Hero;
