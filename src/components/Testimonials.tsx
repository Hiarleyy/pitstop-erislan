
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      testimonial: "Excelente serviço! Meu carro ficou como novo. A equipe é muito profissional e atenciosa. Recomendo a todos.",
      rating: 5,
      service: "Lavagem Completa"
    },
    {
      name: "João Santos",
      testimonial: "Fiz a higienização do meu sofá que estava muito manchado e o resultado foi incrível. Trabalho de primeira qualidade.",
      rating: 5,
      service: "Higienização de Sofá"
    },
    {
      name: "Ana Oliveira",
      testimonial: "Já utilizei diversos serviços da PitStop e sempre saio satisfeita. O atendimento é impecável e os resultados surpreendem.",
      rating: 5,
      service: "Polimento Automotivo"
    },
    {
      name: "Pedro Almeida",
      testimonial: "A higienização do interior do meu carro ficou perfeita. Removeram manchas que eu achava que não sairiam mais.",
      rating: 4,
      service: "Higienização Interna"
    },
    {
      name: "Carla Rodrigues",
      testimonial: "Meu colchão estava com manchas e depois da limpeza ficou como novo. Recomendo demais o serviço.",
      rating: 5,
      service: "Limpeza de Colchão"
    }
  ];

  return (
    <section id="testimonials" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-pitstop-darkGray mb-4">Depoimentos</h2>
          <div className="w-20 h-1 bg-pitstop-blue mx-auto mb-6"></div>
          <p className="text-lg text-pitstop-darkGray/80 max-w-2xl mx-auto">
            Veja o que nossos clientes dizem sobre nossos serviços.
          </p>
        </div>

        <Carousel className="max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <Card className="border border-pitstop-silver/50 shadow-sm h-full">
                  <CardContent className="p-6">
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <p className="text-pitstop-darkGray/80 mb-4 italic">"{testimonial.testimonial}"</p>
                    <div>
                      <p className="font-semibold text-pitstop-darkGray">{testimonial.name}</p>
                      <p className="text-sm text-pitstop-darkGray/70">{testimonial.service}</p>
                    </div>
                  </CardContent>
                </Card>
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

export default Testimonials;
