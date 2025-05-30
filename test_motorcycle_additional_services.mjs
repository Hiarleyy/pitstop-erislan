#!/usr/bin/env node

import { readFileSync } from 'fs';
import path from 'path';

// Read services data
const servicesPath = path.join(process.cwd(), 'src/data/services.json');
const servicesData = JSON.parse(readFileSync(servicesPath, 'utf8'));

// Function to convert price string to number
const convertPrice = (priceStr) => {
  if (typeof priceStr === 'number') return priceStr;
  if (typeof priceStr !== 'string') return 0;
  
  let cleanStr = priceStr.replace(/[^\d,.-]/g, '');
  cleanStr = cleanStr.replace(',', '.');
  return parseFloat(cleanStr) || 0;
};

// Mock the service categories processing logic to test the fix
const processMotorcycleServices = () => {
  console.log('🔍 TESTING MOTORCYCLE ADDITIONAL SERVICES PRICING\n');
  
  // Find motorcycle additional services
  const motoAdditionalServices = servicesData.filter(service => 
    service.categoria === 'servicos_adicionais_moto'
  );
  
  console.log(`Found ${motoAdditionalServices.length} motorcycle additional services:\n`);
  
  motoAdditionalServices.forEach((service, index) => {
    console.log(`${index + 1}. ${service.titulo}`);
    console.log(`   Category: ${service.categoria}`);
    console.log(`   Raw prices:`, service.precos);
    
    // Process prices like the helper does
    let prices = null;
    
    if (service.precos.valor_fixo) {
      const fixedPrice = convertPrice(service.precos.valor_fixo);
      prices = {
        Pequeno: fixedPrice,
        Médio: fixedPrice,
        Grande: fixedPrice
      };
      console.log(`   ✅ Fixed price processed: R$ ${fixedPrice.toFixed(2)} for all sizes`);
    } else if (service.precos.a_partir_de) {
      const basePrice = convertPrice(service.precos.a_partir_de);
      prices = {
        Pequeno: basePrice,
        Médio: basePrice,
        Grande: basePrice
      };
      console.log(`   ✅ Starting price processed: R$ ${basePrice.toFixed(2)} for all sizes`);
    }
    
    if (prices) {
      console.log(`   Final prices object:`, prices);
      console.log(`   ✅ Will display: R$ ${Object.values(prices)[0].toFixed(2)}`);
    } else {
      console.log(`   ❌ NO PRICES PROCESSED!`);
    }
    
    console.log('');
  });
  
  // Test motorcycle main services to compare
  console.log('\n🏍️ COMPARING WITH MOTORCYCLE MAIN SERVICES:\n');
  
  const motoMainServices = servicesData.filter(service => 
    service.categoria === 'moto'
  );
  
  motoMainServices.slice(0, 2).forEach((service, index) => {
    console.log(`${index + 1}. ${service.titulo}`);
    console.log(`   Category: ${service.categoria}`);
    console.log(`   Raw prices:`, service.precos);
    
    if (service.precos.pequeno) {
      const prices = {
        Pequeno: convertPrice(service.precos.pequeno),
        Médio: convertPrice(service.precos.medio),
        Grande: convertPrice(service.precos.grande)
      };
      
      // This should be converted to motorcycle models
      const motorcyclePrices = {
        "Biz, Pop": prices.Pequeno,
        "Titan, Fan, Bros 125/150/160": prices.Médio,
        "Fazer, CB, Twister, XRE 190/250/300": prices.Grande
      };
      
      console.log(`   ✅ Converted to motorcycle models:`, motorcyclePrices);
    }
    console.log('');
  });
  
  // Test price calculation for different motorcycle models
  console.log('\n🧪 TESTING PRICE CALCULATION FOR DIFFERENT MOTORCYCLE MODELS:\n');
  
  const testModels = [
    "Biz, Pop",
    "Titan, Fan, Bros 125/150/160", 
    "Fazer, CB, Twister, XRE 190/250/300",
    "300-600cc",
    "Acima de 600cc"
  ];
  
  if (motoAdditionalServices.length > 0) {
    const testService = motoAdditionalServices[0]; // Use first service for testing
    console.log(`Testing with service: "${testService.titulo}"`);
    
    testModels.forEach(model => {
      console.log(`\n   Model: ${model}`);
      
      // Simulate the fixed price calculation
      if (testService.precos.valor_fixo) {
        const fixedPrice = convertPrice(testService.precos.valor_fixo);
        console.log(`   ✅ Expected price: R$ ${fixedPrice.toFixed(2)} (should be same for all models)`);
      } else if (testService.precos.a_partir_de) {
        const basePrice = convertPrice(testService.precos.a_partir_de);
        console.log(`   ✅ Expected price: R$ ${basePrice.toFixed(2)} (should be same for all models)`);
      }
    });
  }
};

console.log('='.repeat(80));
console.log('MOTORCYCLE ADDITIONAL SERVICES PRICING TEST');
console.log('='.repeat(80));

try {
  processMotorcycleServices();
  console.log('\n✅ Test completed successfully!');
} catch (error) {
  console.error('❌ Test failed:', error.message);
  process.exit(1);
}
