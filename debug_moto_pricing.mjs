#!/usr/bin/env node

import fs from 'fs';

console.log("🔍 DEBUGGING MOTORCYCLE ADDITIONAL SERVICES PRICING\n");

// Read services data
const servicesData = JSON.parse(fs.readFileSync('./src/data/services.json', 'utf8'));

// Read service helpers
const serviceHelpersContent = fs.readFileSync('./src/lib/serviceHelpers.ts', 'utf8');

console.log("📊 STEP 1: Raw Data Analysis");
console.log("=============================");

// Find motorcycle additional services
const motoAdicionalServices = servicesData.filter(service => service.categoria === 'servicos_adicionais_moto');

console.log(`Found ${motoAdicionalServices.length} motorcycle additional services:`);
motoAdicionalServices.forEach((service, index) => {
  console.log(`  ${index + 1}. ${service.titulo}`);
  console.log(`     Preços: ${JSON.stringify(service.precos)}`);
});

console.log("\n🔧 STEP 2: ServiceHelpers.ts Analysis");
console.log("=====================================");

// Check if servicos_adicionais_moto is handled
const hasMotorcycleAdditionalHandling = serviceHelpersContent.includes('servicos_adicionais_moto');
console.log(`✓ Contains 'servicos_adicionais_moto': ${hasMotorcycleAdditionalHandling}`);

// Check the specific logic
const hasCorrectCondition = serviceHelpersContent.includes("categoryKey === 'moto' || categoryKey === 'servicos_adicionais_moto'");
console.log(`✓ Has correct condition: ${hasCorrectCondition}`);

// Extract the relevant function
const calculateServicePriceMatch = serviceHelpersContent.match(/export function calculateServicePrice[\s\S]*?^}/m);
if (calculateServicePriceMatch) {
  console.log("\n📋 calculateServicePrice function found");
  
  // Look for the motorcycle handling section
  const motorcycleHandlingMatch = serviceHelpersContent.match(/if \(\(categoryKey === 'moto' \|\| categoryKey === 'servicos_adicionais_moto'\)[\s\S]*?}/);
  if (motorcycleHandlingMatch) {
    console.log("✓ Motorcycle handling section found:");
    console.log(motorcycleHandlingMatch[0]);
  } else {
    console.log("❌ Motorcycle handling section NOT found");
  }
}

console.log("\n🧪 STEP 3: Price Processing Simulation");
console.log("======================================");

// Simulate the price processing logic for the first motorcycle additional service
if (motoAdicionalServices.length > 0) {
  const testService = motoAdicionalServices[0];
  console.log(`Testing service: ${testService.titulo}`);
  console.log(`Original prices: ${JSON.stringify(testService.precos)}`);
  
  // Simulate the convertPrice function behavior
  function simulateConvertPrice(priceStr) {
    if (!priceStr) return 0;
    return priceStr.replace('R$', '').trim();
  }
  
  let simulatedPrices = {};
  
  if (testService.precos.valor_fixo) {
    simulatedPrices = {
      "Valor Fixo": simulateConvertPrice(testService.precos.valor_fixo)
    };
  } else if (testService.precos.a_partir_de) {
    simulatedPrices = {
      "A Partir De": simulateConvertPrice(testService.precos.a_partir_de)
    };
  }
  
  console.log(`Simulated processed prices: ${JSON.stringify(simulatedPrices)}`);
}

console.log("\n🔬 STEP 4: Category Processing Check");
console.log("===================================");

// Check how categories are built in processServicesData
const processServicesDataMatch = serviceHelpersContent.match(/export function processServicesData[\s\S]*?^}/m);
if (processServicesDataMatch) {
  console.log("✓ processServicesData function found");
  
  // Check if servicos_adicionais_moto is in categoryMap
  const categoryMapMatch = serviceHelpersContent.match(/const categoryMap[\s\S]*?};/);
  if (categoryMapMatch) {
    const categoryMapStr = categoryMapMatch[0];
    const hasMotorcycleAdditionalCategory = categoryMapStr.includes('servicos_adicionais_moto');
    console.log(`✓ servicos_adicionais_moto in categoryMap: ${hasMotorcycleAdditionalCategory}`);
    
    if (hasMotorcycleAdditionalCategory) {
      // Extract the motorcycle additional category definition
      const motoAdditionalMatch = categoryMapStr.match(/servicos_adicionais_moto:\s*{[\s\S]*?}/);
      if (motoAdditionalMatch) {
        console.log("Motorcycle additional category definition:");
        console.log(motoAdditionalMatch[0]);
      }
    }
  }
}

console.log("\n📝 CONCLUSION");
console.log("==============");
console.log("This debug script helps identify where the pricing issue might be occurring.");
console.log("Check the browser console and network tab for additional debugging information.");
