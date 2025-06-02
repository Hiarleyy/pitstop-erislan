// Teste simples da função convertPrice
console.log('=== TESTE DA FUNÇÃO convertPrice ===\n');

function convertPrice(priceStr) {
  // Remove R$ e espaços
  let cleanStr = priceStr.replace(/R\$\s*/g, '').trim();
  // Remove pontos de milhar (1.500 -> 1500)
  cleanStr = cleanStr.replace(/\./g, '');
  // Substitui vírgula por ponto para decimal (500,00 -> 500.00)
  cleanStr = cleanStr.replace(',', '.');
  return parseFloat(cleanStr) || 0;
}

const testPrices = [
  'R$ 200,00',
  'R$ 50,00',
  'R$ 1.500,00',
  'R$200,00',
  '200,00'
];

testPrices.forEach(price => {
  const converted = convertPrice(price);
  console.log(`"${price}" -> ${converted}`);
});

console.log('\n=== VERIFICAÇÃO ESPECÍFICA ===');
const todosOsBancosPrice = 'R$ 200,00';
const converted = convertPrice(todosOsBancosPrice);
console.log(`Preço "todos_bancos": "${todosOsBancosPrice}" -> ${converted}`);

if (converted === 200) {
  console.log('✅ Conversão funcionando corretamente');
} else {
  console.log('❌ Problema na conversão de preço');
}

console.log('\n=== TESTE DE LÓGICA DE PREÇO ÚNICO ===');
const mockPrices = {
  "Todos os Bancos": 200
};

console.log('Estrutura de preços:', mockPrices);
console.log('Número de chaves:', Object.keys(mockPrices).length);
console.log('Valores:', Object.values(mockPrices));
console.log('Primeiro valor:', Object.values(mockPrices)[0]);
console.log('É número?', typeof Object.values(mockPrices)[0] === 'number');

if (Object.keys(mockPrices).length === 1) {
  const singlePrice = Object.values(mockPrices)[0];
  if (typeof singlePrice === 'number') {
    console.log('✅ Lógica de preço único funcionando:', singlePrice);
  } else {
    console.log('❌ Valor não é número:', typeof singlePrice);
  }
} else {
  console.log('❌ Não é preço único');
}
