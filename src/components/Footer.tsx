
import React from 'react';
import { Instagram, MessageCircle, Facebook, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-pitstop-darkGray text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="mb-1">
              <h2 className="text-2xl font-bold">
                PitStop <span className="text-pitstop-blue">Estética</span>
              </h2>
            </div>
            <p className="text-gray-300 mb-4">
              Excelência em estética automotiva e higienização de estofados residenciais.
            </p>
            <div className="flex items-center">
              <div className='flex gap-3'>
                <a 
                  href="https://www.instagram.com/pitstop_estetica22" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-pitstop-blue transition-colors"
                >
                  <Instagram size={24}/>
                </a>
                <a 
                  href="https://api.whatsapp.com/send?phone=5511999999999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-pitstop-blue transition-colors"
                >
                  <MessageCircle size={24}/>
                </a>
                <a
                  href="https://www.facebook.com/pitstop.estetica.automotiva" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-pitstop-blue transition-colors"
                >    
                  <Facebook size={24}/>
                </a>
              </div>
            </div>
          </div>
          <div>
          <h2 className="text-2xl font-bold">
                Desenvolvido por <span className="text-pitstop-blue">Insilico Tecnologia</span>
              </h2>
            <p className="text-gray-300 mb-4">
              Empresa especializada em desenvolvimento de automações comerciais e soluções digitais. 💻
            </p>
            <div className='flex gap-3'>
                <a 
                  href="https://www.instagram.com/insilicotec/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-pitstop-blue transition-colors"
                >
                  <Instagram size={24}/>
                </a>
                <a 
                  href="https://api.whatsapp.com/send?phone=5591988939655" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-pitstop-blue transition-colors"
                >
                  <MessageCircle size={24}/>
                </a>
                <a 
                href="https://insilico.cloud/"
                target='_blank'
                rel='noopener noreferrer'
                className="text-gray-300 hover:text-pitstop-blue transition-colors"
                >
                <ExternalLink/>
                </a>
              </div>
          </div>
        <img className="w-32 h-auto mt-0" src="public/img/INSILICO-LOGO.png" alt="Insilico Logo" />
        </div>
         
        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} PitStop Estética Automotiva. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
