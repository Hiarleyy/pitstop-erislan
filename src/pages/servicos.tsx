import {Car, Wrench, Shield, Camera, Bike } from "lucide-react";

import Navbar from "@/components/Navbar";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";

// Definindo o tipo para nossos serviços com categoria
type Servico = {
  titulo: string;
  descricao: string;
  icone: "car" | "wrench" | "shield" | "camera" | "bike";
  categoria: "carro" | "moto" | "vitrificacao" | "Higienizacao" | "polimento" | "tecnicos";
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
      icone: "wrench",
      categoria: "carro"
    },
    {
      titulo: "Revisão Preventiva",
      descricao: "Revisão completa para seu veículo",
      icone: "shield",
      categoria: "carro"
    },
    {
      titulo: "Diagnóstico Eletrônico",
      descricao: "Análise completa dos sistemas do carro",
      icone: "camera",
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
      icone: "wrench",
      categoria: "carro"
    },
    
    // Serviços para motos
    {
      titulo: "Troca de Óleo para Motos",
      descricao: "Troca especializada de óleo para motocicletas",
      icone: "bike",
      categoria: "moto"
    },
    {
      titulo: "Manutenção de Corrente",
      descricao: "Lubrificação e ajuste de corrente",
      icone: "wrench",
      categoria: "moto"
    },
    {
      titulo: "Troca de Pneus",
      descricao: "Substituição de pneus para motocicletas",
      icone: "bike",
      categoria: "moto"
    },
    {
      titulo: "Revisão Completa",
      descricao: "Check-up completo da sua motocicleta",
      icone: "shield",
      categoria: "moto"
    },
    {
      titulo: "Revisão Completa",
      descricao: "Check-up completo da sua motocicleta",
      icone: "shield",
      categoria: "vitrificacao"
    },
    {
      titulo: "Revisão Completa",
      descricao: "Check-up completo da sua motocicleta",
      icone: "shield",
      categoria: "vitrificacao"
    },
    {
      titulo: "Revisão Completa",
      descricao: "Check-up completo da sua motocicleta",
      icone: "shield",
      categoria: "vitrificacao"
    },
    {
      titulo: "Revisão Completa",
      descricao: "Check-up completo da sua motocicleta",
      icone: "shield",
      categoria: "vitrificacao"
    },
    
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
              <Card key={index} className="flex-1">
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
              <Card key={index} className="flex-1">
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
              <Card key={index} className="flex-1">
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


      </div>
      <Navbar />
      <Footer />
    </div>
  );
};

export default servicos;
