#!/usr/bin/env node

// Test the motorcycle additional services pricing fix
console.log('🧪 TESTING MOTORCYCLE ADDITIONAL SERVICES PRICING FIX\n');

// Import required functions for testing
import { getServiceCategories, calculateServicePrice, formatPrice } from './src/lib/serviceHelpers.ts';

const runPricingTests = () => {
  console.log('📊 Loading service categories...\n');
  
  try {
    const serviceCategories = getServiceCategories();
    
    // Test 1: Check if motorcycle additional services are properly categorized
    console.log('TEST 1: Motorcycle Additional Services Category');
    console.log('='.repeat(50));
    
    const motoAdditionalCategory = serviceCategories['servicos_adicionais_moto'];
    if (motoAdditionalCategory) {
      console.log(`✅ Category found: ${motoAdditionalCategory.name}`);
      console.log(`📝 Description: ${motoAdditionalCategory.description}`);
      console.log(`🔢 Number of services: ${motoAdditionalCategory.services.length}`);
      
      // List first few services with their prices
      console.log('\n🏷️ Sample services:');
      motoAdditionalCategory.services.slice(0, 5).forEach((service, index) => {
        console.log(`${index + 1}. ${service.name}`);
        console.log(`   Prices:`, service.prices);
      });
    } else {
      console.log('❌ Motorcycle additional services category not found!');
    }
    
    console.log('\n' + '='.repeat(70) + '\n');
    
    // Test 2: Price calculation for different motorcycle models
    console.log('TEST 2: Price Calculation for Motorcycle Additional Services');
    console.log('='.repeat(50));
    
    const testMotorcycleModels = [
      "Biz, Pop",
      "Titan, Fan, Bros 125/150/160", 
      "Fazer, CB, Twister, XRE 190/250/300",
      "300-600cc",
      "Acima de 600cc"
    ];
    
    if (motoAdditionalCategory && motoAdditionalCategory.services.length > 0) {
      // Test with first 3 services
      motoAdditionalCategory.services.slice(0, 3).forEach(service => {
        console.log(`\n🔧 Testing service: "${service.name}"`);
        console.log('-'.repeat(40));
        
        testMotorcycleModels.forEach(model => {
          const price = calculateServicePrice(service, 'motorcycle', model, 1);
          const formattedPrice = typeof price === 'number' ? formatPrice(price) : price;
          
          console.log(`   ${model}: ${formattedPrice}`);
        });
        
        // Check if all prices are the same (they should be for fixed price services)
        const prices = testMotorcycleModels.map(model => 
          calculateServicePrice(service, 'motorcycle', model, 1)
        );
        
        const allSamePrice = prices.every(p => p === prices[0]);
        if (allSamePrice && typeof prices[0] === 'number' && prices[0] > 0) {
          console.log(`   ✅ All models have the same price: ${formatPrice(prices[0])}`);
        } else if (allSamePrice && typeof prices[0] === 'string') {
          console.log(`   ✅ All models have the same price: ${prices[0]}`);
        } else {
          console.log(`   ❌ Prices are inconsistent across models!`);
        }
      });
    }
    
    console.log('\n' + '='.repeat(70) + '\n');
    
    // Test 3: Compare with regular motorcycle services
    console.log('TEST 3: Comparison with Regular Motorcycle Services');
    console.log('='.repeat(50));
    
    const motoCategory = serviceCategories['moto'];
    if (motoCategory && motoCategory.services.length > 0) {
      const motoService = motoCategory.services[0];
      console.log(`\n🏍️ Testing regular moto service: "${motoService.name}"`);
      console.log('-'.repeat(40));
      
      testMotorcycleModels.slice(0, 3).forEach(model => {
        const price = calculateServicePrice(motoService, 'motorcycle', model, 1);
        const formattedPrice = typeof price === 'number' ? formatPrice(price) : price;
        
        console.log(`   ${model}: ${formattedPrice}`);
      });
      
      console.log('   ✅ Regular moto services should have different prices per model');
    }
    
    console.log('\n' + '='.repeat(70) + '\n');
    
    // Test 4: Check for zero prices (the main bug we're fixing)
    console.log('TEST 4: Zero Price Detection (Main Bug Check)');
    console.log('='.repeat(50));
    
    if (motoAdditionalCategory) {
      let zeroPriceCount = 0;
      let totalServiceCount = 0;
      
      motoAdditionalCategory.services.forEach(service => {
        testMotorcycleModels.forEach(model => {
          const price = calculateServicePrice(service, 'motorcycle', model, 1);
          totalServiceCount++;
          
          if (typeof price === 'number' && price === 0) {
            zeroPriceCount++;
            console.log(`   ❌ ZERO PRICE: ${service.name} for ${model}`);
          }
        });
      });
      
      console.log(`\n📊 Summary:`);
      console.log(`   Total tests: ${totalServiceCount}`);
      console.log(`   Zero prices found: ${zeroPriceCount}`);
      
      if (zeroPriceCount === 0) {
        console.log(`   ✅ SUCCESS: No zero prices found!`);
      } else {
        console.log(`   ❌ FAILURE: ${zeroPriceCount} zero prices still exist!`);
      }
    }
    
    console.log('\n' + '='.repeat(70) + '\n');
    console.log('🎉 TEST COMPLETE!\n');
    
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.error('Stack trace:', error.stack);
  }
};

// Run the tests
runPricingTests();
