import servicesData from '@/data/services.json';

export type ServiceCategory = {
  name: string;
  description: string;
  services: Array<{
    id: string;
    name: string;
    description: string;
    prices?: { [key: string]: number };
    priceMultiplier?: number;
    baseService?: string;
    fixedPrice?: number;
    basePrice?: number;
    requer_quantidade?: boolean;
    valor_a_combinar?: boolean;
    valor_unitario?: string | null;
  }>;
};

export type ServiceCategories = {
  [key: string]: ServiceCategory;
};

// Função auxiliar para converter preços string para number
const convertPrice = (priceStr: string): number => {
  // Remove R$ e espaços
  let cleanStr = priceStr.replace(/R\$\s*/g, '').trim();
  // Remove pontos de milhar (1.500 -> 1500)
  cleanStr = cleanStr.replace(/\./g, '');
  // Substitui vírgula por ponto para decimal (500,00 -> 500.00)
  cleanStr = cleanStr.replace(',', '.');
  return parseFloat(cleanStr) || 0;
};

// Função para formatar preço em moeda brasileira
export const formatPrice = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

// Mapear dados do JSON para o formato usado no Booking
export const getServiceCategories = (): ServiceCategories => {
  const categories: ServiceCategories = {};
  
  // Inicializar categorias
  const categoryMap: { [key: string]: { name: string; description: string } } = {
    lavagem: {
      name: "Lavagens",
      description: "Serviços de lavagem e limpeza externa do veículo"
    },
    higienizacao: {
      name: "Higienização", 
      description: "Serviços completos de limpeza e higienização para seu veículo"
    },
    polimento: {
      name: "Estética",
      description: "Tratamentos para realçar e restaurar a beleza da pintura do seu veículo"
    },
    protecao: {
      name: "Proteção",
      description: "Produtos e tratamentos que protegem a pintura do seu veículo contra danos"
    },
    servicos_adicionais: {
      name: "Adicionais",
      description: "Serviços adicionais e personalizados"
    },
    higienizacao_residencial: {
      name: "Residencial",
      description: "Serviços de higienização para residências"
    },
    moto: {
      name: "Motos",
      description: "Serviços específicos para motocicletas"
    },
    servicos_adicionais_moto: {
      name: "Adicionais Motos", 
      description: "Serviços adicionais para motocicletas"
    }
  };

  // Inicializar todas as categorias
  Object.entries(categoryMap).forEach(([key, config]) => {
    categories[key] = {
      name: config.name,
      description: config.description,
      services: []
    };
  });

  // Processar serviços do JSON
  servicesData.forEach((service: any) => {
    const categoryKey = service.categoria;
    
    if (categories[categoryKey]) {
      let prices: { [key: string]: number } | undefined;
      
      // Converter preços do JSON para o formato esperado
      if (service.precos) {
        if (typeof service.precos.pequeno === 'number') {
          // Se já são números
          prices = {
            Pequeno: service.precos.pequeno,
            Médio: service.precos.medio,
            Grande: service.precos.grande
          };
        } else if (typeof service.precos.pequeno === 'string') {
          // Se são strings, extrair números
          prices = {
            Pequeno: convertPrice(service.precos.pequeno),
            Médio: convertPrice(service.precos.medio),
            Grande: convertPrice(service.precos.grande)
          };
        } else if (service.precos.valor_fixo) {
          // Para preços fixos
          const fixedPrice = convertPrice(service.precos.valor_fixo);
          prices = {
            Pequeno: fixedPrice,
            Médio: fixedPrice,
            Grande: fixedPrice
          };
        } else if (service.precos.a_partir_de) {
          // Para preços "a partir de"
          const basePrice = convertPrice(service.precos.a_partir_de);
          prices = {
            Pequeno: basePrice,
            Médio: basePrice,
            Grande: basePrice
          };
        } else if (service.precos.assento_unitario) {
          // Para higienização de bancos por assento
          const unitPrice = convertPrice(service.precos.assento_unitario);
          prices = {
            "Assento Unitário": unitPrice
          };
        } else if (service.precos.todos_bancos) {
          // Para higienização de todos os bancos
          const allSeatsPrice = convertPrice(service.precos.todos_bancos);
          prices = {
            "Todos os Bancos": allSeatsPrice
          };
        } else if (service.precos.valor_unitario) {
          // Para valores unitários
          const unitPrice = convertPrice(service.precos.valor_unitario);
          prices = {
            "Valor Unitário": unitPrice
          };
        }
        
        // Para motos (categoria principal), usar categorias específicas de moto
        // Mas APENAS para a categoria 'moto', NÃO para 'servicos_adicionais_moto'
        if (categoryKey === 'moto' && prices && service.precos && (service.precos.pequeno || service.precos.medio || service.precos.grande)) {
          const priceValues = Object.values(prices);
          prices = {
            "Biz, Pop": priceValues[0],
            "Titan, Fan, Bros 125/150/160": priceValues[1],
            "Fazer, CB, Twister, XRE 190/250/300": priceValues[2]
          };
        }
        
        // Para serviços adicionais de moto (servicos_adicionais_moto), 
        // manter os preços como foram processados (valor_fixo, a_partir_de, etc.)
      }

      categories[categoryKey].services.push({
        id: service.id || service.titulo.toLowerCase().replace(/\s+/g, '-'),
        name: service.titulo,
        description: service.descricao,
        prices: prices,
        requer_quantidade: service.precos?.requer_quantidade || false,
        valor_a_combinar: service.precos?.valor_a_combinar || false,
        valor_unitario: service.precos?.assento_unitario || service.precos?.valor_unitario || null
      });
    }
  });

  return categories;
};

