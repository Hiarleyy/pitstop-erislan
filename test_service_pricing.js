// Direct test by creating a service object like the one produced by getServiceCategories
console.log('=== TESTING SERVICE PRICE CALCULATION ===\n');

// Simulated "Todos os bancos" service as it would be processed by getServiceCategories
const todosOsBancosService = {
  id: "higienizacao-de-bancos-todos-os-bancos",
  name: "Higienização de Bancos (Todos os bancos)",
  description: "Aspiração e limpeza completa de todos os bancos e tapetes, extração de todos os bancos com antibactericida.",
  prices: {
    "Todos os Bancos": 200
  },
  requer_quantidade: false,
  valor_a_combinar: false,
  valor_unitario: null
};

// Simulated "Por assento" service
const porAssentoService = {
  id: "higienizacao-de-bancos-por-assento",
  name: "Higienização de Bancos (Por assento)",
  description: "Aspiração e limpeza por assento individual, extração do banco com antibactericida.",
  prices: {
    "Assento Unitário": 50
  },
  requer_quantidade: true,
  valor_a_combinar: false,
  valor_unitario: "R$ 50,00"
};

// convertPrice function simulation
function convertPrice(priceStr) {
  let cleanStr = priceStr.replace(/R\$\s*/g, '').trim();
  cleanStr = cleanStr.replace(/\./g, '');
  cleanStr = cleanStr.replace(',', '.');
  return parseFloat(cleanStr) || 0;
}

// calculateServicePrice function simulation
function calculateServicePrice(service, vehicleType, vehicleSize, quantity = 1) {
  console.log(`\n--- Testing: ${service.name} ---`);
  console.log(`Vehicle: ${vehicleType} ${vehicleSize}, Quantity: ${quantity}`);
  console.log(`Service data:`, {
    prices: service.prices,
    requer_quantidade: service.requer_quantidade,
    valor_a_combinar: service.valor_a_combinar,
    valor_unitario: service.valor_unitario
  });

  // Se tem valor a combinar, retorna texto
  if (service.valor_a_combinar) {
    console.log('→ Branch: valor_a_combinar');
    const basePrice = service.prices?.[vehicleSize] || 0;
    return `a partir de R$ ${basePrice.toFixed(2)} | Valor a combinar`;
  }
  
  // Se requer quantidade e tem valor unitário
  if (service.requer_quantidade && service.valor_unitario) {
    console.log('→ Branch: requer_quantidade && valor_unitario');
    const unitPrice = convertPrice(service.valor_unitario);
    return unitPrice * quantity;
  }
  
  // Para serviços com preço único (como "Todos os Bancos")
  if (service.prices && Object.keys(service.prices).length === 1) {
    console.log('→ Branch: single price detected');
    const singlePrice = Object.values(service.prices)[0];
    console.log(`   Single price value: ${singlePrice} (type: ${typeof singlePrice})`);
    if (typeof singlePrice === 'number') {
      console.log(`   Returning: ${singlePrice}`);
      return singlePrice;
    }
  }
  
  if (vehicleType === 'car' && service.prices) {
    console.log('→ Branch: car pricing');
    console.log(`   Looking for prices["${vehicleSize}"]`);
    console.log(`   Available keys:`, Object.keys(service.prices));
    console.log(`   Found price:`, service.prices[vehicleSize]);
    return service.prices[vehicleSize] || 0;
  }
  
  console.log('→ Branch: default (returning 0)');
  return 0;
}

// Test "Todos os bancos"
console.log('=== TESTING "TODOS OS BANCOS" ===');
['Pequeno', 'Médio', 'Grande'].forEach(size => {
  const result = calculateServicePrice(todosOsBancosService, 'car', size);
  console.log(`Result for ${size}: R$ ${typeof result === 'number' ? result.toFixed(2) : result}`);
});

// Test "Por assento"
console.log('\n=== TESTING "POR ASSENTO" ===');
for (let qty = 1; qty <= 3; qty++) {
  const result = calculateServicePrice(porAssentoService, 'car', 'Médio', qty);
  console.log(`Result for ${qty} assento(s): R$ ${typeof result === 'number' ? result.toFixed(2) : result}`);
}

console.log('\n✅ Test completed!');
