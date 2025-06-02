// Comprehensive test for Higienização de Bancos services
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the actual services data
const servicesPath = join(__dirname, 'src', 'data', 'services.json');
const servicesData = JSON.parse(readFileSync(servicesPath, 'utf8'));

// Simulate the service processing logic from serviceHelpers.ts
function processServices(rawServices) {
  return rawServices.map(service => {
    const processedService = {
      id: Math.random().toString(36).substring(2, 10),
      name: service.titulo,
      description: service.descricao,
      category: service.categoria,
      icon: service.icone || 'default',
      requer_quantidade: false,
      prices: {}
    };

    // Price processing logic (mimicking serviceHelpers.ts)
    if (service.precos) {
      if (service.precos.pequeno && service.precos.medio && service.precos.grande) {
        // Standard car sizes
        processedService.prices = {
          'Pequeno': parseFloat(service.precos.pequeno.replace(/[^\d,]/g, '').replace(',', '.')),
          'Médio': parseFloat(service.precos.medio.replace(/[^\d,]/g, '').replace(',', '.')),
          'Grande': parseFloat(service.precos.grande.replace(/[^\d,]/g, '').replace(',', '.'))
        };
      } else if (service.precos.assento_unitario) {
        // Per seat pricing
        const unitPrice = parseFloat(service.precos.assento_unitario.replace(/[^\d,]/g, '').replace(',', '.'));
        processedService.prices = { "Assento Unitário": unitPrice };
        processedService.requer_quantidade = service.precos.requer_quantidade || false;
      } else if (service.precos.todos_bancos) {
        // All seats pricing
        const allSeatsPrice = parseFloat(service.precos.todos_bancos.replace(/[^\d,]/g, '').replace(',', '.'));
        processedService.prices = { "Todos os Bancos": allSeatsPrice };
      }
    }

    return processedService;
  });
}

// Price calculation logic (mimicking serviceHelpers.ts)
function calculateServicePrice(service, vehicleType, vehicleSize, quantity = 1) {
  // For services with single price (like "Todos os Bancos")
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

console.log('🧪 COMPREHENSIVE TEST: Higienização de Bancos Services\n');

// Find the raw services
const assentoRaw = servicesData.find(s => s.titulo === "Higienização de Bancos (Por assento)");
const todosRaw = servicesData.find(s => s.titulo === "Higienização de Bancos (Todos os bancos)");

console.log('📋 RAW SERVICES DATA:');
console.log('1. Por assento:', assentoRaw ? '✅ Found' : '❌ Not found');
console.log('2. Todos os bancos:', todosRaw ? '✅ Found' : '❌ Not found');

if (assentoRaw) {
  console.log('\n📋 "Por assento" details:');
  console.log(`   - Title: ${assentoRaw.titulo}`);
  console.log(`   - Category: ${assentoRaw.categoria}`);
  console.log(`   - Precos:`, assentoRaw.precos);
}

if (todosRaw) {
  console.log('\n📋 "Todos os bancos" details:');
  console.log(`   - Title: ${todosRaw.titulo}`);
  console.log(`   - Category: ${todosRaw.categoria}`);
  console.log(`   - Precos:`, todosRaw.precos);
}

// Process services
const allProcessedServices = processServices(servicesData);
const higienizacaoServices = allProcessedServices.filter(s => s.category === 'higienizacao');

console.log('\n🔄 PROCESSED SERVICES:');
console.log(`Total services: ${allProcessedServices.length}`);
console.log(`Higienização services: ${higienizacaoServices.length}`);

const assentoProcessed = higienizacaoServices.find(s => s.name.includes('Por assento'));
const todosProcessed = higienizacaoServices.find(s => s.name.includes('Todos os bancos'));

console.log('\n📋 PROCESSED SERVICE DETAILS:');

if (assentoProcessed) {
  console.log('1. "Por assento" processed:');
  console.log(`   - Name: ${assentoProcessed.name}`);
  console.log(`   - Prices:`, assentoProcessed.prices);
  console.log(`   - Requires quantity: ${assentoProcessed.requer_quantidade}`);
} else {
  console.log('❌ "Por assento" service not found after processing');
}

if (todosProcessed) {
  console.log('\n2. "Todos os bancos" processed:');
  console.log(`   - Name: ${todosProcessed.name}`);
  console.log(`   - Prices:`, todosProcessed.prices);
  console.log(`   - Requires quantity: ${todosProcessed.requer_quantidade}`);
} else {
  console.log('❌ "Todos os bancos" service not found after processing');
}

// Test price calculations
console.log('\n💰 PRICE CALCULATION TESTS:');

const testVehicles = [
  { type: 'car', size: 'Pequeno' },
  { type: 'car', size: 'Médio' },
  { type: 'car', size: 'Grande' }
];

if (todosProcessed) {
  console.log('\n🧮 "Todos os bancos" pricing test:');
  testVehicles.forEach(vehicle => {
    const price = calculateServicePrice(todosProcessed, vehicle.type, vehicle.size, 1);
    console.log(`   - ${vehicle.size}: R$ ${price.toFixed(2)}`);
  });
}

if (assentoProcessed) {
  console.log('\n🧮 "Por assento" pricing test (quantity: 2):');
  testVehicles.forEach(vehicle => {
    const price = calculateServicePrice(assentoProcessed, vehicle.type, vehicle.size, 2);
    console.log(`   - ${vehicle.size}: R$ ${price.toFixed(2)} per unit`);
  });
}

console.log('\n✅ TEST COMPLETED');
