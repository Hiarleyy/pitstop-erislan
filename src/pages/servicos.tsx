import {Car, Wrench, Shield, Camera, Bike,SparkleIcon,Droplet,Lightbulb } from "lucide-react";
import { Button } from '@/components/ui/button';
import Navbar from "@/components/Navbar";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";

// Definindo o tipo para nossos serviços com categoria
type Servico = {
  titulo: string;
  descricao: string;
  icone: "car" | "wrench" | "shield" | "camera" | "bike" | "sparkles" | "cleaning" | "droplet"| "lightbulb";
  categoria: "carro" | "moto" | "vitrificacao" | "higienizacao" | "polimento" | "lavagem";
}

const servicos = () => {
  // Array de dados para os cards com categorias
  const todosServicos: Servico[] = [
    // Serviços para carros
    {
      titulo: "Troca de Óleo",
      descricao: "Serviço de troca de óleo e filtros",
      icone: "car",
      categoria: "carro"
    },
    {
      titulo: "Mecânica Geral",
      descricao: "Reparo e manutenção de motores",
      icone: "car",
      categoria: "carro"
    },
    {
      titulo: "Revisão Preventiva",
      descricao: "Revisão completa para seu veículo",
      icone: "car",
      categoria: "carro"
    },
    {
      titulo: "Diagnóstico Eletrônico",
      descricao: "Análise completa dos sistemas do carro",
      icone: "car",
      categoria: "carro"
    },
    {
      titulo: "Alinhamento",
      descricao: "Alinhamento e balanceamento",
      icone: "car",
      categoria: "carro"
    },
    {
      titulo: "Serviços Elétricos",
      descricao: "Reparos no sistema elétrico",
      icone: "car",
      categoria: "carro"
    },
    
    // Serviços para motos
    {
      titulo: "Lavagem - Biz/Pop",
      descricao: "Lavagem básica para motos Biz ou Pop (R$20,00)",
      icone: "bike",
      categoria: "moto"
    },
    {
      titulo: "Lavagem - Titan, Fan, Bros (125/150/160)",
      descricao: "Lavagem básica para motos de baixa cilindrada (R$25,00)",
      icone: "bike",
      categoria: "moto"
    },
    {
      titulo: "Lavagem - Fazer, CB, Twister, XRE (250–300)",
      descricao: "Lavagem para motos intermediárias (R$30,00)",
      icone: "bike",
      categoria: "moto"
    },
    {
      titulo: "Lavagem - Motos de 300cc até 600cc",
      descricao: "Lavagem para motos médias (R$40,00)",
      icone: "bike",
      categoria: "moto"
    },
    {
      titulo: "Lavagem - Motos acima de 600cc",
      descricao: "Lavagem completa para motos de alta cilindrada (R$50,00)",
      icone: "bike",
      categoria: "moto"
    },
    {
      titulo: "Lavagem Detalhada de Moto",
      descricao: "Desmontagem parcial e detalhamento completo (dobro do valor da lavagem básica)",
      icone: "sparkles",
      categoria: "moto"
    },
    {
      titulo: "Vitrificação de Moto",
      descricao: "Varia entre R$150,00 e R$250,00 conforme o modelo e necessidade",
      icone: "shield",
      categoria: "moto"
    },
    {
      titulo: "Polimento de Tanque",
      descricao: "Polimento do tanque da moto (R$40,00)",
      icone: "sparkles",
      categoria: "moto"
    },
    {
      titulo: "Polimento de Moto (geral)",
      descricao: "Serviço completo de polimento da moto a partir de R$60,00",
      icone: "sparkles",
      categoria: "moto"
    },
    {
      titulo: "Aplicação de Cera V80",
      descricao: "Finalização com cera especial V80 (R$10,00)",
      icone: "droplet",
      categoria: "moto"
    },
    //servicos de vitrificacao
    {
      titulo: "Polimento Comercial",
      descricao: "Polimento comercial com acabamento padrão (P: R$200, M: R$250, G: R$300)",
      icone: "shield",
      categoria: "vitrificacao"
    },
    {
      titulo: "Polimento Técnico",
      descricao: "Polimento técnico com acabamento detalhado (P: R$300, M: R$400, G: R$500)",
      icone: "shield",
      categoria: "vitrificacao"
    },
    {
      titulo: "Vitrificação Vonixx",
      descricao: "Aplicação de vitrificação com produtos Vonixx (P: R$1.300, M: R$1.500, G: R$1.700)",
      icone: "shield",
      categoria: "vitrificacao"
    },
    {
      titulo: "Vitrificação Car Pro",
      descricao: "Proteção premium com vitrificação Car Pro (P: R$1.800, M: R$2.200, G: R$2.500)",
      icone: "shield",
      categoria: "vitrificacao"
    },
    // Serviços adicionais - higienização
    {
      titulo: "Limpeza de Bancos de Couro",
      descricao: "Limpeza especializada para bancos de couro (R$120,00)",
      icone: "cleaning",
      categoria: "higienizacao"
    },
    {
      titulo: "Condicionamento Hidratante para Couro",
      descricao: "Aplicação de hidratante para manter o couro conservado (R$20,00)",
      icone: "cleaning",
      categoria: "higienizacao"
    },
    {
      titulo: "Limpeza de Bancos de Tecido",
      descricao: "Higienização profunda dos bancos de tecido (R$180,00)",
      icone: "cleaning",
      categoria: "higienizacao"
    },
    {
      titulo: "Limpeza de Teto e Colunas",
      descricao: "Higienização do teto e colunas internas do veículo (R$80,00)",
      icone: "cleaning",
      categoria: "higienizacao"
    },
    {
      titulo: "Painel, Portas e Condicionamento de Plásticos",
      descricao: "Limpeza e acabamento em plásticos internos (R$40,00)",
      icone: "cleaning",
      categoria: "higienizacao"
    },
    {
      titulo: "Impermeabilização de Bancos",
      descricao: "Proteção contra líquidos e manchas em bancos (R$300,00)",
      icone: "shield",
      categoria: "higienizacao"
    },
    {
      titulo: "Limpeza de Carpete e Feltro",
      descricao: "Remoção de sujeiras profundas do carpete e feltro (R$100,00)",
      icone: "cleaning",
      categoria: "higienizacao"
    },
    {
      titulo: "Combo Higienização + Lavagem + Cera",
      descricao: "Combo completo com higienização interna + lavagem e aplicação de cera (P: R$300, M: R$350, G: R$400)",
      icone: "sparkles",
      categoria: "higienizacao"
    },
    {
      titulo: "Combo Higienização + Lavagem Geral",
      descricao: "Combo completo com higienização interna e lavagem geral (P: R$400, M: R$450, G: R$500)",
      icone: "sparkles",
      categoria: "higienizacao"
    },
    // Serviços adicionais - lavagem
    {
      titulo: "Lavagem Tradicional",
      descricao: "Shampoo, aspiração, condicionador de plásticos e pneus, aromatizante (P: R$40, M: R$60, G: R$80)",
      icone: "droplet",
      categoria: "lavagem"
    },
    {
      titulo: "Lavagem Clássica",
      descricao: "Shampoo, cera limpadora, aspiração, plástico, pneus e aromatizante (P: R$50, M: R$70, G: R$90)",
      icone: "droplet",
      categoria: "lavagem"
    },
    {
      titulo: "Lavagem Premium",
      descricao: "Chassi, cera premium, aspiração, plásticos internos/externos, selante pneus e aromatizante (P: R$80, M: R$100, G: R$120)",
      icone: "sparkles",
      categoria: "lavagem"
    },
    // Serviços adicionais - detalhamento/especial
    {
      titulo: "Lavagem de Chassi",
      descricao: "Limpeza completa da parte inferior do veículo (R$40,00)",
      icone: "wrench",
      categoria: "lavagem"
    },
    {
      titulo: "Anticorrosivo para Chassi",
      descricao: "Aplicação de proteção anticorrosiva no chassi (R$30,00)",
      icone: "shield",
      categoria: "lavagem"
    },
    {
      titulo: "Lavagem de Motor + Proteção",
      descricao: "Limpeza segura do motor com aplicação de proteção (R$50,00)",
      icone: "droplet",
      categoria: "lavagem"
    },
    {
      titulo: "Impermeabilização para Brisa",
      descricao: "Aplicação de produto repelente de água no para-brisa (R$50,00)",
      icone: "shield",
      categoria: "lavagem"
    },
    {
      titulo: "Polimento de Faróis",
      descricao: "Restauração e polimento dos faróis (R$120,00)",
      icone: "lightbulb",
      categoria: "lavagem"
    },
    {
      titulo: "Vitrificação de Faróis",
      descricao: "Aplicação de vitrificação para proteção dos faróis (R$50,00)",
      icone: "shield",
      categoria: "lavagem"
    }



    

      
  ];

  // Função para renderizar o ícone correto
  const renderIcon = (iconType: string) => {
    switch(iconType) {
      case "car":
        return <Car className="ml-auto w-4 h-4" />;
      case "wrench":
        return <Wrench className="ml-auto w-4 h-4" />;
      case "shield":
        return <Shield className="ml-auto w-4 h-4" />;
      case "camera":
        return <Camera className="ml-auto w-4 h-4" />;
      case "bike":
        return <Bike className="ml-auto w-4 h-4" />;
      case "sparkles":
        return <SparkleIcon className="ml-auto w-4 h-4" />;
      case "droplet":
        return <Droplet className="ml-auto w-4 h-4" />;
      case "lightbulb":
        return <Lightbulb className="ml-auto w-4 h-4" />;  
        default:
        return <Car className="ml-auto w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-auto-lightgray">
      <ScrollToTop />
      <div className="min-h-screen container mx-auto px-4 py-10">
        {/* SECAO DE SERVIÇOS PARA CARROS */}
        <h1 className="text-4xl font-bold text-center py-10 mt-10">Serviços Para Carros</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {todosServicos
            .filter(servico => servico.categoria === "carro")
            .map((servico, index) => (
              <Card 
              key={index} 
              className="flex-1 bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-blue-400 hover:bg-blue-100"
              >
                <CardHeader>
                  <div className="flex items-center justify-center">
                    <CardTitle className="text-lg sm:text-xl text-gray-600 select-none">
                      {servico.titulo}
                    </CardTitle>
                    {renderIcon(servico.icone)}
                  </div>
                  <CardDescription>
                    {servico.descricao}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
        </div>

        {/* SECAO DE SERVIÇOS PARA MOTOS */}
        <h1 className="text-4xl font-bold text-center py-10 mt-10">Serviços Para Motos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {todosServicos
            .filter(servico => servico.categoria === "moto")
            .map((servico, index) => (
              <Card 
              key={index} 
              className="flex-1 bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-blue-400 hover:bg-blue-100"
              >
                <CardHeader>
                  <div className="flex items-center justify-center">
                    <CardTitle className="text-lg sm:text-xl text-gray-600 select-none">
                      {servico.titulo}
                    </CardTitle>
                    {renderIcon(servico.icone)}
                  </div>
                  <CardDescription>
                    {servico.descricao}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
        </div>

         {/* SECAO DE SERVIÇOS PARA VITRIFICACAO */}
         <h1 className="text-4xl font-bold text-center py-10 mt-10">Serviços de Vitrificação </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {todosServicos
            .filter(servico => servico.categoria === "vitrificacao")
            .map((servico, index) => (
              <Card 
              key={index} 
              className="flex-1 bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-blue-400 hover:bg-blue-100"
              >
                <CardHeader>
                  <div className="flex items-center justify-center">
                    <CardTitle className="text-lg sm:text-xl text-gray-600 select-none">
                      {servico.titulo}
                    </CardTitle>
                    {renderIcon(servico.icone)}
                  </div>
                  <CardDescription>
                    {servico.descricao}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
        </div>


        {/* SECAO DE SERVIÇOS DE HIGIENIZACAO */}
        <h1 className="text-4xl font-bold text-center py-10 mt-10">Serviços de Higienizacao </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {todosServicos
            .filter(servico => servico.categoria === "higienizacao")
            .map((servico, index) => (
              <Card 
              key={index} 
              className="flex-1 bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-blue-400 hover:bg-blue-100"
              >
                <CardHeader>
                  <div className="flex items-center justify-center">
                    <CardTitle className="text-lg sm:text-xl text-gray-600 select-none">
                      {servico.titulo}
                    </CardTitle>
                    {renderIcon(servico.icone)}
                  </div>
                  <CardDescription>
                    {servico.descricao}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
        </div>

        {/* SECAO DE SERVIÇOS DE LAVAGEM */}
        <h1 className="text-4xl font-bold text-center py-10 mt-10">Serviços de Lavagem </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {todosServicos
            .filter(servico => servico.categoria === "lavagem")
            .map((servico, index) => (
              <Card 
              key={index} 
              className="flex-1 bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-blue-400 hover:bg-blue-100"
              >
                <CardHeader>
                  <div className="flex items-center justify-center">
                    <CardTitle className="text-lg sm:text-xl text-gray-600 select-none">
                      {servico.titulo}
                    </CardTitle>
                    {renderIcon(servico.icone)}
                  </div>
                  <CardDescription>
                    {servico.descricao}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button asChild className="btn-gradient text-lg py-6 px-8">
              <a href="/#booking">Agendar Serviço</a>
            </Button>
            </div>
      </div>
      <Navbar />
      <Footer />
    </div>
  );
};

export default servicos;
