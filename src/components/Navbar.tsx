
import React, { useState, useEffect } from 'react';
import { Instagram, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Serviços', href: '#services' },
    { name: 'Galeria', href: '#gallery' },
    { name: 'Depoimentos', href: '#testimonials' },
    { name: 'Agendamento', href: '#booking' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#home" className="flex items-center">
            <img src="/img/PITSTOP-LOGO.png" alt="" className='h-20 md:h-26 mb:4 object-contain PISTOP-LOGO pt-0 pb-0' />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className={`transition-colors ${scrolled ? 'text-pitstop-darkGray hover:text-pitstop-blue' : 'text-white hover:text-pitstop-silver'}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <a 
            href="https://www.instagram.com/pitstop_estetica22" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`transition-colors ${scrolled ? 'text-pitstop-darkGray hover:text-pitstop-blue' : 'text-white hover:text-pitstop-silver'}`}
          >
            <Instagram size={24} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <a 
            href="https://www.instagram.com/pitstop_estetica22" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`mr-4 transition-colors ${scrolled ? 'text-pitstop-darkGray hover:text-pitstop-blue' : 'text-white hover:text-pitstop-silver'}`}
          >
            <Instagram size={24} />
          </a>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={scrolled ? 'text-pitstop-darkGray' : 'text-white'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md py-4 px-4 animate-fade-in">
          <ul className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="block py-2 text-pitstop-darkGray hover:text-pitstop-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
