#!/usr/bin/env node

import { getServiceCategories, calculateServicePrice } from './src/lib/serviceHelpers.ts';

console.log('🧪 TESTING ACTUAL APPLICATION PRICING LOGIC\n');

const serviceCategories = getServiceCategories();

// Find the "Higienização de Bancos (Todos os bancos)" service
const servicosAdicionais = serviceCategories['servicos_adicionais'];
if (servicosAdicionais) {
  console.log(`✅ Found servicosAdicionais category with ${servicosAdicionais.services.length} services`);
  
  const todosOsBancosService = servicosAdicionais.services.find(s => 
    s.name === "Higienização de Bancos (Todos os bancos)"
  );
  
  if (todosOsBancosService) {
    console.log('\n📋 "Higienização de Bancos (Todos os bancos)" service found:');
    console.log('Service object:', JSON.stringify(todosOsBancosService, null, 2));
    
    console.log('\n🧮 Testing price calculation:');
    
    // Test with different car sizes (like the app would do)
    const testVehicles = [
      { type: 'car', size: 'Pequeno' },
      { type: 'car', size: 'Médio' },
      { type: 'car', size: 'Grande' }
    ];
    
    testVehicles.forEach(vehicle => {
      const price = calculateServicePrice(todosOsBancosService, vehicle.type, vehicle.size, 1);
      console.log(`${vehicle.type} ${vehicle.size}: R$ ${typeof price === 'number' ? price.toFixed(2) : price}`);
    });
    
    // Let's also check the price structure
    console.log('\n🔍 Service prices structure:');
    console.log('prices:', todosOsBancosService.prices);
    console.log('requer_quantidade:', todosOsBancosService.requer_quantidade);
    console.log('valor_a_combinar:', todosOsBancosService.valor_a_combinar);
    console.log('valor_unitario:', todosOsBancosService.valor_unitario);
    
  } else {
    console.log('❌ "Higienização de Bancos (Todos os bancos)" service not found');
    console.log('Available services:');
    servicosAdicionais.services.forEach(s => console.log(`  - ${s.name}`));
  }
} else {
  console.log('❌ servicosAdicionais category not found');
  console.log('Available categories:', Object.keys(serviceCategories));
}
