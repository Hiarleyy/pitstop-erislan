import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Camera, Play, Eye, Sparkles } from 'lucide-react';

const Gallery = () => {
  const galleryItems = [
    { 
      type: 'image', 
      src: '/img/COMBOPREMIUM-HILUX-1.JPG', 
      alt: 'Antes e depois dos bancos do carro', 
      title: '✨ Polimento Premium',
      category: 'Polimento',
      description: 'Transformação completa com acabamento impecável'
    },
    { 
      type: 'image', 
      src: '/img/LAVAGE-DODGE-RAM-1.JPG', 
      alt: 'Polimento automotivo', 
      title: '🚿 Lavagem Detalhada',
      category: 'Lavagem',
      description: 'Limpeza profunda e cuidadosa'
    },
    { 
      type: 'image', 
      src: '/img/HIGIENIZACAO-BANCOS-DE-COURO.jpg', 
      alt: 'Higienização de banco de couro', 
      title: '🪑 Hidratação de Couro',
      category: 'Higienização',
      description: 'Cuidado especializado para bancos de couro'
    },
    { 
      type: 'image', 
      src: '/img/LAVAGEM-MOTOR-DEPOIS.jpg', 
      alt: 'Antes e depois do motor', 
      title: '🔧 Limpeza de Motor',
      category: 'Motor',
      description: 'Motor limpo e protegido'
    },
    { 
      type: 'image', 
      src: '/img/FAROL.jpg', 
      alt: 'Antes e depois dos faróis', 
      title: '💡 Polimento de Faróis',
      category: 'Faróis',
      description: 'Restauração e transparência perfeita'
    },
    { 
      type: 'image', 
      src: '/img/HARLEY-LAVAGEM-DETALHADA-2.jpg', 
      title: '🏍️ Serviços para Motos',
      category: 'Motos',
      description: 'Cuidado especializado para motocicletas'
    },
  ];

  return (
    <section id="gallery" className="relative py-20 overflow-hidden">
      {/* Enhanced Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white via-transparent to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-pitstop-blue/10 to-pitstop-darkBlue/10 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-pitstop-blue/10 to-blue-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-32 left-20 w-20 h-20 bg-gradient-to-br from-pitstop-darkBlue/10 to-blue-600/10 rounded-full blur-xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="flex justify-center items-center mb-6">
            <div className="flex items-center space-x-3 bg-gradient-to-r from-pitstop-blue/10 to-pitstop-darkBlue/10 backdrop-blur-sm rounded-full px-8 py-3 border border-blue-200/30">
              <Camera className="w-6 h-6 text-pitstop-blue" />
              <span className="text-gray-700 font-semibold">Galeria de Trabalhos</span>
              <Sparkles className="w-6 h-6 text-pitstop-darkBlue" />
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-pitstop-blue to-pitstop-darkBlue mb-6">
            NOSSOS TRABALHOS
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-pitstop-blue via-pitstop-darkBlue to-blue-800 mx-auto mb-8 rounded-full shadow-lg"></div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            ✨ Conheça nosso trabalho através de <strong className="text-pitstop-blue">exemplos reais</strong> dos serviços realizados em diversos tipos de veículos
          </p>
        </div>

        {/* Enhanced Carousel */}
        <Carousel className="max-w-7xl mx-auto">
          <CarouselContent className="-ml-4 md:-ml-6">
            {galleryItems.map((item, index) => (
              <CarouselItem key={index} className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="h-full">
                  <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 h-[480px] transform hover:-translate-y-2">
                    {/* Image Container */}
                    <div className="relative h-[320px] overflow-hidden">
                      {item.type === 'image' ? (
                        <>
                          <img 
                            src={item.src} 
                            alt={item.alt || item.title} 
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                          {/* Enhanced Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                            {item.category || 'Serviço'}
                          </div>
                          
                          {/* View Icon */}
                          <div className="absolute top-4 right-4 bg-blue-500/90 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            <Eye size={20} />
                          </div>
                        </>
                      ) : (
                        <>
                          <iframe 
                            src={item.src} 
                            title={item.title} 
                            className="w-full h-full object-cover"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          ></iframe>
                          <div className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-sm text-white p-2 rounded-full">
                            <Play size={20} />
                          </div>
                        </>
                      )}
                      
                      {/* Floating Title */}
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <h3 className="text-white font-bold text-xl drop-shadow-xl mb-2">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-white/90 text-sm drop-shadow-lg">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Enhanced Content Section */}
                    <div className="p-6 bg-gradient-to-br from-white to-gray-50">
                      <h3 className="text-gray-800 font-bold text-xl mb-2 group-hover:text-pitstop-blue transition-colors duration-300">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      )}
                      
                      {/* Progress bar animation */}
                      <div className="mt-4 w-0 group-hover:w-full h-1 bg-gradient-to-r from-pitstop-blue to-pitstop-darkBlue rounded-full transition-all duration-700 delay-200"></div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Enhanced Navigation */}
          <CarouselPrevious className="left-4 bg-white/95 hover:bg-white shadow-2xl border-gray-200 hover:border-pitstop-blue/50 text-gray-700 hover:text-pitstop-blue transition-all duration-300 transform hover:scale-110" />
          <CarouselNext className="right-4 bg-white/95 hover:bg-white shadow-2xl border-gray-200 hover:border-pitstop-blue/50 text-gray-700 hover:text-pitstop-blue transition-all duration-300 transform hover:scale-110" />
        </Carousel>
        
        {/* Enhanced CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-pitstop-blue via-pitstop-darkBlue to-blue-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              🌟 Gostou do que viu?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Entre em contato conosco e agende seu serviço para ter o mesmo resultado incrível!
            </p>
            <div className="flex justify-center">
              <a 
                href="#booking"
                className="inline-flex items-center justify-center space-x-2 bg-white text-pitstop-blue px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span>📅 Agendar Agora</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
