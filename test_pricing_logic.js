// Teste direto da função calculateServicePrice
import { calculateServicePrice, getServiceCategories } from './src/lib/serviceHelpers.ts';

console.log('=== TESTE DA CORREÇÃO DO PREÇO "TODOS OS BANCOS" ===\n');

try {
  const categories = getServiceCategories();
  const higienizacaoServices = categories.higienizacao?.services || [];
  
  console.log('Serviços de higienização encontrados:');
  higienizacaoServices.forEach((service, index) => {
    if (service.name.includes('Higienização de Bancos')) {
      console.log(`${index + 1}. ${service.name}`);
      console.log(`   Preços:`, service.prices);
      console.log(`   Requer quantidade: ${service.requer_quantidade}`);
      console.log(`   Valor unitário: ${service.valor_unitario}`);
    }
  });
  
  // Encontrar o serviço "Todos os bancos"
  const todosOsBancosService = higienizacaoServices.find(s => 
    s.name.includes('Todos os bancos')
  );
  
  if (todosOsBancosService) {
    console.log('\n=== TESTE DO SERVIÇO "TODOS OS BANCOS" ===');
    console.log('Serviço encontrado:', todosOsBancosService.name);
    console.log('Estrutura de preços:', todosOsBancosService.prices);
    
    // Testar com diferentes portes
    const portes = ['Pequeno', 'Médio', 'Grande'];
    portes.forEach(porte => {
      const preco = calculateServicePrice(todosOsBancosService, 'car', porte);
      console.log(`${porte}: R$ ${preco}`);
    });
    
    if (Object.values(todosOsBancosService.prices || {}).includes(200)) {
      console.log('\n✅ CORREÇÃO APLICADA: Preço R$ 200,00 encontrado na estrutura');
    } else {
      console.log('\n❌ PROBLEMA: Preço R$ 200,00 não encontrado');
    }
  } else {
    console.log('\n❌ ERRO: Serviço "Todos os bancos" não encontrado');
  }
  
  // Encontrar o serviço "Por assento"
  const porAssentoService = higienizacaoServices.find(s => 
    s.name.includes('Por assento')
  );
  
  if (porAssentoService) {
    console.log('\n=== TESTE DO SERVIÇO "POR ASSENTO" ===');
    console.log('Serviço encontrado:', porAssentoService.name);
    console.log('Estrutura de preços:', porAssentoService.prices);
    
    // Testar com diferentes quantidades
    for (let qty = 1; qty <= 3; qty++) {
      const preco = calculateServicePrice(porAssentoService, 'car', 'Médio', qty);
      console.log(`${qty} assento(s): R$ ${preco}`);
    }
  }
  
} catch (error) {
  console.error('Erro durante o teste:', error.message);
}

console.log('\n=== FIM DO TESTE ===');
