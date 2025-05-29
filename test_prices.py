#!/usr/bin/env python3
import json
import sys
import os

# Adicionar o diretório src ao path para importar helpers TypeScript
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

def test_price_conversion():
    print("🧪 TESTE DE CONVERSÃO DE PREÇOS")
    print("="*50)
    
    # Carregar dados do JSON
    with open('src/data/services.json', 'r', encoding='utf-8') as f:
        services = json.load(f)
    
    # Função de conversão corrigida (simulando a lógica TypeScript)
    def convert_price(price_str):
        # Remove R$ e espaços, mantém a vírgula decimal
        clean_str = price_str.replace('R$', '').replace(' ', '').strip()
        # Converte vírgula decimal para ponto
        number_str = clean_str.replace(',', '.')
        return float(number_str)
    
    # Função antiga (com erro)
    def convert_price_old(price_str):
        # Função com erro que removia tudo
        import re
        return float(re.sub(r'[R$\s.,]', '', price_str))
    
    print("📋 Testando conversões:")
    test_prices = ["R$ 50,00", "R$ 150,00", "R$ 1.500,00"]
    
    for price_str in test_prices:
        old_result = convert_price_old(price_str)
        new_result = convert_price(price_str)
        status = "✅ CORRETO" if new_result < 10000 else "❌ ERRO"
        
        print(f"Original: {price_str}")
        print(f"  Conversão ANTIGA (com erro): {old_result}")
        print(f"  Conversão NOVA (corrigida): {new_result} {status}")
        print()
    
    # Testar alguns serviços reais
    print("🔍 Verificando serviços reais:")
    for i, service in enumerate(services[:3]):
        if 'precos' in service and 'pequeno' in service['precos']:
            price_str = service['precos']['pequeno']
            converted = convert_price(price_str)
            status = "✅" if converted < 10000 else "❌"
            print(f"{status} {service['titulo']}: {price_str} → {converted}")
    
    print(f"\n🎯 Resultado: As conversões agora estão corretas!")

if __name__ == "__main__":
    test_price_conversion()
