
import React from 'react';
import { Car, Home, ThumbsUp, Timer, Sparkles, Shield, Wrench, Droplet, Bike, Brush } from 'lucide-react';

const Services = () => {
  const serviceCategories = [
    {
      name: "Lavagens",
      icon: <Droplet className="text-pitstop-blue mb-4" size={40} />,
      services: [
        {
          title: "Lavagem Clássica",
          description: "Lavagem externa com shampoo neutro, limpeza dos plásticos externos, limpeza das rodas, limpeza de vidros externos, limpeza da caixa de rodas, aspiração e limpeza dos tapetes e carpete, limpeza do painel, forros de portas e console, limpeza dos vidros internos, limpeza dos plásticos internos, Cera Carnaúba Plus (1 mês de proteção), revitalizador de plásticos externos, condicionamento dos pneus.",
          sizes: "Pequeno (R$ 60), Médio (R$ 70), Grande (R$ 80)"
        },
        {
          title: "Lavagem Premium",
          description: "Lavagem externa com shampoo neutro, limpeza dos plásticos externos, limpeza dos emblemas e grades, limpeza das rodas, limpeza de vidros externos, limpeza da caixa de rodas, aspiração e limpeza dos tapetes, carpetes e bancos, limpeza do painel, forros de portas e console, limpeza dos plásticos internos, limpeza dos vidros internos, limpeza dos pedais, aromatizador Little Trees, revitalizador de plásticos externos (3 meses de proteção), revitalizador de plásticos internos (3 meses de proteção), cera premium (3 meses de proteção), selante nos pneus (1 mês de proteção).",
          sizes: "Pequeno (R$ 100), Médio (R$ 110), Grande (R$ 120)"
        },
        {
          title: "Lavagem Premium Geral (Pacote)",
          description: "Lavagem externa com shampoo neutro, lavagem do chassi nível 1 (baixo), lavagem do motor nível 1, limpeza dos plásticos externos, limpeza dos emblemas e grades, limpeza das rodas, limpeza de vidros externos, limpeza da caixa de rodas, aspiração e limpeza dos tapetes, carpetes e bancos, limpeza do painel, forros de portas e console, limpeza dos plásticos internos, limpeza dos vidros internos, limpeza duto ar-condicionado, limpeza dos pedais, revitalizador de plásticos externos (3 meses de proteção), revitalizador de plásticos internos (3 meses de proteção), cera premium (3 meses de proteção), selante nos pneus (1 mês de proteção).",
          sizes: "Pequeno (R$ 180), Médio (R$ 190), Grande (R$ 200)"
        }
      ]
    },
    {
      name: "Polimentos",
      icon : <Sparkles className="text-pitstop-blue mb-4" size={40} />,
      services: [
        {
          title: "Polimento de Entrada",
          description: "Lavagem Clássica, descontaminação de pintura, isolamento de áreas sensíveis, correção e nivelamento do verniz, remoção de 70% de riscos profundos, remoção de 90% de riscos superficiais, regeneração de brilho intenso, revitalizador de plásticos externos, revitalizador de plásticos internos, aplicação de selante (6 meses de proteção), selante nos pneus.",
          sizes: "Pequeno (R$ 300), Médio (R$ 350), Grande (R$ 400)"
        },
        {
          title: "Polimento Técnico (Premium)",
          description: "Lavagem Premium Geral (Pacote), descontaminação de pintura, isolamento de áreas sensíveis, correção e nivelamento do verniz, remoção de 99% de riscos profundos, remoção de 99% de riscos superficiais, regeneração de brilho intenso, revitalizador de plásticos externos, revitalizador de plásticos internos, cera em pasta (1 ano de proteção), impermeabilizador do para-brisa, impermeabilizador dos vidros, selante nos pneus.",
          sizes: "Pequeno (R$ 500), Médio (R$ 550), Grande (R$ 600)"
        },
        {
          title: "Polimento dos Faróis",
          description: "Isolamento de áreas sensíveis, correção e nivelamento do farol, escala de lixa apropriada, remoção de 99% de riscos profundos, remoção de 99% de riscos superficiais, regeneração de brilho intenso e gloss, aplicação de vitrificador, garantia de 6 meses.",
          sizes: "R$ 150"
        }
      ]
    },
    {
      name: "Proteções",
      icon: <Shield className="text-pitstop-blue mb-4" size={40} />,
      services: [
        {
          title: "Vitrificação 1 Ano",
          description: "Lavagem Premium Geral, descontaminação de pintura, polimento técnico, vitrificador de 1 ano de proteção, vitrificador de plástico (2 anos de proteção), impermeabilizador do para-brisa, aplicação do GYEON CanCoat Q2, aplicação do V-Plastic Vonixx.",
          sizes: "Pequeno (R$ 800), Médio (R$ 900), Grande (R$ 1.000)"
        },
        {
          title: "Vitrificação 3 Anos",
          description: "Lavagem Premium Geral, descontaminação de pintura, polimento técnico, vitrificador de 3 anos de proteção, vitrificador de plástico (2 anos de proteção), impermeabilizador do para-brisa, aplicação do CARPRO CQUARTZ UK-3.0, aplicação do V-Plastic Vonixx.",
          sizes: "Pequeno (R$ 1.800), Médio (R$ 2.000), Grande (R$ 2.300)"
        }
      ]
    },    {
      name: "Higienização",
      icon: <Brush className="text-pitstop-blue mb-4" size={40} />,
      services: [
        {
          title: "Higienização Interna",
          description: "Lavagem externa com shampoo neutro, limpeza dos plásticos externos, limpeza das rodas, limpeza de vidros externos, limpeza da caixa de rodas, aspiração e limpeza dos tapetes, carpetes e banco, extração dos carpetes com antibactericida, extração dos bancos com antibactericida, limpeza do quebra-sol, colunas, console, remoção de manchas dos bancos, limpeza dos plásticos internos, remoção de odores internos, limpeza dos vidros internos, painel e forros de portas, limpeza do teto, revitalizador de plásticos externos, revitalizador de plásticos internos, impermeabilizador dos espelhos, cera Carnaúba Plus (1 mês de proteção), impermeabilizador do para-brisa, selante nos pneus.",
          sizes: "Pequeno (R$ 300), Médio (R$ 350), Grande (R$ 400)"
        },
        {
          title: "Higienização Profunda",
          description: "Lavagem externa com Snow Foam, limpeza das canaletas de porta, limpeza dos plásticos externos, limpeza dos emblemas e grades, limpeza das rodas (externa), limpeza das rodas (interna), limpeza de vidros externos, limpeza da caixa de rodas, limpeza da churrasqueira, limpeza dos pneus, limpeza do escape, aspiração e limpeza dos tapetes, carpetes e banco, desmontagem e remoção completa do carpete, desmontagem e remoção completa dos bancos, extração dos carpetes com antibactericida, extração dos bancos com antibactericida, limpeza do quebra-sol, colunas, console, remoção de manchas dos bancos, limpeza dos plásticos internos, remoção de odores internos, limpeza dos vidros internos, painel e forros de portas, limpeza das borrachas, limpeza do teto, revitalizador de plásticos externos, revitalizador de plásticos internos, cera premium (3 meses de proteção), impermeabilizador do para-brisa, selante nos pneus.",
          sizes: "Pequeno (R$ 400), Médio (R$ 500), Grande (R$ 600)"
        },
        {
          title: "Higienização de Bancos",
          description: "Aspiração e limpeza dos tapetes e bancos, extração dos bancos com antibactericida.",
          sizes: "Cada assento: R$ 50; Todos os bancos: R$ 200"
        }
      ]
    },
    {
      name: "Serviços para Motos",
      icon: <Bike className="text-pitstop-blue mb-4" size={40} />,
      services: [
        {
          title: "Lavagem Clássica",
          description: "Lavagem externa com shampoo neutro, limpeza dos plásticos e borrachas, limpeza das rodas, Cera Carnaúba Plus (1 mês de proteção), revitalizador de plásticos externos.",
          sizes: "Pequeno (R$ 30), Médio (R$ 40), Grande (R$ 50)"
        },
        {
          title: "Lavagem Premium",
          description: "Lavagem externa com Snow Foam, limpeza dos plásticos e borrachas, limpeza detalhada das rodas, limpeza detalhada dos pneus, limpeza detalhada da corrente, limpeza detalhada da carenagem, limpeza detalhada do painel, limpeza do banco, limpeza detalhada do escape, cera premium (6 semanas de proteção), revitalizador de plásticos externos (3 meses de proteção), lubrificação da corrente.",
          sizes: "Pequeno (R$ 100), Médio (R$ 120), Grande (R$ 150)"
        },
        {
          title: "Vitrificação",
          description: "Lavagem Premium Detalhada, descontaminação de pintura, isolamento de áreas sensíveis, correção e nivelamento do verniz, remoção de 99% de riscos profundos, remoção de 99% de riscos superficiais, regeneração de brilho intenso, vitrificador de 1 ano de proteção, vitrificador de plástico (2 anos de proteção), aplicação de verniz de motor, aplicação do GYEON CanCoat Q2, aplicação do V-Plastic Vonixx.",
          sizes: "Pequeno (R$ 300), Médio (R$ 350), Grande (R$ 400)"
        }
      ]
    },
    {
      name: "Serviços Adicionais Automotivos",
      icon: <Car className="text-pitstop-blue mb-4" size={40} />,
      services: [
        {
          title: "Revitalização de Pintura",
          description: "Tratamento para revitalização da pintura automotiva.",
          sizes: "R$ 50"
        },
        {
          title: "Aplicação de Anticorrosivo Chassis",
          description: "Proteção anticorrosiva para o chassis do veículo.",
          sizes: "R$ 30"
        },
        {
          title: "Cristalização de Para-brisa",
          description: "Tratamento de cristalização para proteção do para-brisa.",
          sizes: "R$ 50"
        },
        {
          title: "Aromatizador Little Trees",
          description: "Aromatizador premium para o interior do veículo.",
          sizes: "R$ 20"
        },
        {
          title: "Remoção de Chuva Ácida",
          description: "Tratamento para remoção de manchas causadas por chuva ácida.",
          sizes: "R$ 100"
        },
        {
          title: "Remoção de Piche e Cola",
          description: "Remoção de piche e resíduos de cola.",
          sizes: "A partir de R$ 10"
        },
        {
          title: "Lavagem de Motor",
          description: "Limpeza detalhada do motor do veículo.",
          sizes: "A partir de R$ 50"
        },
        {
          title: "Lavagem de Chassis",
          description: "Limpeza detalhada do chassis do veículo.",
          sizes: "A partir de R$ 50"
        },
        {
          title: "Hidratação de Plásticos Internos",
          description: "Tratamento de hidratação para plásticos internos.",
          sizes: "R$ 50"
        },
        {
          title: "Limpeza de Ar-condicionado C/ Vapor",
          description: "Limpeza e desinfecção do sistema de ar-condicionado com vapor.",
          sizes: "R$ 50"
        },
        {
          title: "Limpeza Simples e Hidratação de Bancos de Couro",
          description: "Limpeza básica e hidratação de bancos em couro.",
          sizes: "R$ 50"
        },
        {
          title: "Higienização e Hidratação de Bancos de Couro",
          description: "Higienização completa e hidratação de bancos em couro.",
          sizes: "R$ 150"
        },
        {
          title: "Higienização de Bancos (Unidade)",
          description: "Higienização individual de banco.",
          sizes: "R$ 50"
        },
        {
          title: "Higienização de Teto",
          description: "Higienização do forro do teto.",
          sizes: "A partir de R$ 30"
        }
      ]
    },
    {
      name: "Serviços Adicionais para Motos",
      icon: <Bike className="text-pitstop-blue mb-4" size={40} />,
      services: [
        {
          title: "Aplicação de Cera Premium",
          description: "Aplicação de cera premium para motocicletas.",
          sizes: "R$ 20"
        },
        {
          title: "Limpeza e Lubrificação da Corrente",
          description: "Limpeza e lubrificação da corrente da motocicleta.",
          sizes: "R$ 20"
        },
        {
          title: "Descontaminação de Escapamento",
          description: "Limpeza e descontaminação do escapamento.",
          sizes: "A partir de R$ 30"
        },
        {
          title: "Pintura de Escapamento",
          description: "Pintura e renovação do escapamento.",
          sizes: "R$ 20"
        },
        {
          title: "Restaurax",
          description: "Produto restaurador para plásticos.",
          sizes: "R$ 10"
        },
        {
          title: "Polimento de Tanque",
          description: "Polimento específico do tanque da motocicleta.",
          sizes: "R$ 70"
        },
        {
          title: "Polimento Completo de Motor",
          description: "Polimento completo do motor da motocicleta.",
          sizes: "A partir de R$ 100"
        },
        {
          title: "Aplicação de Verniz de Motor",
          description: "Aplicação de verniz protetor no motor.",
          sizes: "R$ 50"
        }
      ]
    },
    {
      name: "Higienização de Estofados Residenciais",
      icon: <Home className="text-pitstop-blue mb-4" size={40} />,
      services: [
        {
          title: "Sofás 2 lugares",
          description: "Higienização de sofá de 2 lugares.",
          sizes: "R$ 200"
        },
        {
          title: "Sofás 3 lugares",
          description: "Higienização de sofá de 3 lugares.",
          sizes: "R$ 250"
        },
        {
          title: "Sofás 4 lugares",
          description: "Higienização de sofá de 4 lugares.",
          sizes: "R$ 300"
        },
        {
          title: "Poltrona",
          description: "Higienização de poltrona.",
          sizes: "R$ 80"
        },
        {
          title: "Cadeira de escritório",
          description: "Higienização de cadeira de escritório.",
          sizes: "R$ 50"
        },
        {
          title: "Tapetes",
          description: "Higienização de tapetes residenciais.",
          sizes: "A partir de R$ 40"
        },
        {
          title: "Travesseiros e almofadas",
          description: "Higienização de travesseiros e almofadas por unidade.",
          sizes: "R$ 15"
        },
        {
          title: "Poltrona de couro - Limpeza e hidratação",
          description: "Limpeza e hidratação de poltrona de couro.",
          sizes: "A partir de R$ 80"
        },
        {
          title: "Impermeabilização de estofados",
          description: "Aplicação de impermeabilizante em estofados.",
          sizes: "A partir de R$ 80"
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