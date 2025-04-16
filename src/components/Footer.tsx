
import React from 'react';
import { Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-pitstop-darkGray text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold">
                PitStop <span className="text-pitstop-blue">Estética</span>
              </h2>
            </div>
            <p className="text-gray-300 mb-4">
              Excelência em estética automotiva e higienização de estofados residenciais.
            </p>
            <div className="flex items-center">
              <a 
                href="https://www.instagram.com/pitstop_estetica22" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pitstop-blue transition-colors"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pitstop-blue">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">Lavagem Completa</a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">Polimento Profissional</a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">Proteção de Pintura</a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">Higienização de Sofás</a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">Limpeza de Colchões</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pitstop-blue">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-white transition-colors">Início</a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">Serviços</a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-300 hover:text-white transition-colors">Galeria</a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Depoimentos</a>
              </li>
              <li>
                <a href="#booking" className="text-gray-300 hover:text-white transition-colors">Agendamento</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contato</a>
              </li>
            </ul>
          </div>
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
