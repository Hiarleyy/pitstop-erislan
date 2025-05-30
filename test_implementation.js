// Test the new functionality
import { getServiceCategories, calculateServicePrice } from './src/lib/serviceHelpers.js';

// Test the service data processing
const categories = getServiceCategories();

// Find Tapetes Residenciais service
const higienizacaoResidencial = categories['higienizacao_residencial'];
const tapetesService = higienizacaoResidencial.services.find(s => s.name === 'Tapetes Residenciais');
const travesseirosService = higienizacaoResidencial.services.find(s => s.name === 'Travesseiros e Almofadas');

console.log('=== Testing Tapetes Residenciais ===');
console.log('Service data:', tapetesService);
console.log('Has valor_a_combinar flag:', tapetesService?.valor_a_combinar);

console.log('\n=== Testing Travesseiros e Almofadas ===');
console.log('Service data:', travesseirosService);
console.log('Requires quantity:', travesseirosService?.requer_quantidade);
console.log('Unit value:', travesseirosService?.valor_unitario);

// Test price calculation with quantity
console.log('\n=== Testing Price Calculation ===');
const vehicle = { type: 'car', size: 'Pequeno' };

if (tapetesService) {
    const tapetesPrice = calculateServicePrice(tapetesService, vehicle.type, vehicle.size, 1);
    console.log('Tapetes price:', tapetesPrice);
}

if (travesseirosService) {
    const travesseirosPrice1 = calculateServicePrice(travesseirosService, vehicle.type, vehicle.size, 1);
    const travesseirosPrice3 = calculateServicePrice(travesseirosService, vehicle.type, vehicle.size, 3);
    console.log('Travesseiros price (1 unit):', travesseirosPrice1);
    console.log('Travesseiros price (3 units):', travesseirosPrice3);
}
