
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Gallery = () => {
  const galleryItems = [
    { 
      type: 'image', 
      src: 'src/img/COMBOPREMIUM-HILUX-1.JPG', 
      alt: 'Antes e depois dos bancos do carro', 
      title: 'Polimento automotivo' 
    },
    { 
      type: 'image', 
      src: 'src/img/LAVAGE-DODGE-RAM-1.JPG', 
      alt: 'Polimento automotivo', 
      title: 'Lavagem detalhada' 
    },
    { 
      type: 'image', 
      src: 'src/img/HIGIENIZACAO-BANCOS-DE-COURO.jpg', 
      alt: 'Higienização de banco de couro', 
      title: 'Hidratação de Bancos de Couro' 
    },
    { 
      type: 'image', 
      src: 'src/img/LAVAGEM-MOTOR-DEPOIS.jpg', 
      alt: 'Antes e depois do motor', 
      title: 'Limpeza de Motor' 
    },
    { 
      type: 'image', 
      src: 'src/img/FAROL.jpg', 
      alt: 'Antes e depois dos faróis', 
      title: 'Polimento de Faróis' 
    },
    { 
      type: 'image', 
      src: 'src/img/HARLEY-LAVAGEM-DETALHADA-2.jpg', 
      title: 'Serviços para Motos' 
    },
  ];

  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-pitstop-darkGray mb-4">Antes e Depois</h2>
          <div className="w-20 h-1 bg-pitstop-blue mx-auto mb-6"></div>
          <p className="text-lg text-pitstop-darkGray/80 max-w-2xl mx-auto">
            Veja a transformação em nossos trabalhos realizados. A qualidade fala por si mesma.
          </p>
        </div>

        <Carousel className="max-w-5xl mx-auto">
          <CarouselContent>
            {galleryItems.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <div className="rounded-lg overflow-hidden shadow-md border border-pitstop-silver/50 h-[250px] relative group">
                    {item.type === 'image' ? (
                      <img 
                        src={item.src} 
                        alt={item.alt || item.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <iframe 
                        src={item.src} 
                        title={item.title} 
                        className="w-full h-full object-cover"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-pitstop-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <h3 className="text-white font-medium text-lg">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </section>
  );
};

export default Gallery;
