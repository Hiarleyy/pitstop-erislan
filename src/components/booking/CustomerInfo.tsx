import { Input } from '@/components/ui/input';
import { User, UserCheck } from 'lucide-react';
import React from 'react';

interface CustomerInfoProps {
  customerName: string;
  onCustomerNameChange: (name: string) => void;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({
  customerName,
  onCustomerNameChange
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-pitstop-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
          {customerName.trim() ? (
            <UserCheck className="w-8 h-8 text-pitstop-blue" />
          ) : (
            <User className="w-8 h-8 text-pitstop-blue" />
          )}
        </div>
        <h3 className="text-2xl font-bold text-pitstop-darkGray mb-2">
          Como podemos te chamar?
        </h3>
        <p className="text-pitstop-darkGray/70 max-w-md mx-auto">
          Precisamos de seu nome para personalizar o atendimento e identificar sua solicitação.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="space-y-2">
          <label htmlFor="customerName" className="text-sm font-medium text-pitstop-darkGray">
            Seu nome *
          </label>
          <Input
            id="customerName"
            type="text"
            placeholder="Digite seu nome completo"
            value={customerName}
            onChange={(e) => onCustomerNameChange(e.target.value)}
            className="h-12 text-lg text-center"
            autoFocus
          />
        </div>
        
        {customerName.trim() && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium">
                Olá, {customerName}! 👋
              </span>
            </div>
            <p className="text-green-600 text-sm mt-1">
              Agora vamos adicionar seus veículos para o agendamento.
            </p>
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-xs text-pitstop-darkGray/50">
          Suas informações são seguras e utilizadas apenas para o atendimento
        </p>
      </div>
    </div>
  );
};

export default CustomerInfo;
