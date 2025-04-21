
const CTASection = () => {
  return (
    <section className="py-16 gradient-bg">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Agende seu serviço hoje mesmo
        </h2>
        <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
          Entre em contato conosco para agendar um horário e garantir que seu veículo receba o melhor tratamento
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="tel:+551155555555" 
            className="btn-primary bg-white text-auto-blue hover:bg-gray-100"
          >
            Ligar Agora
          </a>
          <a 
            href="https://wa.me/5511999999999" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary bg-white text-auto-blue hover:bg-gray-100"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
