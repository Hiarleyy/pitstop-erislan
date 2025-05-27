
import React from 'react';
import { Car, Home, ThumbsUp, Timer, Sparkles, Shield, Wrench, Droplet, Bike } from 'lucide-react';

const Services = () => {
  const serviceCategories = [
    {
    




      name: "Higienização e Limpeza",
      icon: <Droplet className="text-pitstop-blue mb-4" size={40} />,
      services: [
        
        {
          title: "Higienização interna com banco de tecido",
          description: "Processo completo de limpeza para eliminar sujeiras, odores e ácaros de bancos de tecido.",
          sizes: "Pequeno (R$ 250), Médio (R$ 280), Grande (R$ 300)"
        },
        {
          title: "Higienização interna com banco de couro",
          description: "Processo especializado para limpeza e conservação de estofados em couro.",
          sizes: "Pequeno (R$ 200), Médio (R$ 230), Grande (R$ 250)"
        }
      ]
    },
    {
      name: "Lavagens",
      icon : <Wrench className="text-pitstop-blue mb-4" size={40} />,
      services: [
        {
          title: "Lavagem completa",
          description: "Limpeza minuciosa interna e externa do seu veículo.",
          sizes: "Pequeno (R$ 50), Médio (R$ 60), Grande (R$ 70)"
        },
        {
          title: "Lavagem técnica interna",
          description: "Limpeza profunda de toda parte interna do veículo.",
          sizes: "Pequeno (R$ 100), Médio (R$ 110), Grande (R$ 120)"
        },
      ]
    },
    {
      name: "Estética da Pintura",
      icon: <Sparkles className="text-pitstop-blue mb-4" size={40} />,
      services: [
        {
          title: "Polimento comercial",
          description: "Tratamento básico para melhorar o brilho da pintura.",
          sizes: "Pequeno (R$ 200), Médio (R$ 250), Grande (R$ 300)"
        },
        {
          title: "Polimento técnico (1 estágio)",
          description: "Remoção de riscos superficiais e restauração do brilho da pintura.",
          sizes: "Pequeno (R$ 300), Médio (R$ 350), Grande (R$ 400)"
        },
        {
          title: "Polimento técnico (2 estágios)",
          description: "Tratamento avançado para remoção de riscos mais profundos e restauração completa do brilho.",
          sizes: "Pequeno (R$ 400), Médio (R$ 450), Grande (R$ 500)"
        },
        {
          title: "Polimento técnico completo",
          description: "Tratamento completo para recuperação total da pintura.",
          sizes: "Pequeno (R$ 300), Médio (R$ 400), Grande (R$ 500)"
        },
        {
          title: "Descontaminação da pintura + cera",
          description: "Remoção de contaminantes impregnados na pintura e proteção com cera de carnaúba.",
          sizes: "Pequeno (R$ 150), Médio (R$ 180), Grande (R$ 200)"
        }
      ]
    },
    {
      name: "Proteção de Pintura",
      icon: <Shield className="text-pitstop-blue mb-4" size={40} />,
      services: [
        {
          title: "Vitrificação (até 3 anos)",
          description: "Proteção premium com durabilidade de até 3 anos, aumentando o brilho e facilitando a limpeza.",
          sizes: "Pequeno (R$ 750), Médio (R$ 850), Grande (R$ 1000)"
        },
        {
          title: "Vitrificação Vonixx",
          description: "Proteção premium com tecnologia Vonixx para máxima durabilidade e brilho intenso.",
          sizes: "Pequeno (R$ 1300), Médio (R$ 1500), Grande (R$ 1700)"
        },
        {
          title: "Vitrificação Car Pro",
          description: "Proteção de alto desempenho com tecnologia Car Pro para proteção superior.",
          sizes: "Pequeno (R$ 1800), Médio (R$ 2200), Grande (R$ 2500)"
        },
        {
          title: "Selante sintético (6 meses)",
          description: "Proteção intermediária com durabilidade de até 6 meses.",
          sizes: "Pequeno (R$ 200), Médio (R$ 250), Grande (R$ 300)"
        }
      ]
    },
    {
      name: "Interiores",
      icon: <Car className="text-pitstop-blue mb-4" size={40} />,
      services: [
        {
          title: "Hidratação de couro",
          description: "Tratamento especial para hidratar e proteger bancos e estofados em couro.",
          sizes: "Pequeno (R$ 100), Médio (R$ 120), Grande (R$ 150)"
        },
        {
          title: "Lavagem de teto",
          description: "Limpeza profunda do forro do teto.",
          sizes: "Pequeno (R$ 100), Médio (R$ 130), Grande (R$ 150)"
        },
        {
          title: "Lavagem de banco (individual)",
          description: "Limpeza específica de um único banco.",
          sizes: "Unidade (R$ 60)"
        },
        {
          title: "Lavagem de carpete + forro",
          description: "Limpeza completa de carpetes e forros internos.",
          sizes: "Pequeno (R$ 150), Médio (R$ 180), Grande (R$ 200)"
        }
      ]
    },
    {
      name: "Serviços para Motos",
      icon: <Bike className="text-pitstop-blue mb-4" size={40} />,
      services: [
        {
          title: "Lavagem simples",
          description: "Limpeza básica para diferentes modelos de motocicletas.",
          sizes: "Biz, Pop (R$ 20), Titan, Fan, Bros 125/150/160 (R$ 25), Fazer, CB, Twister, XRE 190/250/300 (R$ 30), 300-600cc (R$ 40), Acima de 600cc (R$ 50)"
        },
        {
          title: "Lavagem detalhada",
          description: "Desmontagem de carenagem e banco quando necessário, limpeza de couro, aplicação de selante na pintura, selante de pneus, lubrificação.",
          sizes: "Biz, Pop (R$ 40), Titan, Fan, Bros 125/150/160 (R$ 50), Fazer, CB, Twister, XRE 190/250/300 (R$ 60), 300-600cc (R$ 80), Acima de 600cc (R$ 100)"
        },
        {
          title: "Vitrificação para motos",
          description: "Proteção de alta durabilidade para a pintura da sua motocicleta.",
          sizes: "R$ 150 a R$ 250"
        },
        {
          title: "Polimento de tanque",
          description: "Tratamento específico para o tanque da motocicleta.",
          sizes: "R$ 40"
        },
        {
          title: "Polimento completo",
          description: "Tratamento para toda a pintura da motocicleta.",
          sizes: "A partir de R$ 60"
        },
        {
          title: "Aplicação de cera v80",
          description: "Proteção básica para a pintura da motocicleta.",
          sizes: "R$ 10"
        }
      ]
    }
  ];

  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-pitstop-darkGray mb-4">Nossos Serviços</h2>
          <div className="w-20 h-1 bg-pitstop-blue mx-auto mb-6"></div>
          <p className="text-lg text-pitstop-darkGray/80 max-w-2xl mx-auto">
            Oferecemos uma variedade de serviços de estética automotiva e limpeza com a melhor qualidade.
          </p>
        </div>
        
        {serviceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <h3 className="text-2xl font-semibold text-pitstop-darkGray mb-8 text-center flex items-center justify-center">
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.services.map((service, serviceIndex) => (
                <div 
                  key={serviceIndex} 
                  className="service-card opacity-0 animate-fade-in"
                  style={{ animationDelay: `${0.2 * (serviceIndex + (categoryIndex * 4))}s` }}
                >
                  <div className="text-center">
                    <h4 className="text-xl font-semibold text-pitstop-darkGray mb-3">{service.title}</h4>
                    <p className="text-pitstop-darkGray/80 mb-2">{service.description}</p>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-pitstop-darkGray mt-2">
                      {service.sizes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
