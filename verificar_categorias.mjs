import fs from 'fs';

// Lendo o arquivo de serviços
const servicesData = JSON.parse(fs.readFileSync('/home/br4b0/Desktop/in_silico/pitstop-erislan/src/data/services.json', 'utf8'));

console.log('🔍 ANÁLISE DAS CATEGORIAS DE SERVIÇOS\n');

// Obter todas as categorias únicas
const categorias = [...new Set(servicesData.map(service => service.categoria))];

console.log('📋 CATEGORIAS ENCONTRADAS:');
categorias.forEach(categoria => {
  const count = servicesData.filter(s => s.categoria === categoria).length;
  console.log(`   - ${categoria}: ${count} serviços`);
});

console.log('\n🚗 SERVIÇOS ADICIONAIS PARA AUTOMÓVEIS:');
const servicosAdicionais = servicesData.filter(s => s.categoria === 'servicos_adicionais');
servicosAdicionais.forEach((service, index) => {
  console.log(`   ${index + 1}. ${service.titulo}`);
});

console.log('\n🔧 SERVIÇOS ADICIONAIS PARA MOTOS:');
const servicosAdicionaisMoto = servicesData.filter(s => s.categoria === 'servicos_adicionais_moto');
servicosAdicionaisMoto.forEach((service, index) => {
  console.log(`   ${index + 1}. ${service.titulo}`);
});

console.log('\n🏠 SERVIÇOS RESIDENCIAIS:');
const servicosResidenciais = servicesData.filter(s => s.categoria === 'higienizacao_residencial');
servicosResidenciais.forEach((service, index) => {
  console.log(`   ${index + 1}. ${service.titulo}`);
});

console.log('\n💡 PROBLEMA IDENTIFICADO:');
console.log('A página está buscando:');
console.log('   - "adicional_auto" mas deveria ser "servicos_adicionais"');
console.log('   - "adicional_moto" mas deveria ser "servicos_adicionais_moto"');
console.log('   - "residencial" mas deveria ser "higienizacao_residencial"');
