// Test script to verify service functionality
const servicesData = require('./src/data/services.json');

console.log('🔍 Testing Service Data Structure...\n');

// Test 1: Check all categories are present
const categories = [...new Set(servicesData.map(service => service.categoria))];
console.log('📋 Available Categories:');
categories.forEach(cat => console.log(`  - ${cat}`));
console.log();

// Test 2: Check different price structures
console.log('💰 Testing Price Structures:');

// Standard pricing (pequeno/medio/grande)
const standardPricing = servicesData.find(s => s.precos.pequeno);
if (standardPricing) {
  console.log(`✅ Standard Pricing: ${standardPricing.titulo}`);
  console.log(`   Pequeno: ${standardPricing.precos.pequeno}`);
  console.log(`   Médio: ${standardPricing.precos.medio}`);
  console.log(`   Grande: ${standardPricing.precos.grande}`);
}

// Fixed pricing (valor_fixo)
const fixedPricing = servicesData.find(s => s.precos.valor_fixo);
if (fixedPricing) {
  console.log(`✅ Fixed Pricing: ${fixedPricing.titulo}`);
  console.log(`   Valor Fixo: ${fixedPricing.precos.valor_fixo}`);
}

// Variable pricing (a_partir_de)
const variablePricing = servicesData.find(s => s.precos.a_partir_de);
if (variablePricing) {
  console.log(`✅ Variable Pricing: ${variablePricing.titulo}`);
  console.log(`   A partir de: ${variablePricing.precos.a_partir_de}`);
}

// Unit pricing (assento_unitario)
const unitPricing = servicesData.find(s => s.precos.assento_unitario);
if (unitPricing) {
  console.log(`✅ Unit Pricing: ${unitPricing.titulo}`);
  console.log(`   Assento Unitário: ${unitPricing.precos.assento_unitario}`);
  console.log(`   Todos os Bancos: ${unitPricing.precos.todos_bancos}`);
}

// Value per unit (valor_unitario)
const valuePerUnit = servicesData.find(s => s.precos.valor_unitario);
if (valuePerUnit) {
  console.log(`✅ Value Per Unit: ${valuePerUnit.titulo}`);
  console.log(`   Valor Unitário: ${valuePerUnit.precos.valor_unitario}`);
}

console.log();

// Test 3: Count services per category
console.log('📊 Services Count by Category:');
const categoryCount = categories.reduce((acc, cat) => {
  acc[cat] = servicesData.filter(s => s.categoria === cat).length;
  return acc;
}, {});

Object.entries(categoryCount).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count} services`);
});

console.log();
console.log(`✅ Total Services: ${servicesData.length}`);
console.log('🎉 Service data structure validation complete!');
