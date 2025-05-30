
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [errors, setErrors] = useState({
    name: false,
    phone: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim(),
      phone: !formData.phone.trim() || !/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ''))
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Format phone for WhatsApp
      const formattedPhone = formData.phone.replace(/\D/g, '');
      
      // Create WhatsApp message
      const message = `Nome: ${formData.name}%0A`
                    + `Telefone: ${formData.phone}%0A`
                    + `Assunto: Informações sobre serviços`;
      
      // Redirect to WhatsApp
      window.open(`https://wa.me/559180588823?text=${message}`, '_blank');
      
      // Show success toast
      toast({
        title: "Redirecionando para WhatsApp!",
        description: "Você será atendido em breve.",
      });
      
      // Reset form
      setFormData({
        name: '',
        phone: ''
      });
    } else {
      toast({
        title: "Erro no formulário",
        description: "Por favor, preencha todos os campos corretamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-blue-50/20 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pitstop-blue/5 to-transparent rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pitstop-darkBlue/5 to-transparent rounded-full translate-y-32 -translate-x-32"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pitstop-blue to-pitstop-darkBlue bg-clip-text text-transparent mb-6">
            💬 Entre em Contato
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-pitstop-blue to-pitstop-darkBlue mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-pitstop-darkGray/80 max-w-3xl mx-auto leading-relaxed">
            ✨ Tire suas dúvidas, solicite um <span className="font-semibold text-pitstop-blue">orçamento personalizado</span> ou entre em contato para mais informações.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50 relative">
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-pitstop-darkGray mb-8 flex items-center gap-3">
                📍 <span>Como nos encontrar</span>
              </h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-transparent border border-blue-100">
                  <div className="p-3 bg-pitstop-blue rounded-xl text-white">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-pitstop-darkGray mb-1">📍 Localização</h4>
                    <p className="text-pitstop-darkGray/80">Tv. Domingos Souza - Aldeia</p>
                    <p className="text-pitstop-darkGray/80">Bragança - PA, 68600-000</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-transparent border border-green-100">
                  <div className="p-3 bg-green-500 rounded-xl text-white">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-pitstop-darkGray mb-1">📞 WhatsApp</h4>
                    <p className="text-pitstop-darkGray/80 font-medium">(91) 8058-8823</p>
                    <p className="text-sm text-green-600">Atendimento rápido via WhatsApp</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-transparent border border-pitstop-blue/20">
                  <div className="p-3 bg-pitstop-blue rounded-xl text-white">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-pitstop-darkGray mb-1">✉️ E-mail</h4>
                    <p className="text-pitstop-darkGray/80">erislan-oliveira@hotmail.com</p>
                    <p className="text-sm text-pitstop-darkBlue">Para orçamentos detalhados</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-2xl font-bold text-pitstop-darkGray mb-6 flex items-center gap-3">
                🕐 <span>Horário de Funcionamento</span>
              </h3>
              <div className="space-y-4 bg-gradient-to-br from-gray-50 to-blue-50/30 p-6 rounded-xl">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <p className="text-pitstop-darkGray/80 font-medium">Segunda a Sexta</p>
                  </div>
                  <p className="text-pitstop-darkGray font-bold">8:00 - 18:00</p>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                    <p className="text-pitstop-darkGray/80 font-medium">Sábados</p>
                  </div>
                  <p className="text-pitstop-darkGray font-bold">8:00 - 16:00</p>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <p className="text-pitstop-darkGray/80 font-medium">Domingos e Feriados</p>
                  </div>
                  <p className="text-pitstop-darkGray font-bold">Fechado</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50 relative">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-pitstop-darkGray mb-4 flex items-center justify-center gap-3">
                💬 <span>Fale Conosco</span>
              </h3>
              <p className="text-pitstop-darkGray/80 leading-relaxed">
                Entre em contato para tirar dúvidas sobre nossos serviços e escolher o melhor para seu automóvel.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-3">
                  <Label htmlFor="name" className={`text-base font-semibold ${errors.name ? "text-red-500" : "text-pitstop-darkGray"}`}>
                    👤 Nome Completo {errors.name && <span className="text-red-500">*</span>}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Digite seu nome completo"
                    value={formData.name}
                    onChange={handleChange}
                    className={`h-12 text-lg border-2 transition-all duration-300 rounded-xl ${
                      errors.name 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-pitstop-silver/50 focus:border-pitstop-blue"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm flex items-center gap-2">
                      ⚠️ Nome é obrigatório
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="phone" className={`text-base font-semibold ${errors.phone ? "text-red-500" : "text-pitstop-darkGray"}`}>
                    📱 Telefone com DDD {errors.phone && <span className="text-red-500">*</span>}
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`h-12 text-lg border-2 transition-all duration-300 rounded-xl ${
                      errors.phone 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-pitstop-silver/50 focus:border-pitstop-blue"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm flex items-center gap-2">
                      ⚠️ Digite um número de telefone válido com DDD
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <Send size={20} />
                  Continuar via WhatsApp
                </Button>
              </div>
              
              <div className="text-center pt-2">
                <p className="text-sm text-pitstop-darkGray/70">
                  🔒 Seus dados estão seguros conosco
                </p>
              </div>
            </form>
            
            {/* Additional CTA */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center p-4 bg-gradient-to-r from-pitstop-blue/10 to-pitstop-darkBlue/10 rounded-xl border border-pitstop-blue/20">
                <p className="text-pitstop-darkGray font-medium mb-2">
                  🎯 Precisa de um orçamento personalizado?
                </p>
                <p className="text-sm text-pitstop-darkGray/70">
                  Nossa equipe está pronta para atender você!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
