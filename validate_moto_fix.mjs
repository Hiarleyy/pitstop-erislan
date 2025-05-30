#!/usr/bin/env node

import { readFileSync } from 'fs';
import path from 'path';

console.log('🔍 MOTORCYCLE ADDITIONAL SERVICES DATA VALIDATION\n');

try {
  // Read the services data
  const servicesPath = path.join(process.cwd(), 'src/data/services.json');
  const servicesData = JSON.parse(readFileSync(servicesPath, 'utf8'));
  
  // Find motorcycle additional services
  const motoAdditionalServices = servicesData.filter(service => 
    service.categoria === 'servicos_adicionais_moto'
  );
  
  console.log(`📊 Found ${motoAdditionalServices.length} motorcycle additional services\n`);
  
  // Analyze pricing structures
  let hasValueFixo = 0;
  let hasAPartirDe = 0;
  let hasOtherStructure = 0;
  
  console.log('🏷️ SERVICE PRICING ANALYSIS:');
  console.log('='.repeat(60));
  
  motoAdditionalServices.forEach((service, index) => {
    console.log(`${index + 1}. ${service.titulo}`);
    
    if (service.precos.valor_fixo) {
      hasValueFixo++;
      console.log(`   💰 Fixed Price: ${service.precos.valor_fixo}`);
      
      // Extract numeric value
      const numericValue = parseFloat(service.precos.valor_fixo.replace(/[^\d,.-]/g, '').replace(',', '.'));
      if (numericValue > 0) {
        console.log(`   ✅ Valid price: R$ ${numericValue.toFixed(2)}`);
      } else {
        console.log(`   ❌ Invalid price: ${service.precos.valor_fixo}`);
      }
    } else if (service.precos.a_partir_de) {
      hasAPartirDe++;
      console.log(`   💰 Starting Price: ${service.precos.a_partir_de}`);
      
      // Extract numeric value
      const numericValue = parseFloat(service.precos.a_partir_de.replace(/[^\d,.-]/g, '').replace(',', '.'));
      if (numericValue > 0) {
        console.log(`   ✅ Valid price: R$ ${numericValue.toFixed(2)}`);
      } else {
        console.log(`   ❌ Invalid price: ${service.precos.a_partir_de}`);
      }
    } else {
      hasOtherStructure++;
      console.log(`   ❓ Other structure:`, service.precos);
    }
    
    console.log('');
  });
  
  console.log('📈 SUMMARY:');
  console.log('='.repeat(60));
  console.log(`Services with valor_fixo: ${hasValueFixo}`);
  console.log(`Services with a_partir_de: ${hasAPartirDe}`);
  console.log(`Services with other structures: ${hasOtherStructure}`);
  console.log(`Total services: ${motoAdditionalServices.length}`);
  
  // Check if all services have valid pricing
  const totalWithValidPricing = hasValueFixo + hasAPartirDe;
  if (totalWithValidPricing === motoAdditionalServices.length) {
    console.log('\n✅ ALL MOTORCYCLE ADDITIONAL SERVICES HAVE VALID PRICING STRUCTURES!');
  } else {
    console.log('\n❌ Some services may have invalid pricing structures!');
  }
  
  // Test specific services that user mentioned were showing R$ 0,00
  console.log('\n🎯 SPECIFIC SERVICES MENTIONED BY USER:');
  console.log('='.repeat(60));
  
  const problematicServices = [
    'Aplicação de Cera Premium (Moto)',
    'Limpeza e Lubrificação da Corrente',
    'Polimento de Tanque',
    'Aplicação de Verniz de Motor'
  ];
  
  problematicServices.forEach(serviceName => {
    const service = motoAdditionalServices.find(s => s.titulo.includes(serviceName.split('(')[0].trim()));
    if (service) {
      console.log(`\n🔧 ${service.titulo}:`);
      if (service.precos.valor_fixo) {
        const price = parseFloat(service.precos.valor_fixo.replace(/[^\d,.-]/g, '').replace(',', '.'));
        console.log(`   Expected to show: R$ ${price.toFixed(2)} (was showing R$ 0,00)`);
        console.log(`   Data: ${service.precos.valor_fixo}`);
      } else if (service.precos.a_partir_de) {
        const price = parseFloat(service.precos.a_partir_de.replace(/[^\d,.-]/g, '').replace(',', '.'));
        console.log(`   Expected to show: R$ ${price.toFixed(2)} (was showing R$ 0,00)`);
        console.log(`   Data: ${service.precos.a_partir_de}`);
      }
    } else {
      console.log(`❌ Service "${serviceName}" not found!`);
    }
  });
  
  console.log('\n🎉 DATA VALIDATION COMPLETE!');
  console.log('\nℹ️  To test the actual application:');
  console.log('   1. Open http://localhost:5174 in your browser');
  console.log('   2. Go to the Booking section');
  console.log('   3. Add a motorcycle (any model)');
  console.log('   4. Select "Adicionais Motos" tab');
  console.log('   5. Check if prices show correctly (not R$ 0,00)');
  
} catch (error) {
  console.error('❌ Error reading services data:', error.message);
}
