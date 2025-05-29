
import React from 'react';
import { Car, Home, Sparkles, Shield, Droplet, Bike, Brush } from 'lucide-react';
import servicesData from '@/data/services.json';

const Services = () => {
  // Agrupar serviços por categoria
  const groupedServices = servicesData.reduce((acc: any, service: any) => {
    const category = service.categoria;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {});

  // Mapear categorias para nomes e ícones
  const categoryConfig: { [key: string]: { name: string; icon: React.ReactNode } } = {
    lavagem: {
      name: "Lavagens",
      icon: <Droplet className="text-pitstop-blue mb-4" size={40} />
    },
    polimento: {
      name: "Polimentos",
      icon: <Sparkles className="text-pitstop-blue mb-4" size={40} />
    },
    protecao: {
      name: "Proteções",
      icon: <Shield className="text-pitstop-blue mb-4" size={40} />
    },
    higienizacao: {
      name: "Higienização",
      icon: <Brush className="text-pitstop-blue mb-4" size={40} />
    },
    moto: {
      name: "Serviços para Motos",
      icon: <Bike className="text-pitstop-blue mb-4" size={40} />
    },
    servicos_adicionais: {
      name: "Serviços Adicionais Automotivos",
      icon: <Car className="text-pitstop-blue mb-4" size={40} />
    },
    servicos_adicionais_moto: {
      name: "Serviços Adicionais para Motos",
      icon: <Bike className="text-pitstop-blue mb-4" size={40} />
    },
    higienizacao_residencial: {
      name: "Higienização de Estofados Residenciais",
      icon: <Home className="text-pitstop-blue mb-4" size={40} />
    }
  };

  // Função para formatar preços
  const formatPrice = (precos: any) => {
    if (!precos) return 'Consulte preços';
    
    if (precos.valor_fixo) {
      return precos.valor_fixo;
    }
    
    if (precos.a_partir_de) {
      return `A partir de ${precos.a_partir_de}`;
    }
    
    if (precos.assento_unitario && precos.todos_bancos) {
      return `Assento: ${precos.assento_unitario} | Todos: ${precos.todos_bancos}`;
    }
    
    if (precos.valor_unitario) {
      return `Por unidade: ${precos.valor_unitario}`;
    }
    
    if (typeof precos.pequeno === 'number') {
      return `Pequeno (R$ ${precos.pequeno}), Médio (R$ ${precos.medio}), Grande (R$ ${precos.grande})`;
    }
    
    if (typeof precos.pequeno === 'string') {
      return `Pequeno (${precos.pequeno}), Médio (${precos.medio}), Grande (${precos.grande})`;
    }
    
    return 'Consulte preços';
  };

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
        
        {Object.entries(groupedServices).map(([categoryKey, services]: [string, any]) => {
          const config = categoryConfig[categoryKey];
          if (!config) return null;
          
          return (
            <div key={categoryKey} className="mb-16">
              <h3 className="text-2xl font-semibold text-pitstop-darkGray mb-8 text-center flex items-center justify-center">
                <span className="mr-2">{config.icon}</span>
                {config.name}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service: any, serviceIndex: number) => (
                  <div 
                    key={serviceIndex} 
                    className="service-card opacity-0 animate-fade-in"
                    style={{ animationDelay: `${0.2 * serviceIndex}s` }}
                  >
                    <div className="text-center">
                      <h4 className="text-xl font-semibold text-pitstop-darkGray mb-3">{service.titulo}</h4>
                      <p className="text-pitstop-darkGray/80 mb-2">{service.descricao}</p>
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-pitstop-darkGray mt-2">
                        {formatPrice(service.precos)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;