// Função para obter um serviço específico
export const getServiceById = (id: string, category: string) => {
  const categories = getServiceCategories();
  return categories[category]?.services.find(service => service.id === id);
};

// Função para calcular preço de um serviço
export const calculateServicePrice = (service: any, vehicleType: 'car' | 'motorcycle', vehicleSize: string, quantity: number = 1): number | string => {
  // Se tem valor a combinar, retorna texto
  if (service.valor_a_combinar) {
    const basePrice = service.prices?.[vehicleSize] || 0;
    return `a partir de ${formatPrice(basePrice)} | Valor a combinar`;
  }
  
  // Se requer quantidade e tem valor unitário
  if (service.requer_quantidade && service.valor_unitario) {
    const unitPrice = convertPrice(service.valor_unitario);
    return unitPrice * quantity;
  }
  
  // Para serviços com preço único (como "Todos os Bancos")
  if (service.prices && Object.keys(service.prices).length === 1) {
    const singlePrice = Object.values(service.prices)[0];
    if (typeof singlePrice === 'number') {
      return singlePrice;
    }
  }
  
  if (vehicleType === 'car' && service.prices) {
    return service.prices[vehicleSize] || 0;
  }
  
  if (vehicleType === 'motorcycle') {
    // Para serviços adicionais de moto com preços fixos, pegar qualquer preço disponível
    // pois eles não dependem do modelo da moto
    if (service.prices) {
      // Se o preço específico do modelo existe, usar ele
      if (service.prices[vehicleSize]) {
        return service.prices[vehicleSize];
      }
      
      // Para serviços adicionais de moto (que têm preços fixos), 
      // pegar o primeiro preço disponível já que é o mesmo para todos os modelos
      const availablePrices = Object.values(service.prices);
      if (availablePrices.length > 0 && typeof availablePrices[0] === 'number') {
        return availablePrices[0];
      }
    }
    
    // Se tem multiplicador de preço baseado em outro serviço
    if (service.priceMultiplier && service.baseService) {
      const baseService = getServiceById(service.baseService, 'moto');
      if (baseService?.prices?.[vehicleSize]) {
        return baseService.prices[vehicleSize] * service.priceMultiplier;
      }
    }
    
    // Preço fixo
    if (service.fixedPrice) return service.fixedPrice;
    if (service.basePrice) return service.basePrice;
  }
  
  return 0;
};
