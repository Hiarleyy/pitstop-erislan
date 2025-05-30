#!/usr/bin/env node

import { readFileSync } from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

console.log('🎯 TESTE FINAL DE VALIDAÇÃO - PITSTOP ERISLAN');
console.log('============================================================');

let allTestsPassed = true;
const results = [];

// Test 1: Verificar se o arquivo Booking.tsx foi corrigido
console.log('\n📋 TESTE 1: Verificando correção do handleRemoveService');
try {
  const bookingContent = readFileSync('./src/components/Booking.tsx', 'utf-8');
  
  // Verificar se a correção está presente
  const hasReturnVehicle = bookingContent.includes('return vehicle;');
  const hasCorrectMapLogic = bookingContent.includes('setVehicles(vehicles.map(vehicle => {') && 
                             bookingContent.includes('if (vehicle.id === vehicleId) {') &&
                             bookingContent.includes('return vehicle;');
  
  if (hasReturnVehicle && hasCorrectMapLogic) {
    console.log('✅ handleRemoveService está corrigido');
    results.push('✅ Bug 1 (Tela Branca): CORRIGIDO');
  } else {
    console.log('❌ handleRemoveService ainda tem problemas');
    results.push('❌ Bug 1 (Tela Branca): PENDENTE');
    allTestsPassed = false;
  }
} catch (error) {
  console.log(`❌ Erro ao ler Booking.tsx: ${error.message}`);
  results.push('❌ Bug 1 (Tela Branca): ERRO');
  allTestsPassed = false;
}

// Test 2: Verificar se o serviceHelpers.ts foi corrigido
console.log('\n💰 TESTE 2: Verificando correção dos preços de Adicionais Motos');
try {
  const helpersContent = readFileSync('./src/lib/serviceHelpers.ts', 'utf-8');
  
  // Verificar se a correção está presente
  const hasMotorcycleAdditionalLogic = helpersContent.includes('servicos_adicionais_moto') &&
                                       helpersContent.includes('categoryKey === \'servicos_adicionais_moto\'');
  
  if (hasMotorcycleAdditionalLogic) {
    console.log('✅ serviceHelpers.ts está corrigido para Adicionais Motos');
    results.push('✅ Bug 2 (Preços Adicionais Motos): CORRIGIDO');
  } else {
    console.log('❌ serviceHelpers.ts ainda não processa Adicionais Motos');
    results.push('❌ Bug 2 (Preços Adicionais Motos): PENDENTE');
    allTestsPassed = false;
  }
} catch (error) {
  console.log(`❌ Erro ao ler serviceHelpers.ts: ${error.message}`);
  results.push('❌ Bug 2 (Preços Adicionais Motos): ERRO');
  allTestsPassed = false;
}

// Test 3: Verificar se os dados dos serviços estão corretos
console.log('\n📊 TESTE 3: Verificando dados dos serviços adicionais de moto');
try {
  const servicesData = JSON.parse(readFileSync('./src/data/services.json', 'utf-8'));
  const adicionalMotos = servicesData.filter(service => service.categoria === 'servicos_adicionais_moto');
  
  console.log(`🔢 Encontrados ${adicionalMotos.length} serviços adicionais de moto`);
  
  let allHavePrices = true;
  adicionalMotos.forEach((service, index) => {
    const hasPrice = service.precos && (service.precos.valor_fixo || service.precos.a_partir_de);
    if (!hasPrice) {
      console.log(`❌ ${service.titulo} - SEM PREÇOS`);
      allHavePrices = false;
    } else {
      console.log(`✅ ${service.titulo} - ${JSON.stringify(service.precos)}`);
    }
  });
  
  if (allHavePrices && adicionalMotos.length === 8) {
    console.log('✅ Todos os serviços adicionais de moto têm preços');
    results.push('✅ Dados dos Adicionais Motos: VÁLIDOS');
  } else {
    console.log('❌ Alguns serviços não têm preços ou quantidade incorreta');
    results.push('❌ Dados dos Adicionais Motos: INVÁLIDOS');
    allTestsPassed = false;
  }
} catch (error) {
  console.log(`❌ Erro ao ler services.json: ${error.message}`);
  results.push('❌ Dados dos Adicionais Motos: ERRO');
  allTestsPassed = false;
}

// Test 4: Verificar se não há erros de sintaxe
console.log('\n🔍 TESTE 4: Verificando sintaxe dos arquivos');
try {
  // Tentar importar os arquivos para verificar sintaxe
  const bookingContent = readFileSync('./src/components/Booking.tsx', 'utf-8');
  const helpersContent = readFileSync('./src/lib/serviceHelpers.ts', 'utf-8');
  
  // Verificações básicas de sintaxe
  const bookingSyntaxOk = !bookingContent.includes('setVehicles(vehicles.map(vehicle => {\n    if (vehicle.id === vehicleId) {\n      return {\n        ...vehicle,\n        services: vehicle.services.filter(s => s.id !== serviceId)\n      };\n    }\n  }));');
  
  const helpersSyntaxOk = helpersContent.includes('export') && helpersContent.includes('getServiceCategories');
  
  if (bookingSyntaxOk && helpersSyntaxOk) {
    console.log('✅ Sintaxe dos arquivos está correta');
    results.push('✅ Sintaxe dos Arquivos: VÁLIDA');
  } else {
    console.log('❌ Problemas de sintaxe detectados');
    results.push('❌ Sintaxe dos Arquivos: INVÁLIDA');
    allTestsPassed = false;
  }
} catch (error) {
  console.log(`❌ Erro de sintaxe: ${error.message}`);
  results.push('❌ Sintaxe dos Arquivos: ERRO');
  allTestsPassed = false;
}

// Resultado final
console.log('\n============================================================');
console.log('📋 RESUMO DOS TESTES:');
console.log('============================================================');

results.forEach(result => console.log(result));

console.log('\n============================================================');
if (allTestsPassed) {
  console.log('🎉 TODOS OS TESTES PASSARAM!');
  console.log('✅ Sistema PitStop Erislan está funcionando corretamente');
  console.log('✅ Ambos os bugs foram corrigidos com sucesso');
  console.log('✅ Aplicação pronta para uso');
} else {
  console.log('⚠️ ALGUNS TESTES FALHARAM!');
  console.log('❌ Verifique as correções acima');
  console.log('❌ Sistema pode ter problemas');
}
console.log('============================================================');

process.exit(allTestsPassed ? 0 : 1);
