import React from 'react';
import ContactForm from './contact/ContactForm';
import ContactInfo from './contact/ContactInfo';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-blue-50/20 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pitstop-blue/5 to-transparent rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pitstop-darkBlue/5 to-transparent rounded-full translate-y-32 -translate-x-32"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pitstop-blue to-pitstop-darkBlue bg-clip-text text-transparent mb-4 md:mb-6">
            💬 Entre em Contato
          </h2>
          <div className="w-20 md:w-24 h-1.5 bg-gradient-to-r from-pitstop-blue to-pitstop-darkBlue mx-auto mb-6 md:mb-8 rounded-full"></div>
          <p className="text-lg md:text-xl text-pitstop-darkGray/80 max-w-3xl mx-auto leading-relaxed px-4">
            ✨ Tire suas dúvidas, solicite um <span className="font-semibold text-pitstop-blue">orçamento personalizado</span> ou entre em contato para mais informações.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <ContactInfo />
          
          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
