#!/usr/bin/env node

// Create a simple module export for testing
const fs = require('fs');

// Read and simulate the services data processing
console.log('🧪 TESTING WITH REAL APPLICATION DATA\n');

// First, let's check the raw services.json data
const servicesData = JSON.parse(fs.readFileSync('./src/data/services.json', 'utf8'));

const todosOsBancosRaw = servicesData.find(s => 
  s.titulo === "Higienização de Bancos (Todos os bancos)"
);

if (todosOsBancosRaw) {
  console.log('✅ Found "Todos os bancos" in raw data:');
  console.log('- Título:', todosOsBancosRaw.titulo);
  console.log('- Categoria:', todosOsBancosRaw.categoria);
  console.log('- Preços:', todosOsBancosRaw.precos);
  
  // Simulate the convertPrice function
  function convertPrice(priceStr) {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr) return 0;
    
    let cleanStr = priceStr.toString().replace(/R\$\s*/g, '').trim();
    cleanStr = cleanStr.replace(/\./g, '');
    cleanStr = cleanStr.replace(',', '.');
    
    const result = parseFloat(cleanStr) || 0;
    return result;
  }
  
  // Simulate how it would be processed in serviceHelpers.ts
  let processedPrices = {};
  
  if (todosOsBancosRaw.precos.todos_bancos) {
    const allSeatsPrice = convertPrice(todosOsBancosRaw.precos.todos_bancos);
    processedPrices = {
      "Todos os Bancos": allSeatsPrice
    };
    console.log('\n🔧 Processed prices:', processedPrices);
  }
  
  // Test the pricing logic
  const serviceObject = {
    id: "higienizacao-de-bancos-todos-os-bancos",
    name: "Higienização de Bancos (Todos os bancos)",
    description: todosOsBancosRaw.descricao,
    prices: processedPrices,
    requer_quantidade: false,
    valor_a_combinar: false,
    valor_unitario: null
  };
  
  console.log('\n📊 Final service object:', serviceObject);
  
  // Test single price detection
  console.log('\n🧮 Testing single price detection:');
  const hasSinglePrice = serviceObject.prices && Object.keys(serviceObject.prices).length === 1;
  console.log('- Has single price:', hasSinglePrice);
  
  if (hasSinglePrice) {
    const singlePrice = Object.values(serviceObject.prices)[0];
    console.log('- Single price value:', singlePrice);
    console.log('- Type:', typeof singlePrice);
    console.log('- Should return:', singlePrice);
  }
  
} else {
  console.log('❌ "Todos os bancos" service not found in raw data');
}

console.log('\n✅ Real data test completed!');
