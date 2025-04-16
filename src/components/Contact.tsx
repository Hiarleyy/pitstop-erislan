
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
      window.open(`https://wa.me/5591988939655?text=${message}`, '_blank');
      
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
    <section id="contact" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-pitstop-darkGray mb-4">Entre em Contato</h2>
          <div className="w-20 h-1 bg-pitstop-blue mx-auto mb-6"></div>
          <p className="text-lg text-pitstop-darkGray/80 max-w-2xl mx-auto">
            Tire suas dúvidas, solicite um orçamento ou entre em contato conosco.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-pitstop-darkGray mb-6">Informações de Contato</h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <MapPin className="text-pitstop-blue mr-4 mt-1" size={24} />
                  <div>
                    <p className="text-pitstop-darkGray/80">Av. Principal, 123</p>
                    <p className="text-pitstop-darkGray/80">Centro, Bragança - PA</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <Phone className="text-pitstop-blue mr-4" size={24} />
                  <p className="text-pitstop-darkGray/80">(91) 98893-9655</p>
                </li>
                <li className="flex items-center">
                  <Mail className="text-pitstop-blue mr-4" size={24} />
                  <p className="text-pitstop-darkGray/80">contato@pitstopestetica.com.br</p>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-pitstop-darkGray mb-6">Horário de Funcionamento</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="text-pitstop-darkGray/80">Segunda a Sexta</p>
                  <p className="text-pitstop-darkGray font-medium">8:00 - 18:00</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-pitstop-darkGray/80">Sábados</p>
                  <p className="text-pitstop-darkGray font-medium">8:00 - 16:00</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-pitstop-darkGray/80">Domingos e Feriados</p>
                  <p className="text-pitstop-darkGray font-medium">Fechado</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h3 className="text-2xl font-semibold text-pitstop-darkGray mb-6 text-center">Entrar em Contato</h3>
            <p className="text-pitstop-darkGray/80 mb-8 text-center">
              Fale com nosso time para Tirar Dúvdias sobre nossos serviços e escolher o melhor para seu automóvel.
            </p>
            
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className={errors.name ? "text-red-500" : ""}>
                    Nome Completo {errors.name && <span className="text-red-500">*</span>}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "border-red-500" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className={errors.phone ? "text-red-500" : ""}>
                    Telefone com DDD {errors.phone && <span className="text-red-500">*</span>}
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">Digite um número de telefone válido com DDD</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="btn-gradient w-full">
                <Send className="mr-2 h-4 w-4" /> Continuar via WhatsApp
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
