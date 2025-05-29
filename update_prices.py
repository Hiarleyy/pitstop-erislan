#!/usr/bin/env python3
import json

# Mapeamento dos preços corretos baseado na tabela CSV
price_updates = {
    "Lavagem Clássica": {"pequeno": "R$ 50,00", "medio": "R$ 60,00", "grande": "R$ 70,00"},
    "Lavagem Premium": {"pequeno": "R$ 80,00", "medio": "R$ 90,00", "grande": "R$ 100,00"},
    "Lavagem Premium Geral (Pacote)": {"pequeno": "R$ 150,00", "medio": "R$ 160,00", "grande": "R$ 170,00"},
    "Polimento de Entrada": {"pequeno": "R$ 250,00", "medio": "R$ 300,00", "grande": "R$ 350,00"},
    "Polimento Técnico (Premium)": {"pequeno": "R$ 450,00", "medio": "R$ 500,00", "grande": "R$ 550,00"},
    "Vitrificação 1 Ano": {"pequeno": "R$ 700,00", "medio": "R$ 800,00", "grande": "R$ 900,00"},
    "Vitrificação 3 Anos": {"pequeno": "R$ 1.500,00", "medio": "R$ 1.700,00", "grande": "R$ 1.900,00"},
    "Higienização Interna": {"pequeno": "R$ 250,00", "medio": "R$ 300,00", "grande": "R$ 350,00"},
    "Higienização Profunda": {"pequeno": "R$ 350,00", "medio": "R$ 450,00", "grande": "R$ 550,00"},
    "Lavagem Clássica - Motos": {"pequeno": "R$ 25,00", "medio": "R$ 30,00", "grande": "R$ 40,00"},
    "Lavagem Premium - Motos": {"pequeno": "R$ 80,00", "medio": "R$ 100,00", "grande": "R$ 120,00"},
    "Vitrificação - Motos": {"pequeno": "R$ 250,00", "medio": "R$ 300,00", "grande": "R$ 350,00"}
}

def update_services_prices():
    print("🔄 Iniciando atualização de preços...")
    
    # Carregar o arquivo JSON
    try:
        with open('src/data/services.json', 'r', encoding='utf-8') as f:
            services = json.load(f)
        print(f"📁 Arquivo carregado com {len(services)} serviços")
    except Exception as e:
        print(f"❌ Erro ao carregar arquivo: {e}")
        return
    
    # Atualizar os preços
    updated_count = 0
    for service in services:
        title = service.get('titulo')
        if title in price_updates:
            old_prices = service['precos'].copy()
            service['precos'] = price_updates[title]
            print(f"✓ Atualizado: {title}")
            print(f"  Antes: {old_prices}")
            print(f"  Depois: {service['precos']}")
            updated_count += 1
        else:
            print(f"⚠️  Não encontrado na tabela: {title}")
    
    # Salvar o arquivo atualizado
    try:
        with open('src/data/services.json', 'w', encoding='utf-8') as f:
            json.dump(services, f, indent=2, ensure_ascii=False)
        print(f"\n✅ Arquivo services.json atualizado com {updated_count} serviços!")
    except Exception as e:
        print(f"❌ Erro ao salvar arquivo: {e}")

if __name__ == "__main__":
    update_services_prices()
