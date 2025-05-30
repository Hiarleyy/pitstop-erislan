
const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-pitstop-blue via-pitstop-darkBlue to-blue-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            🚀 Transforme seu veículo hoje mesmo!
          </h2>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            ✨ Entre em contato conosco para agendar um horário e garantir que seu veículo receba o 
            <span className="font-semibold text-blue-200"> melhor tratamento profissional</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a 
              href="tel:+559180588823" 
              className="inline-flex items-center justify-center gap-3 bg-white text-pitstop-blue hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              📞 Ligar Agora
            </a>
            <a 
              href="https://wa.me/559180588823?text=Olá! Gostaria de agendar um serviço na PitStop Estética Automotiva." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center gap-3 bg-green-500 text-white hover:bg-green-600 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              💬 WhatsApp
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-white/80">
            <div className="text-center p-4">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold mb-1">Atendimento Rápido</h3>
              <p className="text-sm">Resposta em até 5 minutos</p>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold mb-1">Orçamento Gratuito</h3>
              <p className="text-sm">Sem compromisso</p>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl mb-2">🏆</div>
              <h3 className="font-semibold mb-1">Qualidade Garantida</h3>
              <p className="text-sm">Resultados excepcionais</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
