import { Clock, Mail, MapPin, Phone, Star } from 'lucide-react';
import React from 'react';

const ContactInfo: React.FC = () => {
  const contactItems = [
    {
      icon: MapPin,
      title: '📍 Nossa Localização',
      content: 'Rua das Oficinas, 123 - Centro',
      subContent: 'São Paulo - SP, CEP: 01234-567',
      color: 'text-pitstop-blue'
    },
    {
      icon: Phone,
      title: '📱 WhatsApp/Telefone',
      content: '(91) 8058-8823',
      subContent: 'Atendimento rápido e personalizado',
      color: 'text-green-600'
    },
    {
      icon: Mail,
      title: '📧 E-mail',
      content: 'contato@pitstopestetica.com',
      subContent: 'Resposta em até 24 horas',
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      title: '⏰ Horário de Funcionamento',
      content: 'Segunda à Sexta: 8h às 18h',
      subContent: 'Sábados: 8h às 14h',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-white/50 relative">
      <div className="mb-6 md:mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-pitstop-darkGray mb-2 md:mb-3">
          📞 Informações de Contato
        </h3>
        <p className="text-pitstop-darkGray/70 leading-relaxed">
          Entre em contato conosco através de qualquer um dos canais abaixo.
        </p>
      </div>

      <div className="space-y-6">
        {contactItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50/50 transition-all duration-300 hover:shadow-md border border-transparent hover:border-gray-100"
            >
              <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className={`w-6 h-6 ${item.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-pitstop-darkGray mb-1 group-hover:text-pitstop-blue transition-colors">
                  {item.title}
                </h4>
                <p className="text-pitstop-darkGray font-medium">
                  {item.content}
                </p>
                <p className="text-pitstop-darkGray/70 text-sm mt-1">
                  {item.subContent}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="mt-8 p-6 bg-gradient-to-r from-pitstop-blue/5 to-pitstop-darkBlue/5 rounded-xl border border-pitstop-blue/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex -space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <span className="font-semibold text-pitstop-darkGray">5.0</span>
        </div>
        <p className="text-pitstop-darkGray/80 font-medium">
          ⭐ Mais de 1.000 clientes satisfeitos!
        </p>
        <p className="text-pitstop-darkGray/70 text-sm mt-1">
          Venha fazer parte da nossa família de clientes satisfeitos
        </p>
      </div>

      {/* Business Hours Highlight */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-700 font-medium text-sm">
            🟢 Aberto agora - Resposta imediata!
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
