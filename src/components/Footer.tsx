
import React from 'react';
import { Instagram, MessageCircle, Facebook, ExternalLink, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-pitstop-darkGray via-gray-800 to-pitstop-darkGray text-white py-12 md:py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pitstop-blue/5 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pitstop-blue/5 rounded-full translate-y-32 -translate-x-32"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-8 md:mb-12">
          {/* PitStop Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
                🏁 PitStop <span className="text-pitstop-blue">Estética</span>
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                ✨ Excelência em estética automotiva e higienização de estofados residenciais. 
                Transformamos seu veículo com cuidado profissional.
              </p>
            </div>
            
            <div className="space-y-3 md:space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pitstop-blue/20 rounded-lg min-w-[40px] min-h-[40px] flex items-center justify-center">
                  <MapPin size={16} className="md:w-[18px] md:h-[18px] text-pitstop-blue" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm md:text-base">Tv. Domingos Souza - Aldeia</p>
                  <p className="text-gray-400 text-xs md:text-sm">Bragança - PA, 68600-000</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg min-w-[40px] min-h-[40px] flex items-center justify-center">
                  <Phone size={16} className="md:w-[18px] md:h-[18px] text-green-400" />
                </div>
                <p className="text-gray-300 text-sm md:text-base">(91) 8058-8823</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pitstop-blue/20 rounded-lg min-w-[40px] min-h-[40px] flex items-center justify-center">
                  <Mail size={16} className="md:w-[18px] md:h-[18px] text-pitstop-blue" />
                </div>
                <p className="text-gray-300 text-sm md:text-base break-all">erislan-oliveira@hotmail.com</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <h3 className="text-base md:text-lg font-semibold">Siga-nos:</h3>
              <div className='flex gap-3'>
                <a 
                  href="https://www.instagram.com/pitstop_estetica22" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 md:p-3 bg-pitstop-blue/20 rounded-xl text-pitstop-blue hover:bg-pitstop-blue/30 hover:text-pitstop-darkBlue transition-all duration-300 transform hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title="Instagram"
                >
                  <Instagram size={18} className="md:w-5 md:h-5"/>
                </a>
                <a 
                  href="https://wa.me/559180588823" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 md:p-3 bg-green-500/20 rounded-xl text-green-400 hover:bg-green-500/30 hover:text-green-300 transition-all duration-300 transform hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title="WhatsApp"
                >
                  <MessageCircle size={18} className="md:w-5 md:h-5"/>
                </a>
                <a
                  href="https://www.facebook.com/pitstop.estetica.automotiva" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 md:p-3 bg-blue-500/20 rounded-xl text-blue-400 hover:bg-blue-500/30 hover:text-blue-300 transition-all duration-300 transform hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title="Facebook"
                >    
                  <Facebook size={18} className="md:w-5 md:h-5"/>
                </a>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-pitstop-blue">🔗 Links Rápidos</h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href="#hero" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 text-sm md:text-base py-1">
                  🏠 Início
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 text-sm md:text-base py-1">
                  🛠️ Serviços
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 text-sm md:text-base py-1">
                  📸 Galeria
                </a>
              </li>
              <li>
                <a href="#booking" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 text-sm md:text-base py-1">
                  📅 Agendamento
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 text-sm md:text-base py-1">
                  📞 Contato
                </a>
              </li>
            </ul>
          </div>
          
          {/* Developer Info */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-pitstop-blue">💻 Desenvolvido por</h3>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <img className="w-10 h-10 md:w-12 md:h-12 rounded-xl" src="img/INSILICO-LOGO.png" alt="Insilico Logo" />
                <div>
                  <h4 className="font-bold text-pitstop-blue text-sm md:text-base">Insilico</h4>
                  <p className="text-xs md:text-sm text-gray-400">Tecnologia</p>
                </div>
              </div>
              
              <p className="text-gray-300 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
                Especializada em automações comerciais e soluções digitais.
              </p>
              
              <div className='flex gap-2'>
                <a 
                  href="https://www.instagram.com/insilicotec/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-pitstop-blue/20 rounded-lg text-pitstop-blue hover:bg-pitstop-blue/30 transition-all duration-300 min-w-[36px] min-h-[36px] flex items-center justify-center"
                  title="Instagram Insilico"
                >
                  <Instagram size={14} className="md:w-4 md:h-4"/>
                </a>
                <a 
                  href="https://wa.me/5591988939655" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-green-500/20 rounded-lg text-green-400 hover:bg-green-500/30 transition-all duration-300 min-w-[36px] min-h-[36px] flex items-center justify-center"
                  title="WhatsApp Insilico"
                >
                  <MessageCircle size={14} className="md:w-4 md:h-4"/>
                </a>
                <a 
                  href="https://insilico.cloud/"
                  target='_blank'
                  rel='noopener noreferrer'
                  className="p-2 bg-blue-500/20 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-all duration-300 min-w-[36px] min-h-[36px] flex items-center justify-center"
                  title="Site Insilico"
                >
                  <ExternalLink size={14} className="md:w-4 md:h-4"/>
                </a>
              </div>
            </div>
          </div>
        </div>
         
        <div className="border-t border-gray-700/50 pt-6 md:pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <p className="text-gray-400 text-sm md:text-base">
              &copy; {currentYear} PitStop Estética Automotiva. Todos os direitos reservados.
            </p>
            <p className="text-gray-500 text-xs md:text-sm">
              🌟 Feito com dedicação em Bragança - PA
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
