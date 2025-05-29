import {
  Car,
  Wrench,
  Shield,
  Camera,
  Bike,
  SparkleIcon,
  Droplet,
  Lightbulb,
  SprayCan,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

// Import dinâmico com verificação de erro
import servicosData from "@/data/services.json";

// Definindo o tipo para nossos serviços com categoria
type Servico = {
  titulo: string;
  descricao: string;
  icone:
    | "car"
    | "wrench"
    | "shield"
    | "camera"
    | "bike"
    | "sparkles"
    | "cleaning"
    | "droplet"
    | "lightbulb"
    | "home";
  categoria:
    | "higienizacao"
    | "estetica"
    | "protecao"
    | "interiores"
    | "moto"
    | "lavagem"
    | "polimento"
    | "adicional_auto"
    | "adicional_moto"
    | "residencial";
};

const Servicos = () => {
  const [todosServicos, setTodosServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Verificar se servicosData existe e é um array
      if (servicosData && Array.isArray(servicosData)) {
        setTodosServicos(servicosData as Servico[]);
        console.log("Dados carregados:", servicosData);
      } else {
        console.error("Formato inválido de dados:", servicosData);
        setError("Os dados de serviços não estão no formato esperado.");
      }
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setError("Erro ao carregar os serviços.");
    } finally {
      setLoading(false);
    }
  }, []);
  // Função para renderizar o ícone correto
  const renderIcon = (iconType: string) => {
    switch (iconType) {
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
      case "cleaning":
        return <SprayCan className="ml-auto w-4 h-4" />; // Ou outro ícone apropriado para cleaning
      case "home":
        return <Home className="ml-auto w-4 h-4" />; // Ícone para serviços residenciais
      default:
        return <Car className="ml-auto w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-auto-lightgray">
        <p className="text-xl">Carregando serviços...</p>
        <Navbar />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-auto-lightgray">
        <h2 className="text-2xl text-red-600 mb-4">
          Erro ao carregar serviços
        </h2>
        <p>{error}</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Tentar novamente
        </Button>
        <Navbar />
      </div>
    );
  }

  // Se não há serviços, mostra uma mensagem
  if (todosServicos.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-auto-lightgray">
        <h2 className="text-2xl mb-4">Nenhum serviço encontrado</h2>
        <p>Verifique o arquivo services.json e tente novamente.</p>
        <Navbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-auto-lightgray z-10">
      <ScrollToTop />
      <div className="min-h-screen container mx-auto px-4 py-10">
        {/* SEÇÃO DE SERVIÇOS DE HIGIENIZAÇÃO */}
        <h1 className="text-4xl font-bold text-center py-10 mt-10">
          Serviços de Higienização
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {todosServicos
            .filter((servico) => servico.categoria === "higienizacao")
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
                  <CardDescription>{servico.descricao}</CardDescription>
                </CardHeader>
              </Card>
            ))}
        </div>
        <h1 className="text-4xl font-bold text-center py-10 mt-10">
          Serviços de Lavagem
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {todosServicos
            .filter((servico) => servico.categoria === "lavagem")
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
                  <CardDescription>{servico.descricao}</CardDescription>
                </CardHeader>
              </Card>
            ))}
        </div>
        {/* SEÇÃO DE SERVIÇOS DE PROTEÇÃO */}
        <h1 className="text-4xl font-bold text-center py-10 mt-10">
          Serviços de Proteção
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {todosServicos
            .filter((servico) => servico.categoria === "protecao")
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
                  <CardDescription>{servico.descricao}</CardDescription>
                </CardHeader>
              </Card>
            ))}
        </div>
        {/* SEÇÃO DE SERVIÇOS PARA moto */}
        <h1 className="text-4xl font-bold text-center py-10 mt-10">
          Serviços para moto
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {todosServicos
            .filter((servico) => servico.categoria === "moto")
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
                  <CardDescription>{servico.descricao}</CardDescription>
                </CardHeader>
              </Card>
            ))}
        </div>{" "}
        {/* SEÇÃO DE SERVIÇOS DE POLIMENTO */}
        <h1 className="text-4xl font-bold text-center py-10 mt-10">
          Serviços de Polimento
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {todosServicos
            .filter((servico) => servico.categoria === "polimento")
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
                  <CardDescription>{servico.descricao}</CardDescription>
                </CardHeader>
              </Card>
            ))}
        </div>
        {/* SEÇÃO DE SERVIÇOS ADICIONAIS PARA AUTOMÓVEIS */}
        <h1 className="text-4xl font-bold text-center py-10 mt-10">
          Serviços Adicionais para Automóveis
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {todosServicos
            .filter((servico) => servico.categoria === "adicional_auto")
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
                  <CardDescription>{servico.descricao}</CardDescription>
                </CardHeader>
              </Card>
            ))}
        </div>
        {/* SEÇÃO DE SERVIÇOS ADICIONAIS PARA MOTOS */}
        <h1 className="text-4xl font-bold text-center py-10 mt-10">
          Serviços Adicionais para Motos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {todosServicos
            .filter((servico) => servico.categoria === "adicional_moto")
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
                  <CardDescription>{servico.descricao}</CardDescription>
                </CardHeader>
              </Card>
            ))}
        </div>
        {/* SEÇÃO DE SERVIÇOS RESIDENCIAIS */}
        <h1 className="text-4xl font-bold text-center py-10 mt-10">
          Serviços Residenciais
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {todosServicos
            .filter((servico) => servico.categoria === "residencial")
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
                  <CardDescription>{servico.descricao}</CardDescription>
                </CardHeader>
              </Card>
            ))}
        </div>
        <div
          className="flex flex-col sm:flex-row justify-center gap-4 mt-8 mb-12 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
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

export default Servicos;
