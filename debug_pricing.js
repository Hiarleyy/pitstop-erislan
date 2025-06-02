#!/usr/bin/env node

// Debug script to test the "Todos os bancos" pricing logic

// Simulated service from the helper function
const todosOsBancosService = {
  name: "Higienização de Bancos (Todos os bancos)",
  prices: {
    "Todos os Bancos": 200
  },
  requer_quantidade: false,
  valor_unitario: null,
  valor_a_combinar: false
};

// Simulated pricing logic
function calculateServicePrice(service, vehicleType, vehicleSize, quantity = 1) {
  console.log('=== DEBUGGING calculateServicePrice ===');
  console.log('Service:', service.name);
  console.log('Vehicle Type:', vehicleType);
  console.log('Vehicle Size:', vehicleSize);
  console.log('Service Prices:', service.prices);
  console.log('Requer quantidade:', service.requer_quantidade);
  console.log('Valor unitário:', service.valor_unitario);
  console.log('Valor a combinar:', service.valor_a_combinar);
  
  // Se tem valor a combinar, retorna texto
  if (service.valor_a_combinar) {
    console.log('→ Has valor_a_combinar');
    const basePrice = service.prices?.[vehicleSize] || 0;
    return `a partir de R$ ${basePrice.toFixed(2)} | Valor a combinar`;
  }
  
  // Se requer quantidade e tem valor unitário
  if (service.requer_quantidade && service.valor_unitario) {
    console.log('→ Requires quantity and has unit price');
    const unitPrice = parseFloat(service.valor_unitario.replace(/R\$\s*/g, '').replace(',', '.')) || 0;
    return unitPrice * quantity;
  }
  
  // Para serviços com preço único (como "Todos os Bancos")
  if (service.prices && Object.keys(service.prices).length === 1) {
    console.log('→ Single price detected');
    console.log('   Price keys:', Object.keys(service.prices));
    console.log('   Price values:', Object.values(service.prices));
    const singlePrice = Object.values(service.prices)[0];
    if (typeof singlePrice === 'number') {
      console.log('   Returning single price:', singlePrice);
      return singlePrice;
    }
  }
  
  if (vehicleType === 'car' && service.prices) {
    console.log('→ Car pricing logic');
    console.log(`   Looking for price[${vehicleSize}]:`, service.prices[vehicleSize]);
    return service.prices[vehicleSize] || 0;
  }
  
  console.log('→ Returning default 0');
  return 0;
}

// Test different vehicle sizes
const vehicleSizes = ['Pequeno', 'Médio', 'Grande'];

console.log('🧪 Testing "Todos os bancos" service pricing:\n');

vehicleSizes.forEach(size => {
  console.log(`\n--- Testing with vehicle size: ${size} ---`);
  const price = calculateServicePrice(todosOsBancosService, 'car', size);
  console.log(`RESULT: R$ ${typeof price === 'number' ? price.toFixed(2) : price}\n`);
});

console.log('\n✅ Expected: All sizes should show R$ 200.00');
