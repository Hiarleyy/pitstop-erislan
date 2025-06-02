// Test the actual service helpers
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Since we can't import TS directly, let's test with a simulated version

console.log('=== TESTING ACTUAL SERVICE HELPERS ===\n');

try {
  const categories = getServiceCategories();
  const higienizacaoServices = categories.higienizacao?.services || [];
  
  console.log('Found higienização services:');
  higienizacaoServices.forEach((service, index) => {
    if (service.name.includes('Higienização de Bancos')) {
      console.log(`${index + 1}. ${service.name}`);
      console.log(`   Prices:`, service.prices);
      console.log(`   Requer quantidade: ${service.requer_quantidade}`);
      console.log(`   Valor unitário: ${service.valor_unitario}`);
      console.log('');
    }
  });
  
  // Test specifically the "Todos os bancos" service
  const todosOsBancosService = higienizacaoServices.find(s => 
    s.name.includes('Todos os bancos')
  );
  
  if (todosOsBancosService) {
    console.log('=== TESTING "TODOS OS BANCOS" SERVICE ===');
    console.log('Service found:', todosOsBancosService.name);
    console.log('Service prices structure:', todosOsBancosService.prices);
    console.log('Single price check:', Object.keys(todosOsBancosService.prices || {}).length === 1);
    
    ['Pequeno', 'Médio', 'Grande'].forEach(size => {
      const price = calculateServicePrice(todosOsBancosService, 'car', size);
      console.log(`${size}: R$ ${typeof price === 'number' ? price.toFixed(2) : price}`);
    });
  } else {
    console.log('❌ ERRO: Serviço "Todos os bancos" não encontrado');
  }
  
  // Test the "Por assento" service
  const porAssentoService = higienizacaoServices.find(s => 
    s.name.includes('Por assento')
  );
  
  if (porAssentoService) {
    console.log('\n=== TESTING "POR ASSENTO" SERVICE ===');
    console.log('Service found:', porAssentoService.name);
    console.log('Service prices structure:', porAssentoService.prices);
    console.log('Requer quantidade:', porAssentoService.requer_quantidade);
    console.log('Valor unitário:', porAssentoService.valor_unitario);
    
    for (let qty = 1; qty <= 3; qty++) {
      const price = calculateServicePrice(porAssentoService, 'car', 'Médio', qty);
      console.log(`${qty} assento(s): R$ ${typeof price === 'number' ? price.toFixed(2) : price}`);
    }
  } else {
    console.log('❌ ERRO: Serviço "Por assento" não encontrado');
  }
  
} catch (error) {
  console.error('Erro durante o teste:', error.message);
  console.error('Stack trace:', error.stack);
}
