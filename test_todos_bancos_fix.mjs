#!/usr/bin/env node

// Test script to verify the "Todos os bancos" pricing fix
console.log('🧪 Testing "Todos os bancos" pricing fix...\n');

// Simulate the service data
const mockService = {
  name: "Higienização de Bancos (Todos os bancos)",
  prices: {
    "Todos os Bancos": 200
  },
  requer_quantidade: false,
  valor_unitario: null
};

// Simulate the pricing logic
function calculateServicePrice(service, vehicleType, vehicleSize, quantity = 1) {
  // Se requer quantidade e tem valor unitário
  if (service.requer_quantidade && service.valor_unitario) {
    const unitPrice = parseFloat(service.valor_unitario.replace(/[R$\s]/g, '').replace(',', '.'));
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
  
  return 0;
}

// Test different vehicle sizes
const vehicleSizes = ['Pequeno', 'Médio', 'Grande'];

console.log('Testing "Todos os bancos" service pricing:');
vehicleSizes.forEach(size => {
  const price = calculateServicePrice(mockService, 'car', size);
  console.log(`${size}: R$ ${price.toFixed(2)}`);
});

console.log('\n✅ All sizes should show R$ 200.00');

// Test the "Por assento" service
const perSeatService = {
  name: "Higienização de Bancos (Por assento)",
  prices: {
    "Assento Unitário": 50
  },
  requer_quantidade: true,
  valor_unitario: "R$ 50,00"
};

console.log('\nTesting "Por assento" service pricing:');
for (let qty = 1; qty <= 4; qty++) {
  const price = calculateServicePrice(perSeatService, 'car', 'Médio', qty);
  console.log(`${qty} assento(s): R$ ${price.toFixed(2)}`);
}

console.log('\n🎉 Test completed!');
