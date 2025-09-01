import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import React, { useState } from 'react';

interface ContactFormProps {
  onSuccess?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [errors, setErrors] = useState({
    name: false,
    phone: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Erro no formulário",
        description: "Por favor, preencha todos os campos corretamente.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
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

      onSuccess?.();
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato diretamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-white/50 relative">
      <div className="mb-6 md:mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-pitstop-darkGray mb-2 md:mb-3">
          📱 Solicite seu Orçamento
        </h3>
        <p className="text-pitstop-darkGray/70 leading-relaxed">
          Preencha o formulário e seja redirecionado diretamente para nosso WhatsApp.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-pitstop-darkGray">
            Seu Nome *
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`h-12 text-base ${
              errors.name 
                ? 'border-red-500 focus:ring-red-200' 
                : 'border-gray-300 focus:ring-pitstop-blue/20'
            }`}
            placeholder="Digite seu nome completo"
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Nome é obrigatório</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-pitstop-darkGray">
            WhatsApp/Telefone *
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className={`h-12 text-base ${
              errors.phone 
                ? 'border-red-500 focus:ring-red-200' 
                : 'border-gray-300 focus:ring-pitstop-blue/20'
            }`}
            placeholder="(11) 99999-9999"
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">
              Telefone deve ter 10 ou 11 dígitos
            </p>
          )}
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full h-12 md:h-14 text-base md:text-lg font-semibold bg-green-500 hover:bg-green-600 text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          <Send className="w-5 h-5 mr-2" />
          {isSubmitting ? 'Enviando...' : 'Enviar pelo WhatsApp'}
        </Button>
      </form>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-700 text-sm text-center">
          🔒 Seus dados estão seguros e serão usados apenas para contato
        </p>
      </div>
    </div>
  );
};

export default ContactForm;
