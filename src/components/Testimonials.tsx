
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, User } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      testimonial: "Excelente serviço! Meu carro ficou como novo. A equipe é muito profissional e atenciosa. Recomendo a todos.",
      rating: 5,
      service: "Lavagem Completa",
      avatar: "M",
      location: "Bragança - PA"
    },
    {
      name: "João Santos",
      testimonial: "Fiz a higienização do meu sofá que estava muito manchado e o resultado foi incrível. Trabalho de primeira qualidade.",
      rating: 5,
      service: "Higienização de Sofá",
      avatar: "J",
      location: "Aldeia - PA"
    },
    {
      name: "Ana Oliveira",
      testimonial: "Já utilizei diversos serviços da PitStop e sempre saio satisfeita. O atendimento é impecável e os resultados surpreendem.",
      rating: 5,
      service: "Polimento Automotivo",
      avatar: "A",
      location: "Bragança - PA"
    },
    {
      name: "Pedro Almeida",
      testimonial: "A higienização do interior do meu carro ficou perfeita. Removeram manchas que eu achava que não sairiam mais.",
      rating: 4,
      service: "Higienização Interna",
      avatar: "P",
      location: "Centro - PA"
    },
    {
      name: "Carla Rodrigues",
      testimonial: "Meu colchão estava com manchas e depois da limpeza ficou como novo. Recomendo demais o serviço.",
      rating: 5,
      service: "Limpeza de Colchão",
      avatar: "C",
      location: "Aldeia - PA"
    },
    {
      name: "Roberto Costa",
      testimonial: "Polimento da minha moto ficou incrível! Brilho que nunca tinha visto antes. Pessoal muito competente.",
      rating: 5,
      service: "Polimento de Moto",
      avatar: "R",
      location: "Bragança - PA"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 via-blue-25 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full -translate-y-48 -translate-x-48"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-pitstop-blue/10 rounded-full translate-y-32 translate-x-32"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-pitstop-darkGray mb-6">
            💬 Depoimentos de Clientes
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-pitstop-blue via-pitstop-darkBlue to-blue-800 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Veja o que nossos clientes dizem sobre a qualidade dos nossos serviços e 
            <span className="font-semibold text-pitstop-blue"> experiência excepcional</span> que proporcionamos.
          </p>
        </div>

        <Carousel className="max-w-7xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="group bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 hover:border-blue-300 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 h-full">
                  <CardContent className="p-6 h-full flex flex-col relative">
                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4 text-blue-200 group-hover:text-blue-300 transition-colors">
                      <Quote size={24} className="rotate-180" />
                    </div>
                    
                    {/* Rating Stars */}
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}
                        />
                      ))}
                    </div>
                    
                    {/* Testimonial Text */}
                    <blockquote className="text-gray-700 mb-6 italic text-lg leading-relaxed flex-1 group-hover:text-gray-800 transition-colors">
                      "{testimonial.testimonial}"
                    </blockquote>
                    
                    {/* Client Info */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-200/50">
                      <div className="w-12 h-12 bg-gradient-to-br from-pitstop-blue to-pitstop-darkBlue rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {testimonial.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 text-lg group-hover:text-pitstop-blue transition-colors">
                          {testimonial.name}
                        </h4>
                        <div className="flex flex-col text-sm text-gray-500">
                          <span className="font-medium text-blue-600">{testimonial.service}</span>
                          <span className="flex items-center gap-1">
                            📍 {testimonial.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-pitstop-blue/5 to-pitstop-darkBlue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-blue-600 shadow-lg" />
          <CarouselNext className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-blue-600 shadow-lg" />
        </Carousel>
        
        {/* Statistics Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600 font-medium">Clientes Satisfeitos</div>
          </div>
          <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
            <div className="text-3xl font-bold text-pitstop-blue mb-2">4.9⭐</div>
            <div className="text-gray-600 font-medium">Avaliação Média</div>
          </div>
          <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">3+</div>
            <div className="text-gray-600 font-medium">Anos de Experiência</div>
          </div>
          <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
            <div className="text-3xl font-bold text-pitstop-blue mb-2">100%</div>
            <div className="text-gray-600 font-medium">Garantia de Qualidade</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
