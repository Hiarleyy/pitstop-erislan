// Test script to verify all three final requirements
const fs = require('fs');
const path = require('path');

console.log("=== TESTING FINAL REQUIREMENTS ===\n");

// Read services data
const servicesPath = path.join(__dirname, 'src/data/services.json');
const servicesData = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));

// Test 1: Verify "Tapetes Residenciais" has both "a partir de" and "valor a combinar"
console.log("1. Testing Tapetes Residenciais pricing:");
const tapetesService = servicesData.find(service => service.titulo === "Tapetes Residenciais");
if (tapetesService) {
  console.log("✅ Service found:", tapetesService.titulo);
  console.log("   - Base price:", tapetesService.precos.a_partir_de);
  console.log("   - Valor a combinar:", tapetesService.precos.valor_a_combinar);
  
  if (tapetesService.precos.a_partir_de && tapetesService.precos.valor_a_combinar) {
    console.log("✅ REQUIREMENT 1 PASSED: Tapetes has both pricing options\n");
  } else {
    console.log("❌ REQUIREMENT 1 FAILED: Missing pricing flags\n");
  }
} else {
  console.log("❌ Tapetes Residenciais service not found\n");
}

// Test 2: Verify "Travesseiros e Almofadas" has quantity input functionality
console.log("2. Testing Travesseiros e Almofadas quantity system:");
const travesseirosService = servicesData.find(service => service.titulo === "Travesseiros e Almofadas");
if (travesseirosService) {
  console.log("✅ Service found:", travesseirosService.titulo);
  console.log("   - Unit price:", travesseirosService.precos.valor_unitario);
  console.log("   - Requires quantity:", travesseirosService.precos.requer_quantidade);
  
  if (travesseirosService.precos.valor_unitario && travesseirosService.precos.requer_quantidade) {
    console.log("✅ REQUIREMENT 2 PASSED: Travesseiros has quantity functionality\n");
  } else {
    console.log("❌ REQUIREMENT 2 FAILED: Missing quantity system flags\n");
  }
} else {
  console.log("❌ Travesseiros e Almofadas service not found\n");
}

// Test 3: Verify category structure and motorcycle services
console.log("3. Testing category structure and motorcycle services:");

// Check if motorcycle categories exist
const motoServices = servicesData.filter(service => service.categoria === "moto");
const motoAdicionaisServices = servicesData.filter(service => service.categoria === "servicos_adicionais_moto");

console.log("   - Moto category services count:", motoServices.length);
console.log("   - Adicionais Moto category services count:", motoAdicionaisServices.length);

if (motoServices.length > 0 && motoAdicionaisServices.length > 0) {
  console.log("✅ Both motorcycle categories have services");
  
  // Check serviceHelpers category ordering
  const serviceHelpersPath = path.join(__dirname, 'src/lib/serviceHelpers.ts');
  const serviceHelpersContent = fs.readFileSync(serviceHelpersPath, 'utf8');
  
  // Check if moto categories are placed at the end
  const categoryMapMatch = serviceHelpersContent.match(/const categoryMap[\s\S]*?};/);
  if (categoryMapMatch) {
    const categoryMapStr = categoryMapMatch[0];
    const motoIndex = categoryMapStr.indexOf('moto: {');
    const adicionaisMotoIndex = categoryMapStr.indexOf('servicos_adicionais_moto: {');
    
    if (motoIndex > -1 && adicionaisMotoIndex > -1 && Math.abs(motoIndex - adicionaisMotoIndex) < 500) {
      console.log("✅ REQUIREMENT 3 PASSED: Motorcycle categories are side by side\n");
    } else {
      console.log("❌ REQUIREMENT 3 FAILED: Motorcycle categories not properly positioned\n");
    }
  }
} else {
  console.log("❌ REQUIREMENT 3 FAILED: Missing motorcycle services\n");
}

console.log("=== SUMMARY ===");
console.log("All tests completed. Check above for individual results.");
console.log("If all requirements show PASSED, the implementation is complete!");
