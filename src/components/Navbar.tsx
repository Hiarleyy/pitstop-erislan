import React, { useState, useEffect } from 'react';
import { Instagram, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const path = location.pathname;

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
    { name: 'Início', href: '/' },
    { name: 'Serviços', href: '/servicos' }
  ];

  // Define cores diferentes baseadas no caminho
  const getNavItemColor = (href: string) => {
    if (path === '/servicos') return 'text-gray-500';
    return scrolled ? 'text-pitstop-darkGray hover:text-pitstop-blue' : 'text-white hover:text-pitstop-silver';
  };

  // Verifica se o link está ativo
  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
            <img src="/img/PITSTOP-LOGO.png" alt="" className='h-20 md:h-26 mb:4 object-contain PISTOP-LOGO pt-0 pb-0' />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.href} 
                  className={`transition-colors text-lg font-medium ${getNavItemColor(link.href)} ${isActive(link.href) ? 'text-auto-blue font-medium' : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <a 
            href="https://www.instagram.com/pitstop_estetica22" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`transition-colors ${path === '/servicos' ? 'text-gray-500' : (scrolled ? 'text-pitstop-darkGray hover:text-pitstop-blue' : 'text-white hover:text-pitstop-silver')}`}
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
            className={`mr-4 transition-colors ${path === '/servicos' ? 'text-gray-500' : (scrolled ? 'text-pitstop-darkGray hover:text-pitstop-blue' : 'text-white hover:text-pitstop-silver')}`}
          >
            <Instagram size={24} />
          </a>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={path === '/servicos' ? 'text-gray-500' : (scrolled ? 'text-pitstop-darkGray' : 'text-white')}
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
                <Link 
                  to={link.href} 
                  className={`block py-2 ${path === '/servicos' ? 'text-gray-500' : 'text-pitstop-darkGray hover:text-pitstop-blue'} transition-colors ${isActive(link.href) ? 'text-auto-blue font-medium' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
