import React, { useState, useEffect } from 'react';
import { Instagram, Menu, X, Phone, Calendar, Sparkles } from 'lucide-react';
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
    { name: '🏠 Início', href: '/' },
    { name: '⚡ Serviços', href: '/servicos' }
  ];

  // Define cores diferentes baseadas no caminho
  const getNavItemColor = (href: string) => {
    if (path === '/servicos') return 'text-gray-600 hover:text-blue-600';
    return scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200';
  };

  const getLogoFilter = () => {
    if (path === '/servicos') return 'brightness-75';
    return scrolled ? 'brightness-100' : 'brightness-200 drop-shadow-lg';
  };

  // Verifica se o link está ativo
  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none z-40" />
      
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100 py-2' 
          : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo Section with mobile optimization */}
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <img 
                  src="/img/PITSTOP-LOGO.png" 
                  alt="Pitstop Logo" 
                  className={`h-12 md:h-14 lg:h-18 object-contain transition-all duration-500 group-hover:scale-105 ${getLogoFilter()}`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-pitstop-blue/20 to-pitstop-darkBlue/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              <ul className="flex items-center space-x-12">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className={`relative transition-all duration-300 text-lg font-semibold group ${getNavItemColor(link.href)} ${
                        isActive(link.href) 
                          ? 'text-blue-600 font-bold' 
                          : ''
                      }`}
                    >
                      <span className="relative z-10">{link.name}</span>
                      {isActive(link.href) && (
                        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pitstop-blue to-pitstop-darkBlue rounded-full" />
                      )}
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pitstop-blue to-pitstop-darkBlue rounded-full group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* CTA Buttons with mobile optimization */}
              <div className="flex items-center space-x-4 lg:space-x-6">
                <a 
                  href="tel:+5511999999999"
                  className={`flex items-center space-x-1 lg:space-x-2 px-3 lg:px-4 py-2 rounded-full transition-all duration-300 group min-h-[44px] ${
                    scrolled 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-green-500/25' 
                      : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30'
                  }`}
                >
                  <Phone size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-medium hidden lg:block">Ligar</span>
                </a>

                <a 
                  href="https://www.instagram.com/pitstop_estetica22" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-1 lg:space-x-2 px-3 lg:px-4 py-2 rounded-full transition-all duration-300 group min-h-[44px] ${
                    scrolled 
                      ? 'bg-gradient-to-r from-pitstop-blue to-pitstop-darkBlue text-white hover:from-pitstop-darkBlue hover:to-blue-800 shadow-lg hover:shadow-pitstop-blue/25' 
                      : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30'
                  }`}
                >
                  <Instagram size={16} className="group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium hidden lg:block">Instagram</span>
                </a>
              </div>
            </div>

            {/* Mobile Menu Button with touch optimization */}
            <div className="md:hidden flex items-center space-x-2">
              <a 
                href="https://www.instagram.com/pitstop_estetica22" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  scrolled 
                    ? 'bg-gradient-to-r from-pitstop-blue to-pitstop-darkBlue text-white shadow-lg' 
                    : 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
                }`}
              >
                <Instagram size={20} />
              </a>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-3 rounded-full transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  scrolled 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30'
                }`}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 ${
          isMenuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="bg-white/95 backdrop-blur-xl shadow-xl border-t border-gray-100 py-6 px-4">
            <div className="max-w-sm mx-auto">
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${
                        isActive(link.href) 
                          ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-pitstop-darkBlue border border-pitstop-blue/30' 
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-lg font-semibold">{link.name}</span>
                      {isActive(link.href) && <Sparkles size={20} className="text-pitstop-blue" />}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile CTA Section with touch optimization */}
              <div className="mt-6 space-y-3">
                <a 
                  href="tel:+5511999999999"
                  className="flex items-center justify-center space-x-3 w-full p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg min-h-[48px]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone size={20} />
                  <span>📞 Ligar Agora</span>
                </a>
                
                <a 
                  href="https://wa.me/5511999999999"
                  className="flex items-center justify-center space-x-3 w-full p-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg min-h-[48px]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Calendar size={20} />
                  <span>💬 WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
