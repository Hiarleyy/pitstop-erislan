
import React from 'react';
import { Car, Home, Sparkles, Shield, Droplet, Bike, Brush, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

  // Mapear categorias para nomes e ícones com gradientes e emojis
  const categoryConfig: { [key: string]: { name: string; icon: React.ReactNode; emoji: string; gradient: string; color: string } } = {
    lavagem: {
      name: "Serviços de Lavagem",
      icon: <Droplet className="text-blue-500" size={32} />,
      emoji: "💧",
      gradient: "from-blue-50 to-blue-100",
      color: "blue"
    },
    polimento: {
      name: "Polimento Automotivo",
      icon: <Sparkles className="text-pitstop-blue" size={32} />,
      emoji: "✨",
      gradient: "from-blue-50 to-blue-100",
      color: "blue"
    },
    protecao: {
      name: "Proteções Automotivas",
      icon: <Shield className="text-green-500" size={32} />,
      emoji: "🛡️",
      gradient: "from-green-50 to-green-100",
      color: "green"
    },
    higienizacao: {
      name: "Higienização Profissional",
      icon: <Brush className="text-pitstop-blue" size={32} />,
      emoji: "🧽",
      gradient: "from-blue-50 to-blue-100",
      color: "blue"
    },
    moto: {
      name: "Serviços para Motos",
      icon: <Bike className="text-orange-500" size={32} />,
      emoji: "🏍️",
      gradient: "from-orange-50 to-orange-100",
      color: "orange"
    },
    servicos_adicionais: {
      name: "Serviços Adicionais Auto",
      icon: <Car className="text-indigo-500" size={32} />,
      emoji: "🚗",
      gradient: "from-indigo-50 to-indigo-100",
      color: "indigo"
    },
    servicos_adicionais_moto: {
      name: "Adicionais para Motos",
      icon: <Bike className="text-teal-500" size={32} />,
      emoji: "🔧",
      gradient: "from-teal-50 to-teal-100",
      color: "teal"
    },
    higienizacao_residencial: {
      name: "Higienização Residencial",
      icon: <Home className="text-emerald-500" size={32} />,
      emoji: "🏠",
      gradient: "from-emerald-50 to-emerald-100",
      color: "emerald"
    }
  };

  // Função para formatar preços com melhor visual
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
      return `Pequeno: R$ ${precos.pequeno} • Médio: R$ ${precos.medio} • Grande: R$ ${precos.grande}`;
    }
    
    if (typeof precos.pequeno === 'string') {
      return `Pequeno: ${precos.pequeno} • Médio: ${precos.medio} • Grande: ${precos.grande}`;
    }
    
    return 'Consulte preços';
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pitstop-blue/5 rounded-full translate-y-32 -translate-x-32"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-pitstop-darkGray mb-6">
            🚗 Nossos Serviços
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-pitstop-blue via-pitstop-darkBlue to-blue-800 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Oferecemos uma ampla gama de serviços de estética automotiva e higienização com 
            <span className="font-semibold text-pitstop-blue"> tecnologia avançada</span> e 
            <span className="font-semibold text-pitstop-blue"> profissionais especializados</span>.
          </p>
        </div>
        
        <div className="space-y-16">
          {Object.entries(groupedServices).map(([categoryKey, services]: [string, any], categoryIndex) => {
            const config = categoryConfig[categoryKey];
            if (!config) return null;
            
            return (
              <div key={categoryKey} className="opacity-0 animate-fade-in" style={{ animationDelay: `${0.2 * categoryIndex}s` }}>
                {/* Category Header */}
                <div className="text-center mb-12">
                  <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${config.gradient} px-8 py-4 rounded-2xl border border-gray-200 shadow-sm mb-6`}>
                    <span className="text-2xl">{config.emoji}</span>
                    {config.icon}
                    <h3 className="text-2xl font-bold text-gray-800">{config.name}</h3>
                  </div>
                </div>
                
                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((service: any, serviceIndex: number) => (
                    <Card 
                      key={serviceIndex} 
                      className={`group relative overflow-hidden bg-gradient-to-br ${config.gradient} border-2 border-gray-200/50 hover:border-${config.color}-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2`}
                      style={{ animationDelay: `${0.1 * serviceIndex}s` }}
                    >
                      <CardContent className="p-6 h-full flex flex-col">
                        {/* Service Header */}
                        <div className="flex items-start gap-3 mb-4">
                          <div className={`p-2 bg-${config.color}-500/20 rounded-lg flex-shrink-0`}>
                            {config.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-pitstop-blue transition-colors">
                              {service.titulo}
                            </h4>
                          </div>
                        </div>
                        
                        {/* Service Description */}
                        <p className="text-gray-600 mb-4 leading-relaxed flex-1">
                          {service.descricao}
                        </p>
                        
                        {/* Price Section */}
                        <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-${config.color}-200/50`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Preço</p>
                              <p className={`text-sm font-bold text-${config.color}-600`}>
                                {formatPrice(service.precos)}
                              </p>
                            </div>
                            <Button variant="ghost" size="sm" className={`text-${config.color}-600 hover:bg-${config.color}-100 p-2`}>
                              <ArrowRight size={16} />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Hover Effect Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-${config.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-br from-pitstop-blue via-pitstop-darkBlue to-blue-800 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pitstop-blue/20 to-pitstop-darkBlue/20 rounded-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                ✨ Pronto para dar uma nova vida ao seu veículo?
              </h3>
              <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                Entre em contato conosco e descubra como nossos serviços podem transformar seu carro ou moto!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-white text-pitstop-blue hover:bg-gray-100 font-bold py-3 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                  <a href="#booking">📞 Agendar Serviço</a>
                </Button>
                <Button variant="outline" asChild className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 font-bold py-3 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                  <a href="/servicos">📋 Ver Todos os Serviços</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;