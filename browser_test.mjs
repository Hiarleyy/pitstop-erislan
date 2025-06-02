import fs from 'fs';
import path from 'path';

// Read the actual services data
const servicesPath = '/home/br4b0/Desktop/in_silico/pitstop-erislan/src/data/services.json';
const servicesData = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));

console.log('🔍 Looking for Higienização de Bancos services...\n');

// Find both services
const assentoService = servicesData.find(s => s.titulo === "Higienização de Bancos (Por assento)");
const todosService = servicesData.find(s => s.titulo === "Higienização de Bancos (Todos os bancos)");

console.log('📋 "Por assento" service:');
console.log(JSON.stringify(assentoService, null, 2));

console.log('\n📋 "Todos os bancos" service:');
console.log(JSON.stringify(todosService, null, 2));

// Test how these would be processed by the helper
console.log('\n🧪 Expected processing results:');

if (assentoService) {
    console.log('\n1. "Por assento" - Should require quantity and have R$ 50,00 per unit');
    console.log(`   - Has assento_unitario: ${assentoService.precos?.assento_unitario}`);
    console.log(`   - Requires quantity: ${assentoService.precos?.requer_quantidade}`);
}

if (todosService) {
    console.log('\n2. "Todos os bancos" - Should show R$ 200,00 for all vehicle sizes');
    console.log(`   - Has todos_bancos: ${todosService.precos?.todos_bancos}`);
    console.log(`   - Category: ${todosService.categoria}`);
}
