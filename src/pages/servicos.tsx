import {Car,Wrench,Shield,Camera } from "lucide-react";
import Navbar from "@/components/Navbar";
import ServiceSection from "@/components/ServiceSection";
import ServiceCard from "@/components/ServiceCard";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";



const servicos = () => {
  return (
    <div className="min-h-screen flex flex-col bg-auto-lightgray">
      <ScrollToTop />
      <Navbar />
      <WhatsAppButton />
      {/* Serviços para Motos */}
      <ServiceSection   
        id="motos" 
        title="Serviços para Motos" 
        subtitle="Cuidados especializados para sua moto brilhar como nova"
         >
        <ServiceCard 
          title="Lavagem Básica" 
          description="Uma limpeza rápida e eficiente para remover a sujeira superficial da sua moto, deixando-a com aparência renovada."
          icon={<Car />}
        />
        <ServiceCard 
          title="Lavagem Detalhada" 
          description="Uma limpeza minuciosa que alcança os cantos mais difíceis, garantindo que sua moto fique impecável em todos os detalhes."
          icon={<Car />}
        />
        <ServiceCard 
          title="Vitrificação" 
          description="Aplicação de uma camada protetora que preserva o brilho da pintura e protege contra agentes externos, mantendo sua moto com aparência de nova por mais tempo."
          icon={<Shield />}
        />
        <ServiceCard 
          title="Polimento de Tanque" 
          description="Remoção de riscos e imperfeições no tanque, restaurando o brilho original e proporcionando um acabamento refinado."
          icon={<Camera />}
        />
        <ServiceCard 
          title="Polimento de Moto" 
          description="Processo que elimina micro riscos e manchas da pintura, devolvendo o brilho e a vitalidade da sua moto."
          icon={<Camera />}
        />
        <ServiceCard 
          title="Cera V80" 
          description="Aplicação de cera de alta performance que protege a pintura e realça o brilho, proporcionando um acabamento duradouro."
          icon={<Shield />}
        />
      </ServiceSection>

      {/* Serviços para Carros */}
      <ServiceSection 
        id="carros" 
        title="Serviços para Carros" 
        subtitle="Soluções completas para manter seu carro sempre impecável"
      >
        <ServiceCard 
          title="Lavagem Tradicional" 
          description="Limpeza externa básica que remove sujeiras superficiais, deixando seu carro com aparência limpa e bem cuidada."
          icon={<Car />}
        />
        <ServiceCard 
          title="Lavagem Clássica" 
          description="Inclui a lavagem tradicional com atenção especial aos detalhes, garantindo um resultado superior."
          icon={<Car />}
        />
        <ServiceCard 
          title="Lavagem Premium" 
          description="Serviço completo que combina lavagem externa detalhada com cuidados adicionais, proporcionando um acabamento de alto padrão."
          icon={<Car />}
        />
      </ServiceSection>

      {/* Higienização Interna */}
      <ServiceSection 
        id="higienizacao" 
        title="Higienização Interna" 
        subtitle="Renove o interior do seu veículo com nossa higienização especializada"
        
      >
        <ServiceCard 
          title="Limpeza de Bancos de Couro" 
          description="Limpeza profunda que remove sujeiras e manchas, preservando a aparência e a durabilidade dos bancos de couro."
          icon={<Camera />}
        />
        <ServiceCard 
          title="Condicionamento Hidratante de Couro" 
          description="Aplicação de produtos específicos que hidratam e protegem o couro, evitando ressecamento e rachaduras."
          icon={<Camera />}
        />
        <ServiceCard 
          title="Limpeza de Bancos de Tecido" 
          description="Remoção de sujeiras e manchas dos bancos de tecido, restaurando a aparência original e o conforto."
          icon={<Camera />}
        />
        <ServiceCard 
          title="Limpeza de Teto e Colunas" 
          description="Limpeza detalhada do teto e das colunas internas, eliminando sujeiras e odores, proporcionando um ambiente mais agradável."
          icon={<Camera />}
        />
        <ServiceCard 
          title="Painel, Portas e Plásticos" 
          description="Limpeza e tratamento das superfícies internas, restaurando o brilho e protegendo contra o desgaste."
          icon={<Camera />}
        />
        <ServiceCard 
          title="Impermeabilização de Bancos" 
          description="Aplicação de produtos que criam uma barreira protetora contra líquidos e sujeiras, facilitando a limpeza futura."
          icon={<Camera />}
        />
        <ServiceCard 
          title="Carpete e Feltro" 
          description="Limpeza profunda dos carpetes e feltros, removendo sujeiras e odores, e revitalizando o interior do veículo."
          icon={<Camera />}
        />
      </ServiceSection>

      {/* Lavagem + Higienização Interna */}
      <ServiceSection 
        id="lavagem-higienizacao" 
        title="Lavagem + Higienização Interna" 
        subtitle="Soluções completas para interior e exterior do seu veículo"
        
      >
        <ServiceCard 
          title="Higienização Interna e Lavagem com Cera (Um Estágio)" 
          description="Combinação de limpeza interna e lavagem externa com aplicação de cera, proporcionando proteção e brilho em uma única etapa."
          icon={<Camera />}
        />
        <ServiceCard 
          title="Higienização Interna e Lavagem Geral (Dois Estágios)" 
          description="Processo completo que inclui limpeza interna detalhada e lavagem externa em duas etapas, garantindo um resultado superior."
          icon={<Camera />}
        />
      </ServiceSection>

      {/* Polimento */}
      <ServiceSection 
        id="polimento" 
        title="Polimento" 
        subtitle="Recupere o brilho original do seu veículo"
        
      >
        <ServiceCard 
          title="Polimento de Faróis" 
          description="Restauração da transparência dos faróis, melhorando a iluminação e a estética do veículo."
          icon={<Camera />}
        />
        <ServiceCard 
          title="Polimento Comercial" 
          description="Remoção de imperfeições leves da pintura, devolvendo o brilho e a uniformidade da superfície."
          icon={<Camera />}
        />
        <ServiceCard 
          title="Polimento Técnico" 
          description="Processo avançado que corrige micro riscos e manchas, restaurando o brilho original da pintura com precisão."
          icon={<Camera />}
        />
      </ServiceSection>

      {/* Vitrificação */}
      <ServiceSection 
        id="vitrificacao" 
        title="Vitrificação" 
        subtitle="Proteção duradoura para a pintura do seu veículo"
      >
        <ServiceCard 
          title="Vitrificação Voixx" 
          description="Aplicação de revestimento cerâmico que protege a pintura contra riscos, sujeira e raios UV, mantendo o brilho por mais tempo."
          icon={<Shield />}
        />
        <ServiceCard 
          title="Vitrificação CaPro" 
          description="Tecnologia de ponta que oferece proteção duradoura e realce do brilho da pintura, mantendo o veículo com aparência de novo."
          icon={<Shield />}
        />
        <ServiceCard 
          title="Vitrificação de Faróis" 
          description="Proteção dos faróis contra amarelamento e desgaste, mantendo a transparência e a eficiência da iluminação."
          icon={<Shield />}
        />
      </ServiceSection>

      {/* Serviços Técnicos */}
      <ServiceSection 
        id="tecnicos" 
        title="Serviços Técnicos" 
        subtitle="Cuidados especializados para partes específicas do seu veículo"
        
      >
        <ServiceCard 
          title="Lavagem de Chassi" 
          description="Limpeza detalhada do chassi e do assoalho, removendo sujeiras acumuladas e prevenindo a corrosão."
          icon={<Wrench />}
        />
        <ServiceCard 
          title="Anticorrosivo de Chassi" 
          description="Aplicação de produto que protege o chassi contra a corrosão, aumentando a durabilidade do veículo."
          icon={<Wrench />}
        />
        <ServiceCard 
          title="Lavagem do Motor + Proteção" 
          description="Limpeza cuidadosa do motor seguida de aplicação de protetores que preservam os componentes e melhoram a aparência."
          icon={<Wrench />}
        />
        <ServiceCard 
          title="Impermeabilização de Para-brisa" 
          description="Tratamento que repele a água do para-brisa, melhorando a visibilidade em condições de chuva e aumentando a segurança."
          icon={<Shield />}
        />
      </ServiceSection>
      <Footer />
    </div>
  );
};

export default servicos;
