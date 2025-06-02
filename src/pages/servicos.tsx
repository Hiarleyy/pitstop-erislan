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
  // Função para obter cores baseadas na categoria
  const getCategoryColors = (categoria: string) => {
    const colorMap = {
      higienizacao: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-150 hover:border-blue-300",
      lavagem: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-150 hover:border-blue-300",
      protecao: "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:from-emerald-100 hover:to-emerald-150 hover:border-emerald-300",
      moto: "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:from-orange-100 hover:to-orange-150 hover:border-orange-300",
      polimento: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-150 hover:border-blue-300",
      servicos_adicionais: "bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 hover:from-indigo-100 hover:to-indigo-150 hover:border-indigo-300",
      servicos_adicionais_moto: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-150 hover:border-blue-300",
      higienizacao_residencial: "bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200 hover:from-teal-100 hover:to-teal-150 hover:border-teal-300"
    };
    return colorMap[categoria as keyof typeof colorMap] || colorMap.higienizacao;
  };

  // Função para renderizar seção de serviços
  const renderServiceSection = (categoria: string, titulo: string, emoji: string) => (
    <div className="mb-8 sm:mb-12 lg:mb-16">
      <div className="text-center mb-6 sm:mb-8 lg:mb-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
          {emoji} {titulo}
        </h2>
        <div className="w-12 sm:w-16 lg:w-20 h-1 bg-gradient-to-r from-pitstop-blue to-pitstop-darkBlue mx-auto rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 px-2 sm:px-4">
        {todosServicos
          .filter((servico) => servico.categoria === categoria)
          .map((servico, index) => (
            <Card
              key={index}
              className={`${getCategoryColors(categoria)} transition-all duration-300 hover:scale-105 hover:shadow-xl transform border-2`}
            >
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <CardTitle className="text-sm sm:text-base lg:text-lg text-gray-700 font-semibold leading-tight flex-1 pr-2">
                    {servico.titulo}
                  </CardTitle>
                  <div className="text-gray-500 ml-2 sm:ml-3 flex-shrink-0">
                    {renderIcon(servico.icone)}
                  </div>
                </div>
                <CardDescription className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                  {servico.descricao}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
      </div>
    </div>
  );
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "car":
        return <Car className="ml-auto w-4 h-4 sm:w-5 sm:h-5" />;
      case "wrench":
        return <Wrench className="ml-auto w-4 h-4 sm:w-5 sm:h-5" />;
      case "shield":
        return <Shield className="ml-auto w-4 h-4 sm:w-5 sm:h-5" />;
      case "camera":
        return <Camera className="ml-auto w-4 h-4 sm:w-5 sm:h-5" />;
      case "bike":
        return <Bike className="ml-auto w-4 h-4 sm:w-5 sm:h-5" />;
      case "sparkles":
        return <SparkleIcon className="ml-auto w-4 h-4 sm:w-5 sm:h-5" />;
      case "droplet":
        return <Droplet className="ml-auto w-4 h-4 sm:w-5 sm:h-5" />;
      case "lightbulb":
        return <Lightbulb className="ml-auto w-4 h-4 sm:w-5 sm:h-5" />;
      case "cleaning":
        return <SprayCan className="ml-auto w-4 h-4 sm:w-5 sm:h-5" />; // Ou outro ícone apropriado para cleaning
      case "home":
        return <Home className="ml-auto w-4 h-4 sm:w-5 sm:h-5" />; // Ícone para serviços residenciais
      default:
        return <Car className="ml-auto w-4 h-4 sm:w-5 sm:h-5" />;
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <ScrollToTop />
      <div className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 mt-12 sm:mt-16 lg:mt-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6">
            ✨ Nossos Serviços
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2 sm:px-4">
            Oferecemos uma gama completa de serviços de estética automotiva com qualidade profissional e atenção aos detalhes.
          </p>
          <div className="w-16 sm:w-24 lg:w-32 h-1 bg-gradient-to-r from-pitstop-blue via-pitstop-darkBlue to-blue-800 mx-auto mt-3 sm:mt-4 lg:mt-6 rounded-full"></div>
        </div>

        {renderServiceSection("higienizacao", "Serviços de Higienização", "🧽")}
        {renderServiceSection("lavagem", "Serviços de Lavagem", "🚿")}
        {renderServiceSection("protecao", "Serviços de Proteção", "🛡️")}
        {renderServiceSection("moto", "Serviços para Moto", "🏍️")}
        {renderServiceSection("polimento", "Serviços de Polimento", "✨")}
        {renderServiceSection("servicos_adicionais", "Serviços Adicionais para Automóveis", "🚗")}
        {renderServiceSection("servicos_adicionais_moto", "Serviços Adicionais para Motos", "🔧")}
        {renderServiceSection("higienizacao_residencial", "Serviços Residenciais", "🏠")}

        <div className="text-center mt-8 sm:mt-12 lg:mt-16 mb-6 sm:mb-8 lg:mb-12 flex justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto border border-gray-200">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
              Pronto para cuidar do seu veículo? 🚗✨
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Entre em contato conosco e agende seu serviço com os melhores profissionais da região!
            </p>
            <Button asChild className="btn-gradient text-sm sm:text-base lg:text-lg py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <a href="/#booking">📞 Agendar Serviço Agora</a>
            </Button>
          </div>
        </div>
      </div>
      <Navbar />
      <Footer />
    </div>
  );
};

export default Servicos;
