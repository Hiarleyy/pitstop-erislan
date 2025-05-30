import { readFileSync } from 'fs';

// Carregar dados dos serviços
const servicesData = JSON.parse(readFileSync('./src/data/services.json', 'utf-8'));

// Função auxiliar para converter preços string para number
const convertPrice = (priceStr) => {
  let cleanStr = priceStr.replace(/R\$\s*/g, '').trim();
  cleanStr = cleanStr.replace(/\./g, '');
  cleanStr = cleanStr.replace(',', '.');
  return parseFloat(cleanStr) || 0;
};

// Função para formatar preço em moeda brasileira
const formatPrice = (value) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

// Função para obter categorias de serviços
const getServiceCategories = () => {
  const categories = {};
  
  const categoryMap = {
    servicos_adicionais_moto: {
      name: "Adicionais Motos", 
      description: "Serviços adicionais para motocicletas"
    }
  };

  // Inicializar categoria
  Object.entries(categoryMap).forEach(([key, config]) => {
    categories[key] = {
      name: config.name,
      description: config.description,
      services: []
    };
  });

  // Processar serviços do JSON
  servicesData.forEach((service) => {
    const categoryKey = service.categoria;
    
    if (categories[categoryKey]) {
      let prices;
      
      if (service.precos) {
        if (service.precos.valor_fixo) {
          const fixedPrice = convertPrice(service.precos.valor_fixo);
          prices = {
            Pequeno: fixedPrice,
            Médio: fixedPrice,
            Grande: fixedPrice
          };
        } else if (service.precos.a_partir_de) {
          const basePrice = convertPrice(service.precos.a_partir_de);
          prices = {
            Pequeno: basePrice,
            Médio: basePrice,
            Grande: basePrice
          };
        }
      }

      categories[categoryKey].services.push({
        id: service.id || service.titulo.toLowerCase().replace(/\s+/g, '-'),
        name: service.titulo,
        description: service.descricao,
        prices: prices
      });
    }
  });

  return categories;
};

console.log('🔧 TESTE DE CORREÇÕES DOS BUGS\n');

// Test 1: Verificar se os serviços adicionais de moto têm preços
console.log('📊 TESTE 1: Verificando preços dos Adicionais Motos');
const categories = getServiceCategories();
const adicionalMotos = categories['servicos_adicionais_moto'];

if (adicionalMotos) {
  console.log(`✅ Categoria "Adicionais Motos" encontrada: ${adicionalMotos.name}`);
  console.log(`📋 Quantidade de serviços: ${adicionalMotos.services.length}`);
  
  adicionalMotos.services.forEach((service, index) => {
    console.log(`\n${index + 1}. ${service.name}`);
    console.log(`   Preços: ${JSON.stringify(service.prices)}`);
    
    // Testar cálculo de preço
    if (service.prices) {
      try {
        const firstPrice = Object.values(service.prices)[0];
        console.log(`   Preço calculado: ${formatPrice(firstPrice)}`);
      } catch (error) {
        console.log(`   ❌ Erro no cálculo: ${error.message}`);
      }
    } else {
      console.log(`   ❌ SEM PREÇOS!`);
    }
  });
} else {
  console.log('❌ Categoria "Adicionais Motos" não encontrada!');
}

// Test 2: Verificar estrutura dos dados originais
console.log('\n📋 TESTE 2: Verificando dados originais dos Adicionais Motos');
const rawAdicionaisMotos = servicesData.filter(service => service.categoria === 'servicos_adicionais_moto');

console.log(`🔢 Total de serviços adicionais de moto no JSON: ${rawAdicionaisMotos.length}`);
rawAdicionaisMotos.forEach((service, index) => {
  console.log(`${index + 1}. ${service.titulo} - Preços: ${JSON.stringify(service.precos)}`);
});

console.log('\n✅ TESTE CONCLUÍDO');
