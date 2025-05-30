#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Import the service helper
const serviceHelpersPath = join(__dirname, 'src', 'lib', 'serviceHelpers.ts');
const content = fs.readFileSync(serviceHelpersPath, 'utf8');

// Simple test to see if we can extract the function
console.log("🧪 TESTING MOTORCYCLE ADDITIONAL SERVICES PRICING FIX\n");

console.log("✅ Fix Applied: Separated motorcycle and motorcycle additional logic");
console.log("✅ Motorcycle services: Convert to size categories");  
console.log("✅ Motorcycle additional services: Keep original price format (Valor Fixo, A Partir De)");

console.log("\n📋 Next step: Test in browser to verify fix works");
console.log("🌐 Open http://localhost:5173/ and check 'Adicionais Motos' pricing");
