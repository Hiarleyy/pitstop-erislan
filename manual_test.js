// Simple test that can be run in Node.js by copying the required functions
console.log('🧪 TESTING PRICING LOGIC MANUALLY\n');

// Simulate convertPrice function
function convertPrice(priceStr) {
  if (typeof priceStr === 'number') return priceStr;
  if (!priceStr) return 0;
  
  let cleanStr = priceStr.toString().replace(/R\$\s*/g, '').trim();
  cleanStr = cleanStr.replace(/\./g, '');
  cleanStr = cleanStr.replace(',', '.');
  
  const result = parseFloat(cleanStr) || 0;
  return result;
}

// Simulate the "Todos os bancos" service as processed by getServiceCategories
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

// Simulate calculateServicePrice function exactly as in serviceHelpers.ts
function calculateServicePrice(service, vehicleType, vehicleSize, quantity = 1) {
  console.log(`\n🔧 calculateServicePrice called with:`, {
    serviceName: service.name,
    vehicleType,
    vehicleSize,
    quantity,
    serviceData: {
      prices: service.prices,
      requer_quantidade: service.requer_quantidade,
      valor_a_combinar: service.valor_a_combinar,
      valor_unitario: service.valor_unitario
    }
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
      console.log(`   ✅ Returning single price: ${singlePrice}`);
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
  
  if (vehicleType === 'motorcycle') {
    console.log('→ Branch: motorcycle pricing');
    // ... motorcycle logic would go here
  }
  
  console.log('→ Branch: default (returning 0)');
  return 0;
}

// Test with different vehicle sizes
console.log('=== TESTING "TODOS OS BANCOS" SERVICE ===');
const testVehicles = [
  { type: 'car', size: 'Pequeno' },
  { type: 'car', size: 'Médio' },
  { type: 'car', size: 'Grande' }
];

testVehicles.forEach(vehicle => {
  const result = calculateServicePrice(todosOsBancosService, vehicle.type, vehicle.size, 1);
  console.log(`\n📊 RESULT for ${vehicle.type} ${vehicle.size}: R$ ${typeof result === 'number' ? result.toFixed(2) : result}`);
});

console.log('\n✅ Manual test completed!');
