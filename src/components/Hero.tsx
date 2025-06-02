import React, { useEffect, useState } from 'react';
import { Sparkles, Zap, Star, Award } from 'lucide-react';
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
    <section id="home" className="relative h-screen flex items-center overflow-hidden pt-20">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/90 to-blue-900/80 z-1"></div>
      
      {/* Car background image with improved overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-700"
        style={{ 
          backgroundImage: `url("/img/COMBOPREMIUM-HILUX-1.JPG")`,
          filter: 'brightness(0.4) contrast(1.1) saturate(1.2)'
        }}
      ></div>
      
      {/* Animated geometric elements */}
      <div className="absolute inset-0 z-2">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pitstop-blue/20 to-pitstop-darkBlue/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pitstop-blue/20 to-blue-500/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-gradient-to-br from-pitstop-blue/20 to-pitstop-darkBlue/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-32 w-28 h-28 bg-gradient-to-br from-teal-400/20 to-pitstop-blue/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      {/* Enhanced Water effect that rises based on scroll */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-pitstop-blue/30 via-blue-400/20 to-transparent z-3 transition-all duration-500"
        style={{ 
          height: `${waterHeight}%`, 
          opacity: waterOpacity,
          backdropFilter: 'blur(2px)',
        }}
      >
        {/* Enhanced water ripples */}
        <div className="absolute inset-0 z-4">
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full border border-white/40"
              style={{ 
                width: `${Math.random() * 120 + 60}px`, 
                height: `${Math.random() * 120 + 60}px`, 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
                opacity: 0.4,
                animation: `ripple ${Math.random() * 8 + 6}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 6}s`,
                background: `linear-gradient(45deg, rgba(56, 189, 248, 0.1), rgba(147, 51, 234, 0.1))`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-5xl mx-auto text-center">
          {/* Enhanced Title with modern styling and mobile optimization */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-100 mb-4 md:mb-6 opacity-0 animate-fade-in leading-tight drop-shadow-2xl" style={{ animationDelay: '0.2s' }}>
              PITSTOP
              <br />
              <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-pitstop-blue via-blue-600 to-pitstop-darkBlue bg-clip-text text-transparent font-bold">
                ESTÉTICA AUTOMOTIVA
              </span>
            </h1>
          </div>
          
          {/* Enhanced Description with mobile optimization */}
          <div className="max-w-4xl mx-auto mb-8 md:mb-10">
            <p className="text-xl md:text-2xl lg:text-3xl text-white font-bold mb-4 md:mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              🚗 <span className="bg-gradient-to-r from-pitstop-blue to-pitstop-darkBlue bg-clip-text text-transparent">Cuidado Profissional</span> para seu Veículo ⚡
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <p className="text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed mb-3 md:mb-4">
                🏆 A <strong className="text-pitstop-blue">Pitstop Estética Automotiva</strong> oferece serviços completos para carros e motos
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-sm md:text-base text-gray-200">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-pitstop-blue flex-shrink-0" />
                  <span>Lavagem Detalhada</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-pitstop-blue flex-shrink-0" />
                  <span>Polimento & Cristalização</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-pitstop-blue flex-shrink-0" />
                  <span>Higienização Completa</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced CTA Buttons with mobile optimization */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Button asChild className="group relative overflow-hidden bg-gradient-to-r from-pitstop-blue via-pitstop-darkBlue to-blue-800 hover:from-pitstop-darkBlue hover:via-blue-800 hover:to-pitstop-blue text-white text-lg md:text-xl py-3 md:py-4 px-8 md:px-10 rounded-xl md:rounded-2xl shadow-2xl hover:shadow-pitstop-blue/25 transform hover:scale-105 transition-all duration-300 border-0 min-h-[48px]">
              <a href="#booking" className="relative z-10 flex items-center justify-center space-x-2 md:space-x-3">
                <span>🚗 Agendar Serviço</span>
                <Zap className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform duration-300" />
              </a>
            </Button>
            <Button variant="outline" asChild className="group relative overflow-hidden bg-white/15 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white/25 hover:border-white/50 text-lg md:text-xl py-3 md:py-4 px-8 md:px-10 rounded-xl md:rounded-2xl shadow-2xl hover:shadow-white/10 transform hover:scale-105 transition-all duration-300 min-h-[48px]">
              <a href="/servicos" className="relative z-10 flex items-center justify-center space-x-2 md:space-x-3">
                <span>📋 Nossos Serviços</span>
                <Star className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform duration-300" />
              </a>
            </Button>
          </div>

          {/* Enhanced Stats Section with mobile optimization */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl p-4 md:p-6 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1 md:mb-2">500+</div>
              <div className="text-white text-xs md:text-sm">Clientes Satisfeitos</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl p-4 md:p-6 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-pitstop-blue mb-1 md:mb-2">3+</div>
              <div className="text-white text-xs md:text-sm">Anos de Experiência</div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;
