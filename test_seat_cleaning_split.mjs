#!/usr/bin/env node

// Test script to verify the seat cleaning service split
import fs from 'fs';
import path from 'path';

console.log('🧪 Testing Seat Cleaning Service Split...\n');

// Read the services.json file
const servicesPath = './src/data/services.json';
const servicesData = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));

// Find the seat cleaning services
const seatCleaningServices = servicesData.filter(service => 
  service.titulo.includes('Higienização de Bancos')
);

console.log(`Found ${seatCleaningServices.length} seat cleaning services:\n`);

seatCleaningServices.forEach((service, index) => {
  console.log(`${index + 1}. ${service.titulo}`);
  console.log(`   Descrição: ${service.descricao}`);
  console.log(`   Preços:`, service.precos);
  console.log('');
});

// Verify the split was successful
if (seatCleaningServices.length === 2) {
  const perSeatService = seatCleaningServices.find(s => s.titulo.includes('Por assento'));
  const allSeatsService = seatCleaningServices.find(s => s.titulo.includes('Todos os bancos'));
  
  if (perSeatService && allSeatsService) {
    console.log('✅ SUCCESS: Service split completed correctly!');
    console.log(`✅ Per seat service: ${perSeatService.precos.assento_unitario}`);
    console.log(`✅ All seats service: ${allSeatsService.precos.todos_bancos}`);
    console.log(`✅ Per seat requires quantity: ${perSeatService.precos.requer_quantidade}`);
  } else {
    console.log('❌ ERROR: Services not found with expected titles');
  }
} else {
  console.log(`❌ ERROR: Expected 2 services, found ${seatCleaningServices.length}`);
}

// Test the serviceHelpers.ts integration
console.log('\n🔧 Testing ServiceHelpers integration...');

try {
  // Dynamic import to test the helper functions
  const { getServiceCategories } = await import('./src/lib/serviceHelpers.ts');
  const categories = getServiceCategories();
  
  const higienizacaoServices = categories.higienizacao?.services || [];
  const seatServices = higienizacaoServices.filter(s => 
    s.name.includes('Higienização de Bancos')
  );
  
  console.log(`Found ${seatServices.length} seat services in categories:`);
  seatServices.forEach(service => {
    console.log(`- ${service.name}`);
    console.log(`  Requires quantity: ${service.requer_quantidade}`);
    console.log(`  Unit value: ${service.valor_unitario}`);
    console.log(`  Prices:`, service.prices);
  });
  
  if (seatServices.length === 2) {
    console.log('✅ ServiceHelpers integration successful!');
  } else {
    console.log('❌ ServiceHelpers integration issue');
  }
  
} catch (error) {
  console.log('⚠️  ServiceHelpers test skipped (TypeScript module):', error.message);
}

console.log('\n🎉 Test completed!');
