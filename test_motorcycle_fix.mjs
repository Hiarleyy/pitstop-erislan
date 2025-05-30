import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read services data
const servicesPath = path.join(__dirname, 'src/data/services.json');
const servicesData = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));

console.log("🔍 TESTING MOTORCYCLE SERVICES FIX\n");

// Test 1: Check if motorcycle categories exist and have services
const motoServices = servicesData.filter(service => service.categoria === "moto");
const motoAdicionaisServices = servicesData.filter(service => service.categoria === "servicos_adicionais_moto");

console.log("1. Motorcycle Categories Data:");
console.log(`   - Moto category services: ${motoServices.length}`);
console.log(`   - Adicionais Moto category services: ${motoAdicionaisServices.length}`);

if (motoServices.length > 0) {
  console.log("   ✅ Moto category has services:");
  motoServices.forEach((service, index) => {
    console.log(`      ${index + 1}. ${service.titulo}`);
  });
} else {
  console.log("   ❌ No services found in moto category");
}

if (motoAdicionaisServices.length > 0) {
  console.log("   ✅ Adicionais Moto category has services:");
  motoAdicionaisServices.forEach((service, index) => {
    console.log(`      ${index + 1}. ${service.titulo}`);
  });
} else {
  console.log("   ❌ No services found in servicos_adicionais_moto category");
}

// Test 2: Check if serviceHelpers properly maps categories
const serviceHelpersPath = path.join(__dirname, 'src/lib/serviceHelpers.ts');
const serviceHelpersContent = fs.readFileSync(serviceHelpersPath, 'utf8');

console.log("\n2. ServiceHelpers Configuration:");
const hasMotoCategory = serviceHelpersContent.includes('moto: {');
const hasAdicionaisMotoCategory = serviceHelpersContent.includes('servicos_adicionais_moto: {');

console.log(`   - Moto category in serviceHelpers: ${hasMotoCategory ? '✅' : '❌'}`);
console.log(`   - Adicionais Moto category in serviceHelpers: ${hasAdicionaisMotoCategory ? '✅' : '❌'}`);

// Test 3: Check Booking.tsx tab logic
const bookingPath = path.join(__dirname, 'src/components/Booking.tsx');
const bookingContent = fs.readFileSync(bookingPath, 'utf8');

console.log("\n3. Booking Component Tab Logic:");
const hasCorrectDefaultValue = bookingContent.includes("defaultValue={getSelectedVehicle()?.type === 'motorcycle' ? 'moto' : 'lavagem'}");
const hasCorrectValueLogic = bookingContent.includes("selectedCategory === 'moto' || selectedCategory === 'servicos_adicionais_moto'");
const hasCorrectCategoryCheck = bookingContent.includes("const isMotorcycleCategory = value === 'moto' || value === 'servicos_adicionais_moto'");

console.log(`   - Correct defaultValue logic: ${hasCorrectDefaultValue ? '✅' : '❌'}`);
console.log(`   - Correct value logic: ${hasCorrectValueLogic ? '✅' : '❌'}`);
console.log(`   - Correct category check: ${hasCorrectCategoryCheck ? '✅' : '❌'}`);

// Summary
console.log("\n📋 SUMMARY:");
const allTestsPassed = motoServices.length > 0 && 
                      motoAdicionaisServices.length > 0 && 
                      hasMotoCategory && 
                      hasAdicionaisMotoCategory && 
                      hasCorrectDefaultValue && 
                      hasCorrectValueLogic && 
                      hasCorrectCategoryCheck;

if (allTestsPassed) {
  console.log("🎉 ALL TESTS PASSED! The motorcycle services bug should be fixed.");
  console.log("   - Motorcycle categories have services ✅");
  console.log("   - ServiceHelpers configuration is correct ✅");
  console.log("   - Booking component tab logic is fixed ✅");
} else {
  console.log("❌ Some tests failed. Please check the issues above.");
}

console.log("\n🚀 You can now test in the browser:");
console.log("   1. Add a motorcycle to your booking");
console.log("   2. Check if 'Motos' and 'Adicionais Motos' tabs show services");
console.log("   3. Verify that tab switching works properly");
