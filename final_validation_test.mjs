import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log("🔧 FINAL VALIDATION - MOTORCYCLE ADDITIONAL SERVICES PRICING\n");

// 1. Read the services data
const servicesPath = join(__dirname, 'src', 'data', 'services.json');
const servicesData = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));

// 2. Read the updated serviceHelpers.ts
const helpersPath = join(__dirname, 'src', 'lib', 'serviceHelpers.ts');
const helpersContent = fs.readFileSync(helpersPath, 'utf8');

console.log("📊 STEP 1: Service Data Verification");
console.log("====================================");

const motoAdicionais = servicesData.filter(service => service.categoria === 'servicos_adicionais_moto');
console.log(`✅ Found ${motoAdicionais.length} motorcycle additional services`);

motoAdicionais.forEach((service, index) => {
  console.log(`  ${index + 1}. ${service.titulo}`);
  if (service.precos.valor_fixo) {
    console.log(`     Price: ${service.precos.valor_fixo} (valor_fixo)`);
  } else if (service.precos.a_partir_de) {
    console.log(`     Price: ${service.precos.a_partir_de} (a_partir_de)`);
  }
});

console.log("\n🔧 STEP 2: Code Fix Verification");
console.log("=================================");

// Check if the problematic logic was fixed
const hasOldBuggyLogic = helpersContent.includes("categoryKey === 'moto' || categoryKey === 'servicos_adicionais_moto'");
const hasNewSeparateLogic = helpersContent.includes("if (categoryKey === 'moto' && prices)");

console.log(`❌ Old buggy logic removed: ${!hasOldBuggyLogic ? '✅ YES' : '❌ NO'}`);
console.log(`✅ New separate logic added: ${hasNewSeparateLogic ? '✅ YES' : '❌ NO'}`);

if (hasNewSeparateLogic && !hasOldBuggyLogic) {
  console.log("🎉 Code fix successfully applied!");
} else {
  console.log("⚠️  Code fix may have issues");
}

console.log("\n📝 STEP 3: Expected Behavior");
console.log("============================");
console.log("✅ Motorcycle services ('moto'): Convert to size categories");
console.log("✅ Motorcycle additional services ('servicos_adicionais_moto'): Keep original format");
console.log("✅ Prices should show as 'Valor Fixo' or 'A Partir De' with actual values");

console.log("\n🧪 STEP 4: Manual Testing Required");
console.log("==================================");
console.log("1. Open http://localhost:5173/");
console.log("2. Go to 'Serviços' section");
console.log("3. Select 'Motos' category");
console.log("4. Check 'Adicionais Motos' prices");
console.log("5. Verify prices are NOT R$ 0,00 anymore");

console.log("\n📋 Expected Prices:");
motoAdicionais.forEach((service) => {
  const price = service.precos.valor_fixo || service.precos.a_partir_de || 'N/A';
  console.log(`   - ${service.titulo}: ${price}`);
});

console.log("\n✅ VALIDATION COMPLETE");
console.log("======================");
console.log("If the manual test shows correct prices, both bugs are now fixed!");